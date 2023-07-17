import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import ProductCard from "@components/ProductCard/ProductCard";
import useTablet from "@hooks/useTablet";
// slick
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const ProductSlider = ({ data, isMobile }) => {
  const navigate = useNavigate();
  const [isTablet] = useTablet();

  const handleOnClick = (item) => {
    navigate(`/product/details?productId=${item.productId}`);
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <ChevronLeftIcon
        className={className}
        onClick={onClick}
        _hover={{ color: "black" }}
        sx={{ ...style, display: isMobile ? "none" : isTablet ? "none" : "block" }}
        boxSize={8}
      />
    );
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <ChevronRightIcon
        className={className}
        _hover={{ color: "black" }}
        onClick={onClick}
        sx={{ ...style, display: isMobile ? "none" : isTablet ? "none" : "block" }}
        boxSize={8}
      />
    );
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 914,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  var mobileSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  var tabletSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Box py={[6, 6, 6, 0, 0]}>
      {isMobile ? (
        <Slider {...mobileSettings}>
          {data?.map((item, index) => {
            return (
              <ProductCard
                sx={{
                  mx: "auto",
                  mb: 1,
                }}
                key={index}
                isBestSelling={item.isBestSelling}
                title={item.productName}
                thumbImage={item.mainImageUrl}
                images={item.imageUrls}
                subtitle={item.productTypeName}
                onClick={() => {
                  handleOnClick(item);
                }}
              />
            );
          })}
        </Slider>
      ) : isTablet ? (
        <Slider {...tabletSettings}>
          {data?.map((item, index) => {
            return (
              <ProductCard
                sx={{
                  mx: "auto",
                  mb: 1,
                }}
                key={index}
                isBestSelling={item.isBestSelling}
                title={item.productName}
                thumbImage={item.mainImageUrl}
                images={item.imageUrls}
                subtitle={item.productTypeName}
                onClick={() => {
                  handleOnClick(item);
                }}
              />
            );
          })}
        </Slider>
      ) : (
        <Slider {...settings}>
          {data?.map((item, index) => {
            return (
              <ProductCard
                sx={{
                  mx: "auto",
                  mb: 1,
                }}
                key={index}
                isBestSelling={item.isBestSelling}
                title={item.productName}
                thumbImage={item.mainImageUrl}
                images={item.imageUrls}
                subtitle={item.productTypeName}
                onClick={() => {
                  handleOnClick(item);
                }}
              />
            );
          })}
        </Slider>
      )}
    </Box>
  );
};

export default ProductSlider;
