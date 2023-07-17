import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// ** Contexts
import { IntlProviderWrapper } from "@utility/contexts/Internationalization";

// ** Redux Imports
import { Provider } from "react-redux";
import { store } from "./redux/store";

// ** style
// import "@theme/index.css";
import "./theme/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <IntlProviderWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IntlProviderWrapper>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
