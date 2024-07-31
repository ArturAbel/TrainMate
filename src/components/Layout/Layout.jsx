import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import useScrollToTop from "../../hooks/useScrollToTop";

export const Layout = () => {
  useScrollToTop();
  return (
    <section>
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  );
};
