import { Avatar, Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const SupporterCard = ({ isMobile, image, name, email, phoneNumber, fb, ig, whatsapp }) => {
  const handleClick = (url, whatsapp) => {
    if (!!whatsapp) {
      window.open(`https://wa.me/${whatsapp}`);
    } else window.open(url);
  };

  return (
    <Box w={["200px", "200px", "200px", "290px", "290px"]} bg="#FFFF" py={3} sx={{ border: "1px solid #AAAAAA" }}>
      <Avatar w="71px" h="71px" sx={{ display: "flex", m: "auto", my: 3 }} src={image} />
      <VStack display="flex" spacing="1px">
        <Text align="center" fontSize={["12px", "12px", "12px", "16px", "16px"]} fontWeight="bold">
          {name}
        </Text>
        <Text fontSize={["11px", "11px", "11px", "16px", "16px"]}>{email}</Text>
        <Text fontSize={isMobile ? "11px" : "16px"}>{phoneNumber}</Text>
        <HStack sx={{ cursor: "pointer" }}>
          <Image
            onClick={() => {
              handleClick(fb);
            }}
            h="20px"
            src="/icons/facebook_gif.gif"
          />
          <Image
            onClick={() => {
              handleClick(ig);
            }}
            h="20px"
            src="/icons/instagram_gif.gif"
          />
          <Image
            onClick={() => {
              handleClick("", whatsapp);
            }}
            h="20px"
            src="/icons/whatsapp_gif.gif"
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default SupporterCard;
