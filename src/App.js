import React from "react";
import { useRoutes } from "react-router-dom";
// chakra ui
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme/theme";

import routes from "./routes";

function App() {
  const content = useRoutes(routes);
  return <ChakraProvider theme={theme}>{content}</ChakraProvider>;
}

export default App;
