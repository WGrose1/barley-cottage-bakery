import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import TopMargin from "../src/UI/TopMargin";
import Head from "next/head";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
  return {
    aboutText: {
      textAlign: "center",
      [theme.breakpoints.up("md")]: {
        width: "80%",
      },
    },
  };
});

export default function About() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title key="title">our bakes | sweet treated</title>
        <meta
          name="description"
          key="description="
          content="description shoed on google here - 160 characters"
        />

        <meta
          property="og:title"
          key="og:title"
          content="Title for sharing link here | sweet treated"
        />
        <meta
          property="og:url"
          key="og:url"
          content="sweettreated.co.uk/bakes"
        />
        <link
          rel="canonical"
          key="canonical"
          href="https://sweettreated.com/bakes"
        ></link>
      </Head>
      <TopMargin />
      <Box mx={1.5} display="flex" alignItems="center" justifyContent="center">
        <Box
          style={{ ...theme.mixins.gutters(), width: "100%" }}
          display="flex"
          justify="space-between"
          justifyContent="space-around"
          flexDirection="column"
          alignItems="center"
        >
          <Box>
            <Typography variant="h1" component="h1">
              Our Story
            </Typography>
            <img width={150} src="/assets/doodles/underline-about.svg" />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
          >
            <Typography variant="body1" className={classes.aboutText}>
              From humble roots, Barley Cottage was the loving home where
              co-founder, and food enthusiast, lily grew up. it was the barley
              cottage kitchen where she learned her passion and love for baking
              and developed the infamous brownie recipe - friends and family
              alike went crazy for.
            </Typography>
            <Typography variant="body1" className={classes.aboutText}>
              From humble roots, Barley Cottage was the loving home where
              co-founder, and food enthusiast, lily grew up. it was the barley
              cottage kitchen where she learned her passion and love for baking
              and developed the infamous brownie recipe - friends and family
              alike went crazy for.
            </Typography>
            <Typography variant="body1" className={classes.aboutText}>
              when lily met william - a maichellien star trianed chef- in 2013,
              their love for eachother and (more importantly!) love for food was
              a match made in brownie heaven. when william first tried one of
              the infamous BROWNIEs, he instantly knew that there was no looking
              back.... that they were just too delicious
            </Typography>
            <Typography variant="body1" className={classes.aboutText}>
              they have been baking together ever since, improving and making
              variations to their too-good-to-be-true, infamous brownie recipe.
              the pairs passion for baking, michillen-starred culinary
              background, and shared obsession with brownies, grew into their
              love child - the barley cottage bakery.
            </Typography>
            <Typography variant="body1" className={classes.aboutText}>
              seven years later the pair are still baking brownie together,
              along with a wealth of other declicious treats
            </Typography>
            <Typography variant="h2" className={classes.aboutText}>
              The place that Lily called home. When she met William they shared
              a love for food.
            </Typography>

            <Typography variant="body1" className={classes.aboutText}>
              With a michillen-starred culinary background and an Italian
              passion for food – it was a food and love match made in heaven.
              And we have been baking together ever since we met, and
              individually for over 40 combined years, and together since 2013.
              <br />
              We have been baking in Sussex for 20 years, and understand the
              power of delicious food, and our love and passion for baking goes
              into all that sell!
            </Typography>
            <Typography variant="h2" className={classes.aboutText}>
              Baking with only the best quality ingedients
            </Typography>
            <Typography variant="body1" className={classes.aboutText}>
              Using the finest quality ingredients, we truly believe our food is
              the best on the market and challenge you to try it for yourself!
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
