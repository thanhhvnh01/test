import { getProductForHomePageAPI } from "@api/main";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import useMobile from "@hooks/useMobile";
import React, { useEffect, useState } from "react";
import { ResponsiveNavbarHeight } from "src/theme/ResponsiveTheme";
import LocaleHeader from "./LocaleHeader";
import Logo from "./Logo";
import NavbarItems from "./NavbarItems";
import NavbarVertical from "./NavbarVertical";
import { ToggleButton } from "./ToggleButton";
//scss
import './Navbar.scss'
import Cart from "./Cart";
import Searchbar from "@components/Searchbar";

const NavBarContainer = ({ children, isMobile, ...props }) => {
  return (
    <Box
      className="navbar"
      id="navbar"
      w="100%"
      sx={{
        boxShadow: "1px 1px 10px rgba(0,0,0,.15)",
        position: "fixed",
        top: 0,
        zIndex: "3 !important",
      }}
      bg="#ffffff"
    >

      <Flex
        position="relative"
        as="nav"
        align="center"
        justifyContent="space-between"
        alignContent="center"
        wrap="wrap"
        h={ResponsiveNavbarHeight}
        p={2}
        maxW="1400px"
        sx={{ ml: "auto", mr: "auto" }}
        color="#000"
        {...props}
      >
        {children}
      </Flex>
    </Box>
  );
};

const Navbar = ({ ...props }) => {
  const initLang = localStorage.getItem("language");
  const [isMobile] = useMobile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);

  const toggleOn = () => setOpen(true);
  const toggleOff = () => setOpen(false);

  const [dropDownData, setDropDownData] = useState([]);

  const fetchDropDownData = async (initLang) => {
    const res = await getProductForHomePageAPI(initLang);
    setDropDownData(res.data);
  };

  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        if (currentScrollPos < 110) {
          document.getElementById("navbar").style.top = "28px";
        }
      }
      else {
        document.getElementById("navbar").style.top = "-60px";
      }
      prevScrollpos = currentScrollPos;
    }
    fetchDropDownData(initLang);
  }, [initLang]);
  // console.log(open);

  return (
    <NavBarContainer isMobile={isMobile} {...props}>
      <Logo transform="scale(1.2)" w="100px" color={["white", "white", "primary.500", "primary.500"]} />
      <ToggleButton isMobile={isMobile} toggle={onOpen} isOpen={isOpen} />
      <NavbarItems dropDownData={dropDownData} isOpen={open} onMouseOver={toggleOn} onMouseLeave={toggleOff} />
      {isOpen && <NavbarVertical data={dropDownData} isOpen={isOpen} onClose={onClose} />}
      <Flex>
        <Searchbar />
        <Cart />
      </Flex>
    </NavBarContainer>
  );
};

export default Navbar;
