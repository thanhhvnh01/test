import { extendTheme } from "@chakra-ui/react";
import { CustomButton as Button } from "./CustomStyle/CustomStyle";

export const theme = extendTheme({
  components: {
    Button,
  },
  breakpoints: {
    sm: "415px", // mobile
    md: "820px", // tablet 1
    lg: "914px", // table 2
    xl: "1537px", // pc 1
    "2xl": "1920px", //pc 2
  },
});
