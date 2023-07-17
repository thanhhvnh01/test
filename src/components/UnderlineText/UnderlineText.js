import { Box, Text } from "@chakra-ui/react";
import React from "react";

const UnderlineText = ({ content, ...props }) => {
  return (
    <Box>
      <Text {...props}>
        {content} <Box bg="black" w={97} h="3px" />
      </Text>
    </Box>
  );
};

export default UnderlineText;
