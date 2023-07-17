import { useMediaQuery } from "@hooks/use-media-query.ts";

const useTablet = () => {
  return new useMediaQuery("(max-width: 915px)");
};

export default useTablet;
