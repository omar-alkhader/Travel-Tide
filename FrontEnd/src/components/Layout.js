import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/global.css";

const Layout = () => {
  return (
    <div className="container">
      <Navbar />
      <main>
        <Outlet /> {/* This will load the correct page content */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;