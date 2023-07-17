import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
} from "@chakra-ui/react";
import ProductFilter from "@components/ProductFilter";
// icon
import { BsFilter } from "react-icons/bs";
import { FormattedMessage } from "react-intl";

const MobileProductFilter = ({
  isOpen,
  onClose,
  categoryId,
  setValue,
  productTypeId,
  colorId,
  isBestSelling,
  handleClearFilter,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="#FFFFFF">
        <DrawerBody p={0}>
          <Box>
            <ProductFilter
              productTypeId={productTypeId}
              colorId={colorId}
              isBestSelling={isBestSelling}
              setValue={setValue}
              categoryId={categoryId}
            />
            <HStack p={5} justifyContent="center">
              <Button onClick={handleClearFilter}>
                <FormattedMessage id="button.clearFilter" />
              </Button>
            </HStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileProductFilter;
