import { getProductDetailsAPI, getRelateProductAPI } from "@api/main";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import ProductSlider from "@components/ProductSlider";
import useMobile from "@hooks/useMobile";
import {
  HairStyleDisplayConfig,
  LengthMeasureUnitDisplayConfig,
  MaterialTypeDisplayConfig,
  PackingRuleDisplayConfig,
  WeightMeasureUnitDisplayConfig,
} from "@utility/constant";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import ContactModal from "./ContactModal";

const ProductDetails = () => {
  const initLang = localStorage.getItem("language");
  const [isMobile] = useMobile();
  const navigate = useNavigate();
  const query = useLocation().search;
  const productId = new URLSearchParams(query).get("productId");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState();
  const [relatedProductData, setRelatedProductData] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [productId]);

  const fetchData = async (productId, initLang) => {
    if (!!productId) {
      try {
        const res = await getProductDetailsAPI(productId, initLang);
        setData(res.data);
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchData(productId, initLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchRelatedProductData = async () => {
    if (!!productId) {
      try {
        const productRes = await getRelateProductAPI(12, 1, productId);
        setRelatedProductData(productRes.data.pageData);
      } catch (error) {}
    }
  };

  useEffect(() => {
    fetchRelatedProductData(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  //* actions
  const handleColorClick = (item) => {
    navigate(`/product/details?productId=${item.productId}`);
  };

  return (
    <>
      <Image
        id="product-image"
        mt={["87px", "87px", "113px", "113px", "113px"]}
        w="100%"
        h={["128px", "auto", "auto", "auto", "auto"]}
        src="/images/product_main.png"
      />
      <Container
        bg="#ffff"
        p={2}
        maxW={isMobile ? "100%" : "1200px"}
        mt={[0, "-100px", "-100px", "-100px", "-100px"]}
        sx={{
          mb: "20px",
          minHeight: "90vh !important",
          mr: "auto",
          ml: "auto",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
          pb: "30px",
        }}
      >
        <Box mt={10} pb={5}>
          <Grid templateColumns="repeat(7,1fr)">
            <GridItem colSpan={[7, 4, 4, 4, 4]}>
              <Center>
                <Image
                  sx={{ boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.27);" }}
                  w={["390px", "390px", "460px", "460px", "480px"]}
                  h={["390px", "390px", "460px", "460px", "480px"]}
                  src={data?.imageUrls[imageIndex]}
                />
              </Center>
              <Center mt={4}>
                <HStack spacing="27px">
                  {data?.imageUrls.map((image, index) => {
                    return (
                      <Image
                        onClick={() => {
                          setImageIndex(index);
                        }}
                        sx={{
                          boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.27);",
                          cursor: "pointer",
                          border: "1px solid #AAAAAA",
                        }}
                        key={index}
                        w={["40px", "50px", "50px", "90px", "90px"]}
                        h={["40px", "50px", "50px", "90px", "90px"]}
                        src={image}
                      />
                    );
                  })}
                </HStack>
              </Center>
            </GridItem>
            <GridItem colSpan={[7, 3, 3, 3, 3]}>
              <VStack alignItems="flex-start" p={3}>
                <Text fontSize={["20px", "20px", "26px", "26px", "26px"]} fontWeight="bold">
                  {data?.productName}
                </Text>
                <HStack>
                  <Text fontWeight="bold">
                    <FormattedMessage id="label.color" />:{" "}
                  </Text>
                  <Text>{data?.colorName}</Text> {data?.colorCode.length === 1 && <Text>{data?.colorCode[0]}</Text>}
                </HStack>
                <HStack sx={{ cursor: "pointer" }}>
                  <Box
                    width={["32px", "32px", "35px", "35px", "35px"]}
                    height={["32px", "32px", "35px", "35px", "35px"]}
                    bg={
                      data?.colorCode.length > 1
                        ? `linear-gradient(to bottom,${data?.colorCode[0]}, ${data?.colorCode[1]} 100%)`
                        : `${data?.colorCode[0]}`
                    }
                    borderRadius="50%"
                  />
                  {data?.referenceProducts.map((a, i) => {
                    return (
                      <Box
                        onClick={() => {
                          handleColorClick(a);
                        }}
                        key={i}
                        width={["32px", "32px", "35px", "35px", "35px"]}
                        height={["32px", "32px", "35px", "35px", "35px"]}
                        bg={
                          a?.colorCode.length > 1
                            ? `linear-gradient(to bottom,${a?.colorCode[0]}, ${a?.colorCode[1]} 100%)`
                            : `${a?.colorCode[0]}`
                        }
                        borderRadius="50%"
                      />
                    );
                  })}
                </HStack>
              </VStack>
              <VStack alignItems="flex-start" p={3}>
                <VStack alignItems="flex-start" spacing="10px">
                  <HStack>
                    <Text fontWeight="bold">
                      <FormattedMessage id="label.material" />:
                    </Text>
                    <Text>
                      <FormattedMessage id={`enum.${MaterialTypeDisplayConfig[data?.materialTypeId]}`} />
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">
                      <FormattedMessage id="label.origin" />:{" "}
                    </Text>
                    <Text>{data?.origin}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">
                      <FormattedMessage id="label.length" />:
                    </Text>
                    <Text>
                      {data?.fromLength} - {data?.toLength}{" "}
                      <FormattedMessage id={`enum.${LengthMeasureUnitDisplayConfig[data?.measureUnitLengthId]}`} />
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">
                      <FormattedMessage id="label.weight" />:
                    </Text>
                    <Text>
                      {data?.weight}{" "}
                      <FormattedMessage id={`enum.${WeightMeasureUnitDisplayConfig[data?.measureUnitWeightId]}`} />
                    </Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">
                      <FormattedMessage id="label.hairStyle" />:{" "}
                    </Text>
                    <Text>
                      <FormattedMessage id={`enum.${HairStyleDisplayConfig[data?.hairStyleId]}`} />
                    </Text>
                  </HStack>
                  <HStack>
                    <Text>
                      <b>
                        <FormattedMessage id="label.packing" />:
                      </b>{" "}
                      <FormattedMessage id={`enum.${PackingRuleDisplayConfig[data?.packingRuleId]}`} />
                    </Text>
                    <Text></Text>
                  </HStack>
                  <Button
                    _hover={{
                      boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.27);",
                    }}
                    variant="solid"
                    bg="tomato"
                    color="#ffff"
                    onClick={onOpen}
                  >
                    <FormattedMessage id="button.contact" />
                  </Button>
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
        <Box mt={10} px={4}>
          <Grid templateColumns="repeat(7,1fr)">
            <GridItem colSpan={[7, 4, 4, 4, 4]}>
              <AspectRatio _before={{ p: "0px !important" }} w="92%" h={["190px", "400px", "400px", "400px", "400px"]}>
                <iframe title="video" src={data?.videoUrl} allowFullScreen />
              </AspectRatio>
            </GridItem>
            <GridItem p={3} h="100%" colSpan={[7, 3, 3, 3, 3]}>
              <Grid h="100%" templateRows="repeat(2,1fr)">
                <GridItem rowSpan={1}>
                  <HStack>
                    <Text textAlign="justify">
                      <b>
                        <FormattedMessage id="label.description" />:{" "}
                      </b>
                      {data?.description}
                    </Text>
                  </HStack>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Box>
        {relatedProductData.length > 0 && (
          <Box mt={16}>
            <Box pb={[0, 0, 0, 6, 6]}>
              <Text
                fontSize={isMobile ? "20px" : "40px"}
                fontWeight="bold"
                textAlign="center"
                textTransform="uppercase"
                pt={5}
              >
                <FormattedMessage id="label.relatedProduct" />
              </Text>
              <Flex bg="black" w={97} h="3px" m="auto" />
            </Box>
            <Box bg="#ffff" p={isMobile ? 0 : 0}>
              <ProductSlider data={relatedProductData} isMobile={isMobile} />
            </Box>
          </Box>
        )}
        {isOpen && <ContactModal isOpen={isOpen} onClose={onClose} productId={productId} />}
      </Container>
    </>
  );
};

export default ProductDetails;
