// ** React Imports
import { useState, createContext } from "react";

// ** Intl Provider Import
import { IntlProvider } from "react-intl";

// ** User Language Data
// import userMessagesEn from "src/assets/locales/en.json";
import userMessagesRu from "@assets/locales/ru.json";
import userMessagesEn from "@assets/locales/en.json";
// import { Storage, STORAGE_KEYS } from "@utility/storage";
// import { updateDeviceTokenAPI } from "@api/main";

// ** Menu msg obj
const menuMessages = {
  en: { ...userMessagesEn },
  ru: { ...userMessagesRu },
};

// ** Create Context
const Context = createContext();

const IntlProviderWrapper = ({ children }) => {
  const initLang = localStorage.getItem("language") || "en";
  // ** States
  const [locale, setLocale] = useState(initLang);
  const [messages, setMessages] = useState(menuMessages[initLang]);

  // ** Switches Language
  const switchLanguage = (language) => {
    setLocale(language);
    setMessages(menuMessages[language]);
    localStorage.setItem("language", language);

    // ** for later notification method
    // const currentDeviceToken = Storage.getItem(STORAGE_KEYS.deviceToken);
    // if (!!currentDeviceToken) {
    //   updateDeviceTokenAPI({
    //     deviceToken: currentDeviceToken,
    //     lang: language,
    //     platform: "web",
    //   })
    //     .then()
    //     .catch((error) => {
    //       console.warn(
    //         "[IntlProviderWrapper] update device token error",
    //         error
    //       );
    //     });
    // }
  };

  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale="ru">
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};

export { IntlProviderWrapper, Context as IntlContext };
