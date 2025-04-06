// src/routes/RoleProtectedRoute.tsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
  const { token } = useSelector((state: RootState) => state.authentication);
  const { loggedUser } = useSelector((state: RootState) => state.user);

  if (!token) return <Navigate to="/login" replace />;

  if (loggedUser && allowedRoles.includes(loggedUser.role)) {
    return <Outlet />;
  }

  // Redirect if role is not allowed
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
