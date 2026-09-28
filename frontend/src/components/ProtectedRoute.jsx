import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeritageLoader from "./HeritageLoader";

// Protected routes wait for the session-restore check to finish. Without that
// wait, every refresh would briefly look "logged out" and bounce the user
// to the login page even though their token is perfectly valid.
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <HeritageLoader
        size="medium"
        message="Restoring your session..."
      />
    );
  }

  if (!isAuthenticated) {
    // Remember where they were headed so login can send them back.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
