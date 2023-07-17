import { getCategoriesAPI, getColorAPI, getProductTypesAPI } from "@api/main";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Text } from "@chakra-ui/react";
import { RHFRadioGroup } from "@components/hook-form";
import { RHFSingleCheckbox } from "@components/hook-form/RHFCheckbox";
import { arrayToSelectOptions } from "@utility/ultils";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

const ProductFilter = ({ categoryId, setValue, productTypeId, isBestSelling, colorId }) => {
  const navigate = useNavigate();
  const initLang = localStorage.getItem("language");
  const [categoryData, setCategoryData] = useState([]);
  const [productTypeData, setProductTypeData] = useState([]);
  const [colorData, setColorData] = useState([]);

  const handleMenuClick = (category) => {
    navigate(`/products?categoryId=${category}&color=${colorId}&isBestSelling=${isBestSelling}`);
  };

  const handleProductTypeClick = (productType) => {
    navigate(
      `/products?categoryId=${categoryId}&productTypeId=${productType}&color=${colorId}&isBestSelling=${isBestSelling}`
    );
  };

  const handleColorClick = (color) => {
    navigate(
      `/products?categoryId=${categoryId}&productTypeId=${productTypeId}&color=${color}&isBestSelling=${isBestSelling}`
    );
  };

  const handleIsBestSellingClick = (bestSelling) => {
    navigate(
      `/products?categoryId=${categoryId}&productTypeId=${productTypeId}&color=${colorId}&isBestSelling=${bestSelling}`
    );
  };

  const fetchCategoryData = async (initLang) => {
    try {
      const categoryRes = await getCategoriesAPI(initLang);
      setCategoryData(categoryRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryData(initLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLang, categoryId]);

  const fetchProductTypeData = async (categoryId, lang) => {
    try {
      const productTypeRes = await getProductTypesAPI(categoryId, lang);
      setProductTypeData(productTypeRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!!categoryId) {
      fetchProductTypeData(categoryId, initLang);
    }
  }, [categoryId, initLang]);

  // fetch color
  const fetchColorData = async (lang) => {
    try {
      const colorRes = await getColorAPI(lang);
      setColorData(colorRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchColorData(initLang);
  }, [initLang]);

  // console.log(productTypeId);
  return (
    <Box>
      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        <AccordionItem borderTop="none">
          {({ isExpanded }) => (
            <>
              <AccordionButton py={3}>
                <Box flex="1" textAlign="left">
                  <Text fontSize={["16px", "12px", "12px", "16px", "16px"]} fontWeight="bold">
                    <FormattedMessage id="label.category" />
                  </Text>
                </Box>
                {isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}
              </AccordionButton>
              <AccordionPanel p={0} pl={[3, 0, 0, 3, 3]} sx={{ borderTop: "1px solid #AAAAAA" }}>
                <RHFRadioGroup
                  isClearable
                  resetProductTypes={() => {
                    setValue("productTypes", null);
                  }}
                  selectedOption={categoryId}
                  handleClearOption={() => {
                    setValue("categoryId", null);
                  }}
                  handleClick={handleMenuClick}
                  name="categoryId"
                  options={arrayToSelectOptions(categoryData, "categoryName", "categoryId")}
                />
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        {productTypeData.length > 0 && !!categoryId && (
          <AccordionItem borderTop="none">
            {({ isExpanded }) => (
              <>
                <AccordionButton py={3}>
                  <Box flex="1" textAlign="left">
                    <Text fontSize={["16px", "12px", "12px", "16px", "16px"]} fontWeight="bold">
                      <FormattedMessage id="label.productType" />
                    </Text>
                  </Box>
                  {isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}
                </AccordionButton>
                <AccordionPanel p={0} pl={[3, 0, 0, 3, 3]} sx={{ borderTop: "1px solid #AAAAAA" }}>
                  <RHFRadioGroup
                    name="productTypes"
                    isClearable
                    selectedOption={productTypeId}
                    handleClearOption={() => {
                      setValue("productTypes", null);
                    }}
                    handleClick={handleProductTypeClick}
                    options={arrayToSelectOptions(productTypeData, "productTypeName", "productTypeId")}
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )}
        <AccordionItem borderTop="none" borderBottom="none">
          {({ isExpanded }) => (
            <>
              <AccordionButton py={3}>
                <Box flex="1" textAlign="left">
                  <Text fontSize={["16px", "12px", "12px", "16px", "16px"]} fontWeight="bold">
                    <FormattedMessage id="label.color" />
                  </Text>
                </Box>
                {isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}
              </AccordionButton>
              <AccordionPanel p={0} pl={[3, 0, 0, 3, 3]} sx={{ borderTop: "1px solid #AAAAAA" }}>
                <RHFRadioGroup
                  name="colors"
                  isClearable
                  selectedOption={colorId}
                  handleClearOption={() => {
                    setValue("colors", null);
                  }}
                  handleClick={handleColorClick}
                  isColor
                  options={arrayToSelectOptions(colorData, "colorName", "colorId", "colorCode")}
                />
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
      <Flex justifyContent="space-between" mt="2" ml="4">
        <Text fontSize={["16px", "12px", "12px", "16px", "16px"]} fontWeight="bold">
          <FormattedMessage id="label.bestSelling" />
        </Text>
        <RHFSingleCheckbox
          sx={{ mr: 4 }}
          handleClick={handleIsBestSellingClick}
          name="isBestSelling"
          fontWeight="bold"
        />
      </Flex>
    </Box>
  );
};

export default ProductFilter;
