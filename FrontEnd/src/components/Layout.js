import { Outlet, useOutletContext } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatButton from "../components/ChatButton";
import "../styles/global.css";
import "../styles/ChatButton.css";


const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div className="fluid-container">
        <Outlet context={{ setIsChatOpen }} /> {/* Provide context to children */}
      </div>
      <Footer />
      <ChatButton isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default Layout;