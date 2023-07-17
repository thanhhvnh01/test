import { useMediaQuery } from "@hooks/use-media-query.ts";

const useMobile = () => {
  return new useMediaQuery("(max-width: 415px)");
};

export default useMobile;
