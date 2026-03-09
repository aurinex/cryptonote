import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
  const user = localStorage.getItem("user_id");
  const guest = localStorage.getItem("guest");

  if (!user && !guest) {
    return <Navigate to="/auth" />;
  }

  return children;
};
