import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Navbar from "./header/Navbar";

import "react-whatsapp-chat-widget/index.css";
import LocaleHeader from "./header/LocaleHeader";
import useMobile from "@hooks/useMobile";
import NavbarM from "./header/NavbarM";
import Filter from "./ProductFilter/Filter";
// icon

const MainLayout = () => {
  const [isMobile] = useMobile();
  return (
    <>
      <LocaleHeader isMobile={isMobile} />
      {isMobile ? <NavbarM /> : <Navbar />}
      <Outlet />
      <Footer />      
    </>
  );
};

export default MainLayout;
