import React from "react";
// import Lottie from "react-lottie";
import { makeStyles } from "@material-ui/styles";
import animationData from "../src/animations/landinganimation/data";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ButtonArrow from "../src/UI/ButtonArrow";
import Head from "next/head";
import TopMargin from "../src/UI/TopMarginIndexPage";
import { useTheme } from "@material-ui/core/styles";
import LandingPageButtons from "../src/UI/landingPageButtons";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginBottom: "4em",
  },
  animation: {
    maxWidth: "50em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "25em",
    },
  },
  orderButton: {
    ...theme.typography.order,
    borderRadius: 50,
    height: 45,
    marginRight: 40,
    backgroundColor: theme.palette.common.pink,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "1em",
  },
  moreButtonHero: {
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.darkBlue,
    borderWidth: 2,
    borderRadius: 50,
    fontFamily: "Roboto",
    height: 45,
    fontSize: "0.9rem",
    fontWeight: "bold",
    width: 145,
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  brownieImage: {
    width: "100%",
    position: "absolute",
    top: 10,
    zIndex: -1,
    opacity: 0.7,
    [theme.breakpoints.down("md")]: {
      top: 100,
    },
    [theme.breakpoints.down("sm")]: {
      top: 150,
    },
    [theme.breakpoints.down("xs")]: {
      top: 150,
    },
  },
  heroTextRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bakesContainer: {
    backgroundImage: "url('assets/brownie-landing-page.jpg')",
    backgroundPosition: "contain",
  },
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const theme = useTheme();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <React.Fragment>
      <TopMargin />
      {/* <img
        className={classes.brownieImage}
        alt="brownie"
        src="/assets/brownie-landing-page.jpg"
      /> */}
      {/* SLOGAN CONTAINER START */}
      <Grid container direction="column" className={classes.mainContainer}>
        <Head>
          <title key="title">Barley Cottage Bakery</title>
          <meta
            property="og:title"
            key="og:title"
            content="Title for sharing link here | Barley Cottage Bakery"
          ></meta>
          <meta
            property="og:url"
            key="og:url"
            content="barleycottage.co.uk"
          ></meta>
          {/* ensures http https and www all point to one page for SEO */}
          <link
            rel="canonical"
            key="canonical"
            href="https://barleycottage.co.uk"
          ></link>
        </Head>

        <Grid item>
          <Grid
            container
            justify="flex-start"
            direction="column"
            alignItems="center"
          >
            <Grid xs item className={classes.heroTextContainer}>
              <Typography align="center" variant="h1">
                barley cottage bakery
              </Typography>
              <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.buttonContainer}
              ></Grid>
            </Grid>

            <Grid sm item container className={classes.heroTextRight}>
              <Grid sm item>
                <Typography variant="h5">
                  luxury baked treats from our home to yours
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* SLOGAN CONTAINER END */}

      <LandingPageButtons />
    </React.Fragment>
  );
}

//   <Grid item>

//     <Grid
//       container
//       justify="flex-end"
//       direction="row"
//       alignItems="center"
//     >
//       <Grid xs item className={classes.heroTextContainer}>
//         <Typography align="center" variant="h1">
//           Barley Cottage Bakery slogan <br /> line 2
//         </Typography>
//         <Grid
//           container
//           justify="center"
//           alignItems="center"
//           className={classes.buttonContainer}
//         >
//           <Grid item>
//             <Button variant="contained" className={classes.orderButton}>
//               order
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button variant="outlined" className={classes.moreButtonHero}>
//               <span style={{ marginRight: 10 }}>more</span>
//               <ButtonArrow
//                 width={15}
//                 height={15}
//                 fill={theme.palette.common.darkBlue}
//               />
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid sm item className={classes.animation}>
//         <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
//       </Grid>
//     </Grid>
//   </Grid>
// </Grid>

{
  /* <Grid sm item className={classes.animation}>
              <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
            </Grid> */
}
