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
    return <Navigate to={ROUTES.LOGIN} replace state={{from:location.pathname+location.search}} />;
  }

  if(dbUser.role==="admin")return <Navigate to={ROUTES.ADMIN} replace/>;

  return children;
};

export default PrivateRoute;
