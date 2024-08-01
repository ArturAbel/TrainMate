import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { useSelector } from "react-redux";

import "./PrivateRoute.css";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <section className="loading-full-page-section">
        <Loader />
      </section>
    );
  }

  if (location.pathname === "/trainers" && (!user || !user.role)) {
    return <Outlet />;
  }

  if (location.pathname === "/" && (!user || !user.role)) {
    return <Outlet />;
  }

  if (user && user.role === "trainer") {
    if (location.pathname === "/trainers" || location.pathname === "/") {
      return <Navigate to={`/trainer-panel/${user.uid}`} replace />;
    }
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
