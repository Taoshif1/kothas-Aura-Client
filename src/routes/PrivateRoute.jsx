import { Navigate, useLocation } from "react-router-dom";

import Loader from "../components/common/Loader";

import useAuth from "../hooks/useAuth";

import { ROUTES } from "../constants/routes";

const PrivateRoute = ({ children }) => {
  const { user, dbUser, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user || !dbUser) {
    return <Navigate to={ROUTES.LOGIN} replace state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;
