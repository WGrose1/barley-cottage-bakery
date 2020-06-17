import { createMuiTheme } from "@material-ui/core/styles";

const stBlue = "#bcf4f5";
const stBlueDark = "#66C6BC";
const stPink = "#ffb7c3";
const defaultFont = "Amatic SC";

const theme = createMuiTheme(
  {
    palette: {
      type: "dark",
      common: {
        blue: stBlue,
        pink: stPink,
      },
      primary: {
        main: stBlue,
      },
      secondary: {
        main: stPink,
      },
      text: {},
    },
    mixins: {
      bodyMargin: {
        marginLeft: 50,
        marginRight: 50,
      },
    },
    status: {
      danger: "orange",
    },
    typography: {
      fontFamily: "Amatic SC, cursive",
      tab: {
        fontFamily: "Amatic SC, cursive",
        textTransform: "none",
        fontWeight: 500,
        fontSize: "1.5rem",
      },
      h1: {
        fontFamily: defaultFont,
        fontSize: "4em",
      },
      h2: {
        fontFamily: defaultFont,
        fontSize: "2.5em",
        color: stBlueDark,
      },
      order: {
        fontSize: "1rem",
        textTransform: "none",
      },
    },
    overrides: {
      // Style sheet name ⚛️
      MuiButton: {
        // Name of the rule
        root: {
          // Some CSS
          color: "white",
        },
      },
    },
  },
  { factor: 1 }
);

export default theme;
