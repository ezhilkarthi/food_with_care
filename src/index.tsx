import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NativeBaseProvider, extendTheme } from "native-base";
import reportWebVitals from "./reportWebVitals";

// extend the theme
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType { }
}

const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
  config: {
    initialColorMode: "900",
  },
};
const theme = extendTheme({ colors: newColorTheme });

ReactDOM.render(
  <React.StrictMode>
    <NativeBaseProvider theme={theme}>
      <App />
    </NativeBaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
