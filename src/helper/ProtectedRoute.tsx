import { Navigate } from "react-router-dom";
import { isAuthenticate } from ".";

const ProtectedRoute = ({ children }: any) => {
  return isAuthenticate() ? children : <Navigate to="/e/signin" />;
};

export default ProtectedRoute;
