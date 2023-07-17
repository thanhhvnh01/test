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
                zIndex: 2,
            }}
            bg="#ffffff"
        >

            <Flex
                as="nav"
                align="center"
                justifyContent="space-between"
                alignContent="center"
                wrap="wrap"
                h={ResponsiveNavbarHeight}
                p={2}
                maxW="1320px"
                sx={{ ml: "auto", mr: "auto" }}
                color="#000"
                {...props}
            >
                {children}
            </Flex>
        </Box>
    );
};

const NavbarM = ({ ...props }) => {
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
        fetchDropDownData(initLang);
    }, [initLang]);
    // console.log(open);

    return (
        <NavBarContainer isMobile={isMobile} {...props}>
            <ToggleButton isMobile={isMobile} toggle={onOpen} isOpen={isOpen} />
            <NavbarItems dropDownData={dropDownData} isOpen={open} onMouseOver={toggleOn} onMouseLeave={toggleOff} />
            {isOpen && <NavbarVertical data={dropDownData} isOpen={isOpen} onClose={onClose} />}
            <Logo transform="translate(45px)" w="100px" color={["white", "white", "primary.500", "primary.500"]} />
            <Flex>
                <Searchbar />
                <Cart />
            </Flex>
        </NavBarContainer>
    );
};

export default NavbarM;
