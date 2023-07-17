import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Link, Text } from "@chakra-ui/react";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

const ProductsAccordion = ({ data }) => {
  const navigate = useNavigate();

  const handleMenuClick = (category) => {
    navigate(`/products?categoryId=${category.categoryId}`);
  };

  const handleSubmenuClick = (category, productType) => {
    navigate(`/products?categoryId=${category.categoryId}&productTypeId=${productType.productTypeId}`);
  };

  return (
    <Accordion borderBottom="none" borderTop="none" w="100%" allowMultiple>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <>
              <AccordionButton
                px={5}
                bg="#353535"
                borderBottom="1px solid #000000"
                sx={{ borderColor: "#000000 !important" }}
                h="50px"
              >
                <Box
                  fontSize="14px"
                  fontWeight="500"
                  textTransform="uppercase"
                  color="#FFEA85"
                  flex="1"
                  textAlign="left"
                >
                  <Link href="/products">
                    <FormattedMessage id="title.products" />
                  </Link>
                </Box>
                <Box color="#FFEA85">{isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}</Box>
              </AccordionButton>
            </>
            <AccordionPanel p={0}>
              <Box>
                <Accordion borderBottom="none" borderTop="none" allowToggle>
                  {data?.map((item, index) => {
                    return (
                      <AccordionItem key={index}>
                        {({ isExpanded }) => (
                          <>
                            <>
                              <AccordionButton px={5} pl={10} borderBottom="1px solid #000000" bg="#575757" h="43px">
                                <Box
                                  fontSize="14px"
                                  textTransform="uppercase"
                                  color="#FFEA85"
                                  flex="1"
                                  textAlign="left"
                                >
                                  <Text
                                    onClick={() => {
                                      handleMenuClick(item);
                                    }}
                                  >
                                    {item.categoryName}
                                  </Text>
                                </Box>
                                <Box color="#FFEA85">
                                  {isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}
                                </Box>
                              </AccordionButton>
                            </>
                            <AccordionPanel p={0}>
                              {item.productTypes?.map((i, a) => {
                                return (
                                  <Accordion borderBottom="none" borderTop="none" key={a}>
                                    <AccordionItem>
                                      <>
                                        <>
                                          <AccordionButton
                                            px={5}
                                            pl="60px"
                                            bg="#6B6E72"
                                            sx={{ borderColor: "#000000 !important" }}
                                            h="40px"
                                          >
                                            <Box
                                              fontSize="14px"
                                              textTransform="uppercase"
                                              color="#FFEA85"
                                              flex="1"
                                              textAlign="left"
                                            >
                                              <Text
                                                onClick={() => {
                                                  handleSubmenuClick(item, i);
                                                }}
                                              >
                                                {i.productTypeName}
                                              </Text>
                                            </Box>
                                          </AccordionButton>
                                        </>
                                      </>
                                    </AccordionItem>
                                  </Accordion>
                                );
                              })}
                            </AccordionPanel>
                          </>
                        )}
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default ProductsAccordion;
