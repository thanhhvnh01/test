import { Drawer, DrawerContent, DrawerOverlay, Flex, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FormattedMessage } from "react-intl";
import ProductsAccordion from "./ProductsAccordion";

const NavbarItem = ({ children, isLast, to, isProducts, ...rest }) => {
  return (
    <Link className="navbar-item" href={to} sx={{ textDecoration: "none" }}>
      <Flex
        alignContent="center"
        fontSize="14px"
        fontWeight="500"
        textTransform="uppercase"
        color={["#FFEA85", "#FFEA85", "#FFEA85", "#FFEA85"]}
        h="50px"
        px={5}
        justifyContent="flex-start"
        bg="#353535"
        sx={{ boxSizing: "border-box", borderBottom: "1px solid #000000" }}
        {...rest}
      >
        {!isProducts ? <Text my="auto">{children}</Text> : children}
      </Flex>
    </Link>
  );
};

const NavbarVertical = ({ isOpen, toggle, onClose, data }) => {
  const signUpElement = document.getElementById("sign-up-section");

  const handleScroll = () => {
    signUpElement.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="#61656B">
        <VStack alignItems="left" spacing={0}>
          <NavbarItem to="/our-story">
            <FormattedMessage id="title.ourStory" />
          </NavbarItem>
          {/* <FormattedMessage id="title.products" /> */}
          <ProductsAccordion data={data} />

          <NavbarItem to="/contact">
            <FormattedMessage id="title.contact" />
          </NavbarItem>
          <NavbarItem
            onClick={() => {
              handleScroll();
              onClose();
            }}
          >
            <FormattedMessage id="title.subscribe" />
          </NavbarItem>
        </VStack>
      </DrawerContent>
    </Drawer>
  );
};

export default NavbarVertical;
