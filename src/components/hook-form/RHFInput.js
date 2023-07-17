import { Input } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";

export default function RHFInput({ name, ...rest }) {
  const { control } = useFormContext();

  return <Controller name={name} control={control} render={({ field }) => <Input {...field} {...rest} />} />;
}
