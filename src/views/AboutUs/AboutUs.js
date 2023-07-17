import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Container,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import useMobile from "@hooks/useMobile";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";

const AboutUs = () => {
  const [isMobile] = useMobile();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Box>
        <Image
          mt={isMobile ? "87px" : "113px"}
          w="100%"
          h={["128px", "184px", "184px", "auto", "auto"]}
          src="/images/product_main.png"
        />
        <Container
          p={isMobile ? 0 : 2}
          maxW={isMobile ? "100%" : "1200px"}
          height="100%"
          bg="url('/backgrounds/support_background.png')"
          sx={{
            boxShadow: "0px -5px 4px 1px rgba(0, 0, 0, 0.38)",
            minHeight: "90vh !important",
            paddingBottom: "30px !important",
          }}
        >
          <Box py={3} px={3}>
            <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
              <BreadcrumbItem color="#3182CE">
                <BreadcrumbLink href="/">
                  <FormattedMessage id="label.home" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <Breadcrumb>
                  <FormattedMessage id="title.ourStory" />
                </Breadcrumb>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Box px={[4, 5, 5, "200px", "200px"]}>
            <Text
              fontFamily="Cinzel Decorative"
              fontSize={["32px", "43px", "43px", "90px", "90px"]}
              fontWeight="regular"
              color="#000000"
              textAlign="center"
              textTransform="uppercase"
            >
              <FormattedMessage id="info.andreaHair" />
            </Text>
            <Text
              fontSize={["14px", "14px", "14px", "14px", "14px"]}
              fontWeight="regular"
              color="#000000"
              textAlign="center"
              textTransform="capitalize"
            >
              <FormattedMessage id="info.describe" />
            </Text>
            <Center>
              <Image maxWidth={["300px", "500px", "500px", "500px", "500px"]} pt={10} src="/images/about_us_1.png" />
            </Center>
            <VStack pt={14} spacing={14}>
              <Box>
                <Text
                  fontSize={["14px", "14px", "14px", "14px", "14px"]}
                  fontWeight="bold"
                  color="#000000"
                  textAlign="center"
                  textTransform="capitalize"
                >
                  <FormattedMessage id="info.question1" />
                </Text>
                <Text
                  fontSize={["14px", "14px", "14px", "14px", "14px"]}
                  fontWeight="regular"
                  color="#000000"
                  textAlign="center"
                  textTransform="capitalize"
                >
                  <FormattedMessage id="info.explain1" />
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize={["14px", "14px", "14px", "14px", "14px"]}
                  fontWeight="bold"
                  color="#000000"
                  textAlign="center"
                  textTransform="capitalize"
                >
                  <FormattedMessage id="info.question2" />
                </Text>
                <Text
                  fontSize={["14px", "14px", "14px", "14px", "14px"]}
                  fontWeight="regular"
                  color="#000000"
                  textAlign="center"
                  textTransform="capitalize"
                >
                  <FormattedMessage id="info.explain2" />
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize={["14px", "14px", "14px", "14px", "14px"]}
                  fontWeight="bold"
                  color="#000000"
                  textAlign="center"
                  textTransform="capitalize"
                >
                  <FormattedMessage id="info.question3" />
                </Text>
                <Text
                  fontSize={["14px", "14px", "14px", "14px", "14px"]}
                  fontWeight="regular"
                  color="#000000"
                  textAlign="center"
                  textTransform="capitalize"
                >
                  <FormattedMessage id="info.explain3" />
                </Text>
              </Box>
            </VStack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AboutUs;
