import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function UnauthorizedPage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-4">
          You don't have permission to access this page.
        </p>
        {user && (
          <p className="text-sm text-gray-500 mb-6">
            Logged in as: <span className="font-medium">{user.email}</span>
          </p>
        )}
        <p className="text-gray-600 mb-8">
          Please contact an administrator if you believe this is an error.
        </p>
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mr-3"
          >
            Go Home
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
