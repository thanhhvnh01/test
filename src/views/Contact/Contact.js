import {
  Box,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Flex,
  GridItem,
  Grid,
  Button,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { CgMail, CgPhone } from "react-icons/cg";
import { ImLocation2 } from "react-icons/im";
import { Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useMobile from "@hooks/useMobile";
import SupporterCard from "@components/SupporterCard";
import { getSupportersAPI, sendMessageAPI } from "@api/main";
import { FormProvider, RHFInput } from "@components/hook-form";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "@api/handleApiError";

const Contact = () => {
  const [isMobile] = useMobile();
  const [supporterData, setSupporterData] = useState([]);

  const intl = useIntl();
  const toast = useToast();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  };
  const ContactSchema = yup.object().shape({
    firstName: yup.string().required().max(256),
    lastName: yup.string().required().max(256),
    email: yup.string().email().required().max(256),
    phoneNumber: yup.string().required(),
    message: yup.string().required(),
  });

  const methods = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(ContactSchema),
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const onSubmit = async (data) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      message: data.message,
    };
    try {
      await sendMessageAPI(formData);
      toast({
        title: "Success",
        description: intl.formatMessage({ id: "toast.messageContactSuccess" }),
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Api error",
        description: getErrorMessage(error),
        status: "error",
        duration: 3000,
      });
    }
  };

  const fetchSupporterData = async () => {
    try {
      const res = await getSupportersAPI(12, 1);
      setSupporterData(res.data.pageData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchSupporterData();
  }, []);
  return (
    <Box bg="#F5F5F5">
      <Image
        mt={["87px", "87px", "113px", "113px", "113px"]}
        w="100%"
        h={["128px", "auto", "auto", "auto", "auto"]}
        src="/images/product_main.png"
      />

      <Container
        p={0}
        maxW={["100%", "100%", "100%", "1200px", "1200px"]}
        sx={{ mt: 0, minHeight: "60vh !important", mr: "auto", ml: "auto" }}
      >
        <Box py={3} px={3}>
          <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem color="#3182CE">
              <BreadcrumbLink href="/">
                <FormattedMessage id="label.home" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Breadcrumb href="/contact">
                <FormattedMessage id="title.contact" />
              </Breadcrumb>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box>
          <Text
            fontSize={["20px", "20px", "20px", "40px", "40px"]}
            fontWeight="bold"
            color="#000000"
            textAlign="center"
            textTransform="uppercase"
          >
            <FormattedMessage id="label.contactUs" />
          </Text>
          <Text
            fontSize={["12px", "12px", "12px", "18px", "18px"]}
            fontWeight="regular"
            color="#000000"
            textAlign="center"
            textTransform="uppercase"
          >
            <FormattedMessage id="label.any" />
          </Text>
        </Box>
        {!isMobile ? (
          <Flex bg="#FFFFFF" my={5}>
            <Grid templateColumns="repeat(10, 1fr)" w="100%">
              <GridItem colSpan={4} bg="url('/backgrounds/contact_2.jpg')">
                <Box sx={{ p: 10 }}>
                  <Text
                    fontSize={["16px", "24px", "24px", "24px", "24px"]}
                    fontWeight="bold"
                    color="#FFFFFF"
                    textTransform="uppercase"
                  >
                    <FormattedMessage id="label.contactInformation" />
                  </Text>
                  <Text fontSize={["15px", "14px", "14px", "14px", "14px"]} fontWeight="regular" color="#FFFFFF">
                    <FormattedMessage id="label.saySomething" />
                  </Text>
                  <VStack alignItems="flex-start" mt={5} spacing={4}>
                    <HStack mt={10}>
                      <CgPhone style={{ color: "#FFFF", height: "19px", width: "19px" }} />
                      <Text fontSize={["6px", "14px", "14px", "14px", "14px"]} fontWeight="regular" color="#FFFFFF">
                        <FormattedMessage id="info.phoneNumber" />
                      </Text>
                    </HStack>
                    <HStack mt={10}>
                      <CgMail style={{ color: "#FFFF", height: "22px", width: "22px" }} />
                      <Text fontSize={["6px", "14px", "14px", "14px", "14px"]} fontWeight="regular" color="#FFFFFF">
                        <FormattedMessage id="info.email" />
                      </Text>
                    </HStack>
                    <HStack>
                      <ImLocation2 style={{ color: "#FFFF", height: "22px", width: "22px" }} />
                      <Text fontSize={["6px", "14px", "14px", "14px", "14px"]} fontWeight="regular" color="#FFFFFF">
                        <FormattedMessage id="info.address" />
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </GridItem>
              <GridItem w="100%" colSpan={6} sx={{ mt: "auto", mb: "auto", display: "flex" }}>
                <Box w="100%" p={6} py={10}>
                  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid templateColumns="repeat(2,1fr)" gap={10}>
                      <GridItem colSpan={1}>
                        <Box>
                          <Text>
                            <FormattedMessage id="label.firstName" />
                          </Text>
                          <RHFInput name="firstName" variant="flushed" />
                        </Box>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Box>
                          <Text>
                            <FormattedMessage id="label.lastName" />
                          </Text>
                          <RHFInput name="lastName" variant="flushed" />
                        </Box>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Box>
                          <Text>
                            <FormattedMessage id="label.email" />
                          </Text>
                          <RHFInput name="email" variant="flushed" />
                        </Box>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Box>
                          <Text>
                            <FormattedMessage id="label.phoneNumber" />
                          </Text>
                          <RHFInput name="phoneNumber" variant="flushed" />
                        </Box>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Box>
                          <Text>
                            <FormattedMessage id="label.message" />
                          </Text>
                          <RHFInput
                            placeholder={intl.formatMessage({ id: "placeholder.message" })}
                            name="message"
                            variant="flushed"
                          />
                        </Box>
                      </GridItem>
                    </Grid>
                    <Box sx={{ display: "flex", mt: 10 }}>
                      <Button
                        _hover={{ boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.27);" }}
                        disabled={!isDirty || !isValid}
                        type="submit"
                        ml="auto"
                        p={6}
                        bg="#000000"
                        variant="solid"
                        fontWeight="500"
                        textTransform="none"
                      >
                        <FormattedMessage id="button.sendMessage" />
                      </Button>
                    </Box>
                  </FormProvider>
                </Box>
              </GridItem>
            </Grid>
          </Flex>
        ) : (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <GridItem colSpan={1} sx={{ mt: "auto", mb: "auto", display: "flex" }} maxW="690px">
                <Box w="100%" p={6} py={10}>
                  <Grid templateColumns="repeat(2,1fr)" gap={10}>
                    <GridItem colSpan={2}>
                      <Box>
                        <Text>
                          <FormattedMessage id="label.firstName" />
                        </Text>
                        <RHFInput name="firstName" variant="flushed" />
                      </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Box>
                        <FormattedMessage id="label.lastName" />
                        <Text></Text>
                        <RHFInput name="lastName" variant="flushed" />
                      </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Box>
                        <Text>
                          <FormattedMessage id="label.email" />
                        </Text>
                        <RHFInput name="email" variant="flushed" />
                      </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Box>
                        <Text>
                          <FormattedMessage id="label.phoneNumber" />
                        </Text>
                        <RHFInput name="phoneNumber" variant="flushed" />
                      </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Box>
                        <Text>
                          <FormattedMessage id="label.message" />
                        </Text>
                        <RHFInput
                          placeholder={intl.formatMessage({ id: "placeholder.message" })}
                          name="message"
                          variant="flushed"
                        />
                      </Box>
                    </GridItem>
                  </Grid>
                  <Box sx={{ display: "flex", mt: 10, justifyContent: "center" }}>
                    <Button
                      _hover={{ boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.27);" }}
                      disabled={!isDirty || !isValid}
                      type="submit"
                      p={6}
                      bg="#000000"
                      variant="solid"
                      fontWeight="500"
                      textTransform="none"
                    >
                      <FormattedMessage id="button.sendMessage" />
                    </Button>
                  </Box>
                </Box>
              </GridItem>
              <GridItem colSpan={1} bg="url('/backgrounds/contact_2.jpg')">
                <Box sx={{ p: 10 }}>
                  <Text
                    fontSize={["22px", "24px", "24px", "24px", "24px"]}
                    fontWeight="bold"
                    color="#FFFFFF"
                    textTransform="uppercase"
                  >
                    <FormattedMessage id="label.contactInformation" />
                  </Text>
                  <Text fontSize={["15px", "14px", "14px", "14px", "14px"]} fontWeight="regular" color="#FFFFFF">
                    <FormattedMessage id="label.saySomething" />
                  </Text>
                  <VStack alignItems="flex-start" mt={5} spacing={4}>
                    <HStack mt={10}>
                      <CgPhone style={{ color: "#FFFF", height: "19px", width: "19px" }} />
                      <Text fontSize={["15px", "14px", "14px", "14px", "14px"]} fontWeight="regular" color="#FFFFFF">
                        <FormattedMessage id="info.phoneNumber" />
                      </Text>
                    </HStack>
                    <HStack mt={10}>
                      <CgMail style={{ color: "#FFFF", height: "22px", width: "22px" }} />
                      <Text fontSize={["15px", "14px", "14px", "14px", "14px"]} fontWeight="regular" color="#FFFFFF">
                        <FormattedMessage id="info.email" />
                      </Text>
                    </HStack>
                    <HStack>
                      <ImLocation2 style={{ color: "#FFFF", height: "22px", width: "22px" }} />
                      <Text fontSize={["15px", "14px", "14px", "14px", "14px"]} fontWeight="regular" color="#FFFFFF">
                        <FormattedMessage id="info.address" />
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </GridItem>
            </Grid>
          </FormProvider>
        )}

        <Box bgImage="url('/backgrounds/support_background.png')">
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
            <Grid templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)"} gap={6}>
              {supporterData?.map((item, index) => {
                return (
                  <GridItem
                    sx={{ display: "flex", justifyContent: "center" }}
                    key={index}
                    colSpan={1}
                    p={["10px", "20px", "20px", "50px", "50px"]}
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
            <Button
              variant="link"
              className="navbar-item"
              fontWeight="500"
              sx={{
                textTransform: "none",
                textDecoration: "none",
                display: "flex",
                ml: "auto",
                mr: 10,
                color: "black",
              }}
            ></Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
