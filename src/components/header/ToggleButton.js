import React from "react";
import { Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const ToggleButton = ({ toggle, isMobile }) => {
  return (
    <Box display={["block", "block", "block", "none", "none"]} onClick={toggle}>
      <HamburgerIcon />
    </Box>
  );
};
