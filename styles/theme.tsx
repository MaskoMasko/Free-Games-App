import { ThemeProvider } from "@react-navigation/native";
import { createTheme } from "@shopify/restyle";

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",

  black: "#0B0B0B",
  white: "#F0F2F3",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 60,
    max: 100,
    minus: -50,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    mainHeader: {
      fontWeight: "bold",
    },
  },
});

export type Theme = typeof theme;
export default theme;
