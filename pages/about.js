import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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
      textAlign: "left",
      [theme.breakpoints.up("md")]: {
        width: "50%",
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
        <title key="title">our bakes | Barley Cottage Bakery</title>
        <meta
          name="description"
          key="description="
          content="description shoed on google here - 160 characters"
        />

        <meta
          property="og:title"
          key="og:title"
          content="Title for sharing link here | Barley Cottage Bakery"
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
          <Box mr={6} mb={2}>
            <img width={150} src="/assets/doodles/underline-about.svg" />
          </Box>
        </Box>
      </Box>
      <Grid container direction="column">
        <Grid
          container
          item
          direction="row"
          wrap="wrap"
          justify="space-between"
        >
          <Grid item sm={12} md>
            <Box px={8} mt={2}>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum, ullamcorper nulla aliquam pharetra imperdiet
                maecenas iaculis. Integer amet faucibus lacus fames at. Sed est
                in dui et. Scelerisque cursus aliquam in id amet viverra. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum,
                ullamcorper nulla aliquam pharetra imperdiet maecenas iaculis.
                Integer amet faucibus lacus fames at. Sed est in dui et.
                Scelerisque cursus aliquam in id amet viverra. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Vestibulum, ullamcorper
                nulla aliquam pharetra imperdiet maecenas iaculis. Integer amet
                faucibus lacus fames at. Sed est in dui et. Scelerisque cursus
                aliquam in id amet viverra. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Vestibulum, ullamcorper nulla
                aliquam pharetra imperdiet maecenas iaculis. Integer amet
                faucibus lacus fames at. Sed est in dui et. Scelerisque cursus
                aliquam in id amet viverra.
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md>
            <Box px={8} mt={2}>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum, ullamcorper nulla aliquam pharetra imperdiet
                maecenas iaculis. Integer amet faucibus lacus fames at. Sed est
                in dui et. Scelerisque cursus aliquam in id amet viverra. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum,
                ullamcorper nulla aliquam pharetra imperdiet maecenas iaculis.
                Integer amet faucibus lacus fames at. Sed est in dui et.
                Scelerisque cursus aliquam in id amet viverra. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Vestibulum, ullamcorper
                nulla aliquam pharetra imperdiet maecenas iaculis. Integer amet
                faucibus lacus fames at. Sed est in dui et. Scelerisque cursus
                aliquam in id amet viverra. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Vestibulum, ullamcorper nulla
                aliquam pharetra imperdiet maecenas iaculis. Integer amet
                faucibus lacus fames at. Sed est in dui et. Scelerisque cursus
                aliquam in id amet viverra.
              </Typography>
            </Box>
          </Grid>
          <Grid sm={12} item>
            <Box
              mt={4}
              mx={8}
              style={{
                backgroundImage: `url('/assets/baking-together.jpg')`,
                height: 200,
                backgroundPosition: "center",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
