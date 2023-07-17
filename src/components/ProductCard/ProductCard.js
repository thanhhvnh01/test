import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import './ProductCard.scss'

const fakeData = {
  title: "Luxury Straight Light Color Double Layer Silky Flat Weft Hair",
  subtitle: "Curly hair",
  images: ['/images/about_us_picture.png', '/images/about_us_picture.png', '/images/about_us_picture.png', '/images/about_us_picture.png'],
  thumbImage: '/images/about_us_picture.png',
  price: '$20.00',
}

const ProductCard = ({ title, subtitle, thumbImage, images, sx, onClick, isBestSelling }) => {
  const [hoverImage, setHoverImage] = useState(null);
  const [isHover, setIsHover] = useState(false);

  return (
    <Box
      className="product-card"
      onClick={() => {
        onClick();
      }}
      bg="#ffff"
      tabIndex={0}
      w={["175px", "182px", "182px", "97%", "99%"]}
      h={["280px", "290px", "290px", "390px", "390px"]}
      sx={{ ...sx, cursor: "pointer" }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <div className="img-container">
        <Image
          className="main-img"
          src={hoverImage === null ? fakeData.thumbImage : fakeData.images[hoverImage]}
          // src="/images/about_us_picture.png"
          alt="product"
        />
        <div className="price-container">
        <div className="prod-price">{fakeData.price}</div>
      </div>
      </div>

      {/* price */}
      

      {isBestSelling && (
        <Box p={1} px={2} bg="red" top="10px" left="-3px" sx={{ position: "absolute" }}>
          <Text color="#ffff" fontSize="12px" fontWeight="500">
            <FormattedMessage id="label.bestSelling" />
          </Text>
        </Box>
      )}

      <Box mt={"2px"} className="product-content">
        <div className="list-wrapper">
          <HStack className="list-img" spacing="0px" display={["none", "none", "none", "flex", "none"]}>
            {fakeData.images.slice(0, 3)?.map((image, index) => {
              return (
                <Image
                  onMouseEnter={() => {
                    setHoverImage(index);
                  }}
                  onMouseLeave={() => {
                    setHoverImage(null);
                  }}
                  h="47px"
                  w="48px"
                  key={index}
                  src={image}
                />
              );
            })}
          </HStack>
        </div>


        <VStack spacing="5px" px={1} display="block">
          <Text
            // textTransform="uppercase"
            fontWeight="400"
            m="auto"
            fontSize={["12px", "12px", "12px", "14px", "14px"]}
            noOfLines={2}
          >
            {fakeData.title}
          </Text>
        </VStack>
        <Box sx={{ bottom: 0 }} mb={2} ml={1}>
          <Text textTransform="none" fontSize="12px" color="#AAAAAA">
            {`${fakeData.subtitle}`}
          </Text>

        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
