# Password Reset Flow Documentation

## Overview
This document describes the password reset functionality implemented in the Hello Dreams Academy application.

## Flow Description

### 1. User Requests Password Reset
- User clicks "Forgot Password?" on the login page (`/signin`)
- A modal appears asking for their email address
- User enters their email and clicks "Send Reset Link"
- The `resetPassword` function is called from `src/services/auth.js`
- Supabase sends a password reset email to the user

### 2. User Clicks Reset Link
- User receives an email with a reset link
- The link contains `access_token` and `refresh_token` as URL parameters
- The link redirects to `/reset-password` (configured in `src/services/auth.js`)

### 3. Password Reset Page
- The `ResetPasswordPage` component (`src/pages/auth/ResetPasswordPage.jsx`) loads
- The component checks for valid tokens in the URL parameters
- If tokens are valid, the user can enter a new password
- If tokens are invalid/expired, an error message is shown

### 4. Password Requirements
The new password must meet these requirements:
- At least 8 characters long
- Contains at least one lowercase letter
- Contains at least one uppercase letter
- Contains at least one special symbol (@>!?.*%$)
- Password confirmation must match

### 5. Password Update
- When user submits the form, `updatePasswordWithToken` is called
- This function uses the tokens from the URL to authenticate the user
- The new password is updated in Supabase
- User is redirected to the sign-in page with a success message

## Technical Implementation

### Files Modified/Created
1. **`src/pages/auth/ResetPasswordPage.jsx`** - New password reset page component
2. **`src/App.jsx`** - Added routing for `/reset-password`
3. **`src/services/auth.js`** - Already had `resetPassword` and `updatePasswordWithToken` functions
4. **`src/hooks/useAuth.js`** - Already had the necessary mutations

### Key Features
- **Token Validation**: Checks for valid access_token and refresh_token in URL
- **Password Strength Indicator**: Visual feedback for password requirements
- **Error Handling**: Comprehensive error messages for various failure scenarios
- **Loading States**: Proper loading indicators during API calls
- **Responsive Design**: Matches the existing design language of the app
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Security Considerations
- Tokens are validated before allowing password reset
- Password requirements ensure strong passwords
- Tokens are single-use and expire automatically
- All API calls are properly authenticated

## Testing the Flow

### Manual Testing Steps
1. Go to `/signin`
2. Click "Forgot Password?"
3. Enter a valid email address
4. Check email for reset link
5. Click the reset link
6. Enter a new password meeting all requirements
7. Confirm the password
8. Submit the form
9. Verify redirect to sign-in page
10. Try signing in with the new password

### Error Scenarios to Test
- Invalid/expired reset link
- Weak password (doesn't meet requirements)
- Password confirmation mismatch
- Network errors during password update

## Configuration

### Supabase Settings
- The redirect URL `/reset-password` must be configured in Supabase Auth settings
- Email templates can be customized in the Supabase dashboard
- Rate limiting is configured for password reset requests

### Environment Variables
- `VITE_SUPABASE_KEY` - Required for Supabase client initialization
- Supabase URL is hardcoded in `src/supabase/client.js`

## Future Enhancements
- Add CAPTCHA protection for password reset requests
- Implement password reset attempt rate limiting
- Add email verification before allowing password reset
- Support for password reset via SMS (if phone auth is enabled)
