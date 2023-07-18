import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react";
import DropDownSubmenu from "@components/DropDownSubmenu";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

const NavbarItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link className="navbar-item" href={to} sx={{ textDecoration: "none" }}>
      <Flex
        alignContent="center"
        justifyContent="center"
        fontSize="18px"
        fontWeight="600"
        textTransform="uppercase"
        display="block"
        {...rest}
      >
        {children}
      </Flex>
    </Link>
  );
};

const NavbarItems = ({ isOpen, dropDownData }) => {
  const navigate = useNavigate();
  const signUpElement = document.getElementById("sign-up-section");

  const handleScroll = () => {
    signUpElement.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      display={[isOpen ? "block" : "none", isOpen ? "block" : "none", isOpen ? "block" : "none", "block", "block"]}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={12}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <NavbarItem to="/our-story">
          <FormattedMessage id="title.ourStory" />
        </NavbarItem>
        <DropDownSubmenu
          data={dropDownData}
          title={
            <Flex
              alignContent="center"
              justifyContent="center"
              fontSize="18px"
              fontWeight="600"
              textTransform="uppercase"
              //   display="block"
            >
              <HStack className="navbar-item" justifyContent="center">
                <Text
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  <FormattedMessage id="title.products" />
                </Text>
                
              </HStack>
            </Flex>
          }
        />
        <NavbarItem to="/contact">
          <FormattedMessage id="title.contact" />
        </NavbarItem>
        <Flex
          className="navbar-item"
          onClick={() => {
            handleScroll();
          }}
          alignContent="center"
          justifyContent="center"
          fontSize="18px"
          fontWeight="600"
          textTransform="uppercase"
          display="block"
          sx={{  cursor: "pointer" }}
        >
          <FormattedMessage id="title.subscribe" />
        </Flex>
      </Stack>
    </Box>
  );
};

export default NavbarItems;
