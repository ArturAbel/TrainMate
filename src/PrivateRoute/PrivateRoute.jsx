import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
