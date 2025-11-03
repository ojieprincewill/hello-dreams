import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function ProtectedRoute({ children, requireAdmin = false, requireSuperuser = false }) {
  const { isAuthenticated, isAdmin, isSuperuser, isLoading } = useAuth();
  const location = useLocation();

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Preserve the current location as redirect parameter
    return <Navigate to={`/signin?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Redirect to unauthorized if superuser access required but user is not superuser
  if (requireSuperuser && !isSuperuser) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Redirect to unauthorized if admin access required but user is not admin or superuser
  if (requireAdmin && !isAdmin && !isSuperuser) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated (and admin if required), render the protected content
  return children;
}
