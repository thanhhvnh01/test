// form
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Box, HStack, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
// @mui
// import { Radio, RadioGroup, FormHelperText, FormControlLabel } from "@mui/material";
// import FormError from "./FormError";

// ----------------------------------------------------------------------

export default function RHFRadioGroup({
  name,
  options,
  resetProductTypes,
  getOptionLabel,
  isBoolean,
  isClearable,
  sx,
  setCategoryName,
  handleClick,
  selectedOption,
  isColor,
  handleClearOption,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <RadioGroup
              colorScheme="yellow"
              sx={{ m: "0px !important", ...sx }}
              onChange={(e) => {
                field.onChange(e);
                if (!!resetProductTypes) {
                  resetProductTypes();
                }
                if (!!handleClick) {
                  handleClick(e);
                }
              }}
              value={Number(field.value)}
              {...other}
            >
              <VStack p={0} alignItems="flex-start" px={4} spacing={2} py={2}>
                {options.map((item, index) => {
                  const isSelected = item.id === Number(selectedOption);
                  return (
                    <HStack key={index} width="100%" display="flex" justifyContent="space-between">
                      <Radio value={item.id} sx={{ display: "flex" }}>
                        {!!isColor ? (
                          <HStack>
                            <Box
                              bg={
                                item.condition.length > 1
                                  ? `linear-gradient(to bottom,${item.condition[0]}, ${item.condition[1]} 100%)`
                                  : `${item.condition[0]}`
                              }
                              width="15px"
                              height="15px"
                              borderRadius="50%"
                            />
                            <Text
                              fontSize={["16px", "12px", "12px", "16px", "16px"]}
                              fontWeight={isSelected ? "bold" : "400"}
                            >
                              {item.label}
                            </Text>
                          </HStack>
                        ) : (
                          <Text
                            fontSize={["16px", "12px", "12px", "16px", "16px"]}
                            fontWeight={isSelected ? "bold" : "400"}
                          >
                            {item.label}
                          </Text>
                        )}
                      </Radio>
                      {isSelected && (
                        <SmallCloseIcon
                          boxSize={[6, 3, 3, 4, 4]}
                          cursor="pointer"
                          onClick={() => {
                            handleClearOption();
                            handleClick();
                          }}
                          ml="auto"
                        />
                      )}
                    </HStack>
                  );
                })}
              </VStack>
            </RadioGroup>
          </>
        );
      }}
    />
  );
}
