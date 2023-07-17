// form
import { Box, Checkbox, CheckboxGroup, HStack, Text } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";

// ----------------------------------------------------------------------

export function RHFCheckbox({ name, options, value, isColor, handleClick, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      render={({ field }) => {
        return (
          <CheckboxGroup
            onChange={(e) => {
              field.onChange(e);
            }}
            value={field.value}
          >
            {options?.map((item, index) => {
              return (
                <Checkbox colorScheme="yellow" key={index} value={`${item.id}`}>
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
                      />{" "}
                      <Text>{item.label}</Text>
                    </HStack>
                  ) : (
                    item.label
                  )}
                </Checkbox>
              );
            })}
          </CheckboxGroup>
        );
      }}
      control={control}
      {...other}
    />
  );
}

export function RHFSingleCheckbox({ name, label, options, value, handleClick, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      render={({ field }) => {
        return (
          <Checkbox
            {...other}
            onChange={(e) => {
              field.onChange(e.target.checked);
              if (!!handleClick) {
                handleClick(e.target.checked);
              }
            }}
            colorScheme="yellow"
            value={field.value}
            isChecked={field.value}
          >
            {label}
          </Checkbox>
        );
      }}
      control={control}
    />
  );
}

// ----------------------------------------------------------------------

// export function RHFMultiCheckbox({ name, options, sx, getOptionLabel, ...other }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => {
//         const onSelected = (option) =>
//           field.value.includes(option) ? field.value.filter((value) => value !== option) : [...field.value, option];

//         return (
//           <FormGroup sx={{ m: "0px !important", ...sx }}>
//             {options.map((option, index) => (
//               <FormControlLabel
//                 key={index}
//                 control={
//                   <Checkbox
//                     checked={field.value.includes(option.value)}
//                     onChange={() => field.onChange(onSelected(option.value))}
//                   />
//                 }
//                 label={!!getOptionLabel ? getOptionLabel(option.label) : option.label}
//                 {...other}
//               />
//             ))}
//           </FormGroup>
//         );
//       }}
//     />
//   );
// }
