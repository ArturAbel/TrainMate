import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { useSelector } from "react-redux";
import "./PrivateRoute.css";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Log the current user data
  console.log("Current user data:", user);

  // Display a loading spinner while user data is being loaded
  if (loading) {
    return (
      <section className="loading-full-page-section">
        <Loader />
      </section>
    );
  }

  // Allow access to the trainers and home pages if the user does not exist or has no role
  if (
    (location.pathname === "/trainers" || location.pathname === "/") &&
    (!user || !user.role)
  ) {
    return <Outlet />;
  }

  // Redirect trainers to their specific panel if they are on the trainers or home page
  if (user && user.role === "trainer") {
    if (location.pathname === "/trainers" || location.pathname === "/") {
      return <Navigate to={`/trainer-panel/${user.uid}`} replace />;
    }
    // If the trainer is not approved, redirect to a different page or show a message
    if (user.approved !== true) {
      return <Navigate to="/pending-trainer" replace />;
    }
  }

  // Allow access if the user has an allowed role
  if (user && allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  // Redirect to login if no user is found
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    // Redirect to the home page for any other case
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
