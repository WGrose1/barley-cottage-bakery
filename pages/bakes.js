import React from "react";
import Container from "@material-ui/core/Container";
import BakeItem from "../src/UI/BakeItem";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "../src/Link";
import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { spacing } from "@material-ui/system";
import { useTheme } from "@material-ui/core/styles";
import TopMargin from "../src/UI/TopMargin";
import { makeStyles } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import bakeItems from "../src/BakeData";

// export const getStaticProps = async () => {
//   console.log(process.env.DB_HOST);
// };

const useStyles = makeStyles((theme) => {
  return {
    mainContainer: {
      margin: 50,
      [theme.breakpoints.down("md")]: {
        margin: 0,
      },
      width: "90%",
    },
    gridItem: {
      padding: 10,
      marginBottom: 20,
      "&:hover": {
        "& bakedItemImage": {
          opacity: 1,
        },
      },
    },
    addBtn: {
      borderWidth: 1,
      borderColor: "white",
      fontSize: 18,
    },
    bakedItemImage: {
      opacity: 0.7,
      "&:hover": {
        // opacity: 1,
      },
    },
    quantityInput: {
      textAlign: "center",
    },
  };
});

export default function Bakes(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  // const bakeItems = [
  //   {
  //     id: 1,
  //     title: "Milk Chocolate Brownie",
  //     description: "our famous dark chocolate brownie",
  //     price: 5.99,
  //     imageUrl: "./assets/brownieoutlined.png",
  //   },
  //   {
  //     id: 2,
  //     title: "Rocky Road Chocolate Brownie",
  //     description: "our famous dark chocolate brownie",
  //     price: 5.99,
  //     imageUrl: "./assets/rocky-road.png",
  //   },
  //   {
  //     id: 3,
  //     title: "Orange Chocolate Brownie",
  //     description: "our famous dark chocolate brownie",
  //     price: 5.99,
  //     imageUrl: "./assets/rocky-road.png",
  //   },
  //   {
  //     id: 4,
  //     title: "White Chocolate Brownie",
  //     description: "our famous dark chocolate brownie",
  //     price: 5.99,
  //     imageUrl: "./assets/brownieoutlined.png",
  //   },
  //   {
  //     id: 5,
  //     title: "Milk Chocolate Brownie",
  //     description: "our famous dark chocolate brownie",
  //     price: 5.99,
  //     imageUrl: "./assets/brownieoutlined.png",
  //   },
  //   {
  //     id: 6,
  //     title: "Rocky Road Chocolate Brownie",
  //     description: "our famous dark chocolate brownie",
  //     price: 5.99,
  //     imageUrl: "./assets/rocky-road.png",
  //   },
  //   {
  //     id: 7,
  //     title: "Orange Chocolate Brownie",
  //     description: "our famous dark chocolate brownie",
  //     price: 5.99,
  //     imageUrl: "./assets/rocky-road.png",
  //   },
  //   {
  //     id: 8,
  //     title: "White Chocolate Brownie",
  //     description: "our famous dark chocolate brownie",
  //     price: 5.99,
  //     imageUrl: "./assets/brownieoutlined.png",
  //   },
  // ];

  const shopItems = (
    <Grid
      className={classes.mainContainer}
      container
      direction="row"
      justify="space-between"
    >
      {bakeItems.map((item, index) => (
        <Grid key={`${item}${index}`} item xs={12} sm={6} md={4}>
          <BakeItem item={item} />
        </Grid>
      ))}
    </Grid>
  );

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
          content="barleycottage.co.uk/bakes"
        />
        <link
          rel="canonical"
          key="canonical"
          href="https://barleycottage.co.uk/bakes"
        ></link>
      </Head>
      <TopMargin />
      <Box my={4} mx={3} display="flex" justifyContent="center">
        <img height={50} src="/assets/doodles/signature_under.svg" />
        <Box mx={2}>
          <Typography variant="h1" component="h1">
            Signature Bakes
          </Typography>
        </Box>
        <img
          height={50}
          src="/assets/doodles/signature_under.svg"
          style={{ transform: "scaleX(-1)" }}
        />
      </Box>
      {shopItems}
    </React.Fragment>
  );
}
