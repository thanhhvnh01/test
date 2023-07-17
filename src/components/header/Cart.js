import { Box, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { TiShoppingCart } from "react-icons/ti";
import React from "react";

const Cart = () => {
  return (
    <Menu>
      <MenuButton>
        <TiShoppingCart size={30} />
      </MenuButton>
    </Menu>
  );
};

export default Cart;
