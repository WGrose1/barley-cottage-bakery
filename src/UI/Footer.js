import React from "react";
import { makeStyles } from "@material-ui/styles";
import Copyright from "../Copyright";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Link from "../Link";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "transparent",

    width: "99%",
    zIndex: 1302,
    display: "flex",
    zposition: "absolute",
    bottom: 0,
  },
  footerLogo: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "21em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "8em",
    },
  },
  mainContainer: {
    zposition: "absolute",
  },
  link: {
    fontFamily: "Amatic SC , cursive",
    textDecoration: "none",
    fontSize: "1.5em",
    color: "white",
  },
  gridItem: {
    margin: "2em",
    [theme.breakpoints.down("md")]: {
      margin: "1em",
    },
  },
  icon: {
    height: "3.5em",
    width: "3.5em",
    [theme.breakpoints.down("sm")]: {
      height: "2.5em",
    },
  },
  socialContainer: {
    zposition: "absolute",
    // marginTop: "-6em",
    right: "1.5em",
    [theme.breakpoints.down("xs")]: {
      right: "0.3em",
    },
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <footer className={classes.footer}>
      <Grid container className={classes.mainContainer}>
        {/* <img alt="logo" src="/assets/logo.svg" className={classes.footerLogo} /> */}
        <Grid container item sm justify="center" alignItems="center">
          <Grid item className={classes.gridItem}>
            <img height="75" src="/assets/logo1.svg" />
          </Grid>
          <Grid item>
            <Copyright />
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid item sm md={5} container justify="center">
            <Grid item className={classes.gridItem}>
              <Grid container direction="column">
                <Grid
                  item
                  className={classes.link}
                  component={Link}
                  href="/"
                  onClick={() => props.setTabIndex(0)}
                >
                  home
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Grid container direction="column" spacing={2}>
                <Grid
                  item
                  className={classes.link}
                  component={Link}
                  href="/bakes"
                  onClick={() => props.setTabIndex(1)}
                >
                  bakes
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Grid container direction="column" spacing={2}>
                <Grid
                  item
                  className={classes.link}
                  component={Link}
                  href="/about"
                  onClick={() => props.setTabIndex(2)}
                >
                  delivery
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item className={classes.gridItem}>
              <Grid container direction="column" spacing={1}>
                <Grid
                  item
                  className={classes.link}
                  component={Link}
                  href="/catering"
                  onClick={() => {
                    props.setTabIndex(3);
                    props.setSelectedIndex(3);
                  }}
                >
                  catering
                </Grid>
                <Grid
                  item
                  className={classes.link}
                  component={Link}
                  href="/1"
                  onClick={() => {
                    props.setTabIndex(3);
                    props.setSelectedIndex(3);
                  }}
                >
                  option 1
                </Grid>
                <Grid
                  item
                  className={classes.link}
                  component={Link}
                  href="/2"
                  onClick={() => {
                    props.setTabIndex(3);
                    props.setSelectedIndex(3);
                  }}
                >
                  option 2
                </Grid>
                <Grid
                  item
                  className={classes.link}
                  component={Link}
                  href="/3"
                  onClick={() => {
                    props.setTabIndex(3);
                    props.setSelectedIndex(3);
                  }}
                >
                  option 3
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Hidden>
        <Grid
          container
          item
          sm
          justify="center"
          className={classes.socialContainer}
          spacing={matches ? 1 : 2}
        >
          <Grid
            item
            component={"a"}
            href="https://www.facebook.com"
            rel="noopener noreferrer"
            target="_blank"
            className={classes.gridItem}
          >
            <img
              alt="facebook logo"
              src="/assets/facebook.svg"
              className={classes.icon}
              style={{ fill: "black" }}
            />
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            component={"a"}
            href="https://www.twitter.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="twitter logo"
              className={classes.icon}
              src="/assets/twitter.svg"
            />
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            component={"a"}
            href="https://www.instagram.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="instagram logo"
              className={classes.icon}
              src="/assets/instagram.svg"
            />
          </Grid>
        </Grid>
      </Grid>
      {/* <a href="https://www.freepik.com/free-photos-vectors/background">
        Background photo created by dashu83 - www.freepik.com
      </a> */}
    </footer>
  );
}
