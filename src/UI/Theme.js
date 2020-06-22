import { createMuiTheme } from "@material-ui/core/styles";

const stBlue = "#bcf4f5";
const stBlueDark = "#66C6BC";
const stPink = "#ffb7c3";
const headerFont = "Amatic SC";
const defaultFont = "Open Sans Condensed";

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
      fontFamily: defaultFont,
      tab: {
        fontFamily: "Amatic SC, cursive",
        textTransform: "none",
        fontWeight: 500,
        fontSize: "1.5rem",
      },
      h1: {
        fontFamily: headerFont,
        fontSize: "4em",
      },
      h2: {
        fontFamily: headerFont,
        fontSize: "2.5em",
        color: stBlueDark,
      },
      h3: {
        fontFamily: headerFont,
      },
      h4: {
        fontFamily: headerFont,
      },
      h5: {
        fontFamily: headerFont,
      },
      h6: {
        fontFamily: headerFont,
      },

      body1: {
        fontSize: 18,
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
