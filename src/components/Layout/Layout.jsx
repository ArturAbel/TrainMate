import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

export const Layout = () => {
  return (
    <section>
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  );
};
