import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const stBlue = "#bcf4f5";
const stBlueDark = "#66C6BC";
const stPink = "#ffb7c3";
const chalkFont = "Fredericka the Great, cursive";
const defaultFont = "Amatic SC";

const theme = createMuiTheme({
  palette: {
    common: {
      blue: stBlue,
      darkBlue: stBlueDark,
      pink: stPink,
      black: "#000000",
    },
    primary: {
      main: stBlue,
    },
    secondary: {
      main: stPink,
    },
    text: {
      primary: "#fff",
    },
  },
  status: {
    danger: "orange",
  },
  typography: {
    tab: {
      fontFamily: "Fredericka the Great, cursive",
      textTransform: "none",
      fontWeight: 500,
      fontSize: "1.5rem",
      color: "white",
    },
    h1: {
      fontFamily: defaultFont,
      fontSize: "3em",
      color: "white",
      // fontWeight: "600",
    },
    h2: {
      fontFamily: defaultFont,
      fontSize: "3em",
      color: "white",
      // fontWeight: "500",
    },
    h3: {
      fontFamily: defaultFont,
    },
    h4: {
      fontFamily: defaultFont,
    },
    h5: {
      fontFamily: defaultFont,
    },
    h6: {
      fontFamily: defaultFont,
    },
    body1: {
      fontFamily: defaultFont,
    },
    order: {
      fontSize: "1rem",
      textTransform: "none",
    },
  },
});
export default responsiveFontSizes(theme);
