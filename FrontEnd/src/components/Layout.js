import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/global.css";

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div className="fluid-container">
        <Outlet /> {/* This will load the correct page content */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;