import { Box, Container, Image } from "@chakra-ui/react";
import useMobile from "@hooks/useMobile";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// responsive

const ImageSlider = ({ images }) => {
  const [isMobile] = useMobile();

  return (
    <Container p={0} maxW={["100%", "100%", "100%", "1200px", "1200px"]}>
      <Box mt={["87px", "87px", "113px", "113px", "113px"]} w="100%" h={["128px", "auto", "auto", "auto", "auto"]}>
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          showArrows={false}
          showStatus={false}
          interval={6000}
          className="slide-container"
        >
         
        </Carousel>
      </Box>
    </Container>
  );
};

export default ImageSlider;
