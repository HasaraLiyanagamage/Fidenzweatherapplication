# Auth0 Setup Guide

This guide walks you through setting up Auth0 for the Weather Application with Multi-Factor Authentication (MFA) and restricted signups.

## Prerequisites
- Auth0 account (free tier works)
- Access to Auth0 Dashboard

---

## Step 1: Create Auth0 Account

1. Go to https://auth0.com/
2. Click **Sign Up** and create a free account
3. Choose a tenant domain (e.g., `your-company.auth0.com`)
4. Complete the registration process

---

## Step 2: Create an API

1. In Auth0 Dashboard, go to **Applications** → **APIs**
2. Click **Create API**
3. Fill in the details:
   - **Name**: `Weather API`
   - **Identifier**: `https://weather-api` (this will be your audience)
   - **Signing Algorithm**: `RS256`
4. Click **Create**
5. **Save the Identifier** - you'll need this for configuration

---

## Step 3: Create a Single Page Application

1. Go to **Applications** → **Applications**
2. Click **Create Application**
3. Fill in the details:
   - **Name**: `Weather Dashboard`
   - **Application Type**: Select **Single Page Web Applications**
4. Click **Create**

### Configure Application Settings

1. Go to the **Settings** tab
2. **Save the following values** (you'll need them later):
   - **Domain**: (e.g., `your-tenant.auth0.com`)
   - **Client ID**: (long alphanumeric string)

3. Scroll down to **Application URIs** and configure:
   - **Allowed Callback URLs**: `http://localhost:3000`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`
   - **Allowed Origins (CORS)**: `http://localhost:3000`

4. Scroll down to **Advanced Settings** → **Grant Types**
   - Ensure **Implicit**, **Authorization Code**, and **Refresh Token** are checked

5. Click **Save Changes**

---

## Step 4: Enable Multi-Factor Authentication (MFA)

### Configure MFA

1. In Auth0 Dashboard, go to **Security** → **Multi-factor Auth**
2. Click on **Email** to enable email-based MFA
3. Toggle **Enable Email** to ON
4. Configure email settings:
   - **From**: Use default or configure custom email
   - **Subject**: "Your verification code"
   - **Template**: Use default or customize

### Set MFA Policy

1. Scroll down to **Define policies**
2. Select **Always** to require MFA for all users
   - OR select **Adaptive** for risk-based MFA
3. Click **Save**

---

## Step 5: Disable Public Signups

### Method 1: Database Connection Settings

1. Go to **Authentication** → **Database**
2. Click on **Username-Password-Authentication** (default connection)
3. Go to the **Settings** tab
4. Scroll down to **Disable Sign Ups**
5. Toggle it **ON**
6. Click **Save**

### Method 2: Using Rules (Alternative)

1. Go to **Auth Pipeline** → **Rules**
2. Click **Create Rule**
3. Select **Empty rule**
4. Name it: `Restrict Signups`
5. Add this code:

```javascript
function restrictSignups(user, context, callback) {
  const allowedEmails = [
    'careers@fidenz.com'
    // Add more allowed emails here
  ];
  
  // Allow login for existing users
  if (context.stats.loginsCount > 1) {
    return callback(null, user, context);
  }
  
  // For new signups, check if email is in allowed list
  if (!allowedEmails.includes(user.email)) {
    return callback(
      new UnauthorizedError('Signups are restricted. Please contact administrator.')
    );
  }
  
  return callback(null, user, context);
}
```

6. Click **Save**

---

## Step 6: Create Test User Account

1. Go to **User Management** → **Users**
2. Click **Create User**
3. Fill in the details:
   - **Email**: `careers@fidenz.com`
   - **Password**: `Pass#fidenz`
   - **Connection**: `Username-Password-Authentication`
4. Click **Create**

### Verify Email (Important for MFA)

1. Click on the created user
2. Click **Send Verification Email**
3. Check the email inbox and verify the email address
4. Alternatively, manually verify:
   - In the user details, toggle **Email Verified** to ON

---

## Step 7: Configure Environment Variables

### Backend Configuration

1. Navigate to `backend` directory
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` file with your Auth0 credentials:
   ```env
   PORT=5001
   OPENWEATHER_API_KEY=your_openweather_api_key
   CACHE_TTL=300
   
   # Auth0 Configuration
   AUTH0_DOMAIN=your-tenant.auth0.com
   AUTH0_AUDIENCE=https://weather-api
   ```

   Replace:
   - `your-tenant.auth0.com` with your Auth0 domain
   - `https://weather-api` with your API identifier

### Frontend Configuration

1. Navigate to `frontend` directory
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` file:
   ```env
   REACT_APP_AUTH0_DOMAIN=your-tenant.auth0.com
   REACT_APP_AUTH0_CLIENT_ID=your_client_id_here
   REACT_APP_AUTH0_AUDIENCE=https://weather-api
   ```

   Replace:
   - `your-tenant.auth0.com` with your Auth0 domain
   - `your_client_id_here` with your Application Client ID
   - `https://weather-api` with your API identifier

---

## Step 8: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

---

## Step 9: Run the Application

### Terminal 1 - Backend
```bash
cd backend
npm start
```

Expected output:
```
Server is running on port 5001
Auth0 Domain: your-tenant.auth0.com
Auth0 Audience: https://weather-api
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

The application will open at http://localhost:3000

---

## Step 10: Test the Application

### Test Login Flow

1. Open http://localhost:3000
2. Click **Sign In with Auth0**
3. You'll be redirected to Auth0 login page
4. Enter credentials:
   - **Email**: `careers@fidenz.com`
   - **Password**: `Pass#fidenz`
5. Complete MFA verification (check email for code)
6. You'll be redirected back to the weather dashboard

### Test MFA

1. After entering credentials, you should receive an email with a verification code
2. Enter the code to complete authentication
3. The dashboard should load with weather data

### Test Logout

1. Click the **Logout** button
2. You should be redirected to the login page

### Test Restricted Signup

1. Try to create a new account with a different email
2. You should see an error or be prevented from signing up

---

## Troubleshooting

### Issue: "Callback URL mismatch"
**Solution**: Ensure `http://localhost:3000` is added to Allowed Callback URLs in Auth0 Application settings

### Issue: "Invalid audience"
**Solution**: Verify that the `AUTH0_AUDIENCE` in both backend and frontend `.env` files matches the API Identifier in Auth0

### Issue: "CORS error"
**Solution**: Add `http://localhost:3000` to Allowed Origins (CORS) in Auth0 Application settings

### Issue: "MFA not triggering"
**Solution**: 
- Ensure Email MFA is enabled in Auth0 Dashboard
- Check that MFA policy is set to "Always"
- Verify user's email is verified

### Issue: "Token validation failed"
**Solution**: 
- Check that `AUTH0_DOMAIN` in backend `.env` matches your Auth0 tenant
- Ensure API Identifier matches the audience in the token

### Issue: "Cannot fetch weather data"
**Solution**:
- Verify OpenWeatherMap API key is valid
- Check that backend server is running
- Ensure Auth0 token is being sent in Authorization header

---

## Production Deployment

### Update Allowed URLs

When deploying to production, update Auth0 Application settings:

1. **Allowed Callback URLs**: Add production URL (e.g., `https://yourdomain.com`)
2. **Allowed Logout URLs**: Add production URL
3. **Allowed Web Origins**: Add production URL
4. **Allowed Origins (CORS)**: Add production URL

### Environment Variables

Update `.env` files with production values:
- Use production domain instead of localhost
- Use secure secrets for JWT
- Enable HTTPS

---

## Security Best Practices

1. **MFA Enabled**: Email-based multi-factor authentication
2. **Signups Disabled**: Only pre-registered users can access
3. **JWT Validation**: Backend validates Auth0 tokens
4. **HTTPS**: Use HTTPS in production
5. **Token Expiration**: Auth0 tokens expire automatically
6. **Secure Storage**: Tokens stored securely by Auth0 SDK

---

## Additional Configuration Options

### Custom Email Templates

1. Go to **Branding** → **Email Templates**
2. Customize verification email, welcome email, etc.

### Social Connections

1. Go to **Authentication** → **Social**
2. Enable Google, Facebook, etc. for social login

### Custom Domain

1. Go to **Branding** → **Custom Domains**
2. Configure your own domain for Auth0 login pages

### Advanced MFA Options

1. Enable SMS, Push notifications, or Authenticator apps
2. Configure backup codes
3. Set up adaptive MFA based on risk

---

## Testing Credentials

**Test Account:**
- Email: `careers@fidenz.com`
- Password: `Pass#fidenz`

**Note**: This account should be created manually in Auth0 Dashboard as described in Step 6.

---

## Support

For Auth0-specific issues:
- Documentation: https://auth0.com/docs
- Community: https://community.auth0.com
- Support: https://support.auth0.com

For application issues:
- Check console logs in browser (F12)
- Check backend server logs
- Verify all environment variables are set correctly
