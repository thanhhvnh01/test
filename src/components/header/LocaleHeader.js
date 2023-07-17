import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Select, Text } from "@chakra-ui/react";
import { IntlContext } from "@utility/contexts/Internationalization";
import React, { useContext, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { FormattedMessage } from "react-intl";

const LocaleHeader = ({ isMobile, ...props }) => {
  const intlContext = useContext(IntlContext);

  const [lang, setLang] = useState(intlContext.locale);
  return (
    <Box w="100%" bg="black" {...props}>
      <Flex
        maxW={isMobile ? "100%" : "1320px"}
        justifyContent={isMobile ? "space-between" : "flex-end"}
        sx={{ mr: "auto", ml: "auto" }}
      >
        <HStack
          color="#ffff"
          spacing="24px"
          w="100%"
          sx={{ alignContent: "center", justifyContent: !isMobile ? "space-between" : "space-between" }}
        >
          <Text ml={2} fontSize={["10px", "10px", "12px", "12px", "12px"]}>
            ANDREAHAIRVN.COM
          </Text>
          <HStack spacing="20px">
            {!isMobile && (
              <>
                <Text fontSize={["10px", "10px", "10px", "12px", "12px"]}>
                  <FormattedMessage id="info.phoneNumber" />
                </Text>
                <Text textTransform="uppercase" fontSize={["10px", "10px", "12px", "12px", "12px"]}>
                  <FormattedMessage id="info.email" />
                </Text>
              </>
            )}

            <LocalPopover lang={lang} setLang={setLang} intlContext={intlContext} />
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

const LocalPopover = ({ lang, setLang, intlContext }) => {
  const handleLangUpdate = (e) => {
    e.preventDefault();
    intlContext.switchLanguage(e.target.value);
    setLang(e.target.value);
  };

  return (
    <HStack sx={{ alignContent: "center", justifyContent: "space-between" }}>
      <ReactCountryFlag
        style={{
          width: "1em",
          height: "1em",
          marginBottom: 1.5,
        }}
        countryCode={lang === "en" ? "us" : "ru"}
        svg
      />
      <Select
        color="white"
        icon={<TriangleDownIcon />}
        iconSize="9px"
        variant="unstyled"
        fontSize={["10px", "12px", "12px", "12px", "12px"]}
        bg="black"
        w="90px"
        borderColor="black"
        value={lang}
        onChange={(e) => {
          handleLangUpdate(e);
        }}
        size="xs"
        pb={1}
      >
        <option value="en" style={{ textAlign: "center" }}>
          <FormattedMessage id="title.en" />
        </option>
        <option value="ru" style={{ textAlign: "center" }}>
          <FormattedMessage id="title.ru" />
        </option>
      </Select>
    </HStack>
  );
};

export default LocaleHeader;
