import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  SlideFade,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ImageSlider from "@components/ImageSlider";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FormattedMessage } from "react-intl";
// slider
import { getErrorMessage } from "@api/handleApiError";
import { getBestSaleProductsAPI, getImagesAPI, getSupportersAPI } from "@api/main";
import ProductSlider from "@components/ProductSlider";
import SupporterCard from "@components/SupporterCard";
import useMobile from "@hooks/useMobile";
import { useNavigate } from "react-router-dom";
import Widget from "@components/Widget";

const Home = () => {
  const initLang = localStorage.getItem("language");
  const toast = useToast();
  const [isMobile] = useMobile();
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const [supporterData, setSupporterData] = useState([]);
  const [slideImages, setSlideImages] = useState([]);

  const fetchImageData = async () => {
    try {
      const res = await getImagesAPI();
      setSlideImages(res.data);
    } catch (error) {
      toast({
        title: "Api error",
        description: getErrorMessage(error),
        status: "error",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchImageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProductData = async (lang) => {
    try {
      const res = await getBestSaleProductsAPI(lang);
      setProductsData(res.data.pageData);
    } catch (error) {
      toast({
        title: "Api error",
        description: getErrorMessage(error),
        status: "error",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchProductData(initLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLang]);

  const fetchSupporterData = async () => {
    try {
      const res = await getSupportersAPI(3, 1);
      setSupporterData(res.data.pageData);
    } catch (error) {
      toast({
        title: "Api error",
        description: getErrorMessage(error),
        status: "error",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchSupporterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hoverMouseLeft = () => { document.getElementById('main-dropdown').style.visibility = 'hidden' }

  return (
    <div onMouseEnter={()=>{hoverMouseLeft()}}>
      <ImageSlider images={slideImages} />
      <Container
        p={0}
        maxW={["100%", "100%", "100%", "1200px", "1200px"]}
        sx={{ mt: 0, minHeight: "90vh !important", mr: "auto", ml: "auto" }}
      >
        <Box>
          <BestSaleSection isMobile={isMobile} data={productsData} navigate={navigate} />
          <AboutUsSection isMobile={isMobile} navigate={navigate} />
          <SupportSection isMobile={isMobile} data={supporterData} />
        </Box>
      </Container>
      <Widget />
    </div>
  );
};

const BestSaleSection = ({ isMobile, data, navigate }) => {
  const { ref, inView } = useInView();
  return (
    <SlideFade ref={ref} in={inView} offsetY="100px">
      <Box>
        <Box pb={[0, 0, 0, 6, 6]}>
          <Text
            fontSize={["20px", "20px", "20px", "40px", "40px"]}
            fontWeight="bold"
            textAlign="center"
            textTransform="uppercase"
            pt={5}
          >
            <FormattedMessage id="label.bestSelling" />
          </Text>
          <Flex bg="black" w={97} h="3px" m="auto" />
        </Box>
        <Box bg="#FFFF" p={isMobile ? 0 : 0}>
          <ProductSlider data={data} isMobile={isMobile} />
          {/* <Grid
            templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)"]}
          >
            {data.map((item, index) => {
              return (
                <GridItem sx={{ display: "flex", mx: "auto" }} colSpan={1} key={index}>
                  <ProductCard
                    sx={{
                      mb: 1,
                      mx: "auto",
                    }}
                    key={index}
                    isBestSelling={item.isBestSelling}
                    title={item.productName}
                    thumbImage={item.mainImageUrl}
                    images={item.imageUrls}
                    subtitle={item.productTypeName}
                    // onClick={() => {
                    //   handleOnClick(item);
                    // }}
                  />
                </GridItem>
              );
            })}
          </Grid> */}
        </Box>
      </Box>
    </SlideFade>
  );
};

const AboutUsSection = ({ content, isMobile, navigate }) => {
  const { ref, inView } = useInView();
  return (
    <SlideFade ref={ref} in={inView} offsetY="100px">
      {!isMobile ? (
        <Flex bg="#F5F5F5" px={[10, 10, 10, 10, "50px"]} mb={5} justifyContent="center">
          <Flex mx="auto" justifyContent="center">
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem colSpan={1} display="flex" ml="auto">
                <Image src="/images/about_us_picture.png" />
              </GridItem>
              <GridItem colSpan={1} sx={{ mt: "auto", mb: "auto", display: "flex" }} maxW="690px">
                <Box>
                  <Box pb={[1, 2, 3, 5, 5]}>
                    <Text
                      fontSize={["20px", "20px", "20px", "40px", "40px"]}
                      fontWeight="bold"
                      textTransform="uppercase"
                      textAlign="center"
                    >
                      <FormattedMessage id="title.ourStory" defaultMessage="About us" />
                    </Text>
                    <Flex bg="black" w={97} h="3px" m="auto" />
                  </Box>
                  <Box fontSize={["10px", "10px", "10px", "16px", "16px"]} bg="#DFDFDF" p={7} borderRadius="17px">
                    <Text textAlign="justify">
                      <FormattedMessage id="info.aboutUsSection" />
                    </Text>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                    <Button
                      size={["sm", "sm", "sm"]}
                      onClick={() => {
                        navigate("/our-story");
                      }}
                      textTransform="none"
                      _hover={{ backgroundColor: "#D8D8D8" }}
                      sx={{ color: " #2D3748", borderColor: "#2D3748" }}
                    >
                      <FormattedMessage id="button.readMore" />
                    </Button>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Flex>
        </Flex>
      ) : (
        <Box bg="#F5F5F5" py={5}>
          <VStack spacing="24px">
            <Box>
              <Text fontSize="20px" fontWeight="bold" textTransform="uppercase" textAlign="center">
                <FormattedMessage id="title.ourStory" defaultMessage="About us" />
              </Text>
              <Flex bg="black" w={97} h="3px" m="auto" />
            </Box>
            <Image h="334px" px={10} pt={0} src="/images/about_us_picture.png" />
            <Text px={10} fontSize="10px" textAlign="justify">
              <FormattedMessage id="info.aboutUsSection" />
            </Text>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
              <Button
                onClick={() => {
                  navigate("/our-story");
                }}
                size="sm"
                textTransform="none"
                _hover={{ backgroundColor: "#D8D8D8" }}
                sx={{ color: " #2D3748", borderColor: "#2D3748" }}
              >
                <FormattedMessage id="button.readMore" />
              </Button>
            </Box>
          </VStack>
        </Box>
      )}
    </SlideFade>
  );
};

const SupportSection = ({ isMobile, data }) => {
  const { ref, inView } = useInView();
  return (
    <Box bgImage="url('/backgrounds/support_background.png')">
      <SlideFade ref={ref} in={inView} offsetY="100px">
        <Box pb={5}>
          <Text
            pt={10}
            fontSize={["20px", "20px", "20px", "40px", "40px"]}
            fontWeight="bold"
            textAlign="center"
            textTransform="uppercase"
          >
            <FormattedMessage id="label.supportOnline" />
          </Text>
          <Flex bg="black" w={97} h="3px" m="auto" />
          <Grid mt={2} templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)"} gap={6}>
            {data?.map((item, index) => {
              return (
                <GridItem
                  sx={{ display: "flex", justifyContent: "center" }}
                  key={index}
                  colSpan={1}
                  p={["10px", "20px", "20px", "50px", "50px"]}
                  pt={3}
                >
                  <SupporterCard
                    isMobile={isMobile}
                    image={item.avatarUrl}
                    name={item.supporterName}
                    email={item.email}
                    fb={item.facebookUrl}
                    ig={item.instagramUrl}
                    whatsapp={item.whatsappPhoneNumber}
                  />
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      </SlideFade>
    </Box>
  );
};

export default Home;
