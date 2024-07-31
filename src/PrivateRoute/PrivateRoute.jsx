import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  console.log(location);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (location.pathname === "/trainers" && (!user || !user.role)) {
    return <Outlet />;
  }
  
  if (location.pathname === "/" && (!user || !user.role)) {
    return <Outlet />;
  }

  if (user && allowedRoles.includes(user.role) ) {
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
