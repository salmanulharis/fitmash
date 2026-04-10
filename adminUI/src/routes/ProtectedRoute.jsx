import { Navigate } from "react-router-dom";

const isAuthenticated = true; // change to false to test redirect

export default function ProtectedRoute({ children }) {
  return isAuthenticated ? children : <Navigate to="/" />;
}