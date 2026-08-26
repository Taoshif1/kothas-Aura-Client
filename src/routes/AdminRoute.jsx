import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
const AdminRoute = ({ children }) => {
  const { user, dbUser, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loader />;
  if (!user) return <Navigate to={ROUTES.LOGIN} replace state={location.pathname} />;
  if (dbUser?.role !== "admin") return <Navigate to={ROUTES.HOME} replace />;
  return children;
};
export default AdminRoute;
