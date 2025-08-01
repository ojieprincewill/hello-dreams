import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import bgImage from '../../assets/login-bg.png'; // adjust path as needed

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { signIn, signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/userprofile');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      if (isSignUp) {
        await signUp.mutateAsync({ email, password });
        // For signup, redirect to dashboard or show success message
        navigate('/userprofile');
      } else {
        await signIn.mutateAsync({ email, password });
        // For login, redirect to dashboard
        navigate('/userprofile');
      }
    } catch (error) {
      console.error('Auth failed:', error);
      setLoginError(error.message || 'Authentication failed. Please try again.');
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    // Clear error when user starts typing
    if (loginError) setLoginError('');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `
          linear-gradient(45deg, rgba(255,140,0,0.55), rgba(0,123,255,0.55)),
          url(${bgImage})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-600/60 pointer-events-none" />
      <div className="relative z-10 max-w-md w-full bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          {isSignUp ? 'Create your account' : 'Sign in to your account'}
        </h2>
        
        {/* Error display */}
        {loginError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{loginError}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-60"
              placeholder="Email address"
              disabled={signIn.isPending || signUp.isPending}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-60"
              placeholder="Password"
              disabled={signIn.isPending || signUp.isPending}
            />
          </div>
          <button
            type="submit"
            disabled={signIn.isPending || signUp.isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {signIn.isPending || signUp.isPending
              ? 'Processing...'
              : isSignUp
              ? 'Sign Up'
              : 'Sign In'}
          </button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setLoginError(''); // Clear error when switching modes
              }}
              className="text-blue-600 hover:text-blue-500 text-sm disabled:opacity-50"
              disabled={signIn.isPending || signUp.isPending}
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
