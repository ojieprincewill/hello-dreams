import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import bgImage from '../../assets/login-bg.png'; // adjust path as needed

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard'); // Redirect to admin dashboard
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp.mutateAsync({ email, password });
      } else {
        await signIn.mutateAsync({ email, password });
      }
      navigate('/helloadmin1212'); // Redirect to admin dashboard
    } catch (error) {
      console.error('Auth failed:', error.message);
    }
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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            disabled={signIn.isPending || signUp.isPending}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {signIn.isPending || signUp.isPending
              ? 'Processing...'
              : isSignUp
              ? 'Sign Up'
              : 'Sign In'}
          </button>
          {(signIn.isError || signUp.isError) && (
            <div className="text-red-600 text-sm text-center">
              {signIn.error?.message || signUp.error?.message}
            </div>
          )}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-500 text-sm"
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
