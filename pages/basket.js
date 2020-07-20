import React, { useReducer, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import * as basketActions from "../src/store/Actions/basketActions";
import Link from "../src/Link";
import Grid from "@material-ui/core/Grid";
import TopMargin from "../src/UI/TopMargin";
import { useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ContactDetailsForm from "../src/UI/ContactDetailsForm";
import Hidden from "@material-ui/core/Hidden";
import StepperForm from "../src/UI/CheckoutStepperForm";
import { Select } from "@material-ui/core";
import { persistor } from "../src/store/createStore";

const useStyles = makeStyles((theme) => ({
  marginLeft: {
    marginLeft: 150,
  },
}));

export default function Basket() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [inCheckout, setInCheckout] = useState(true);
  const [currentFormStep, setCurrentFormStep] = useState(1);

  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleCheckoutSubmit = () => {};

  // if (typeof persistor != "undefined") {
  //   console.log("persistor", persistor);
  //   persistor.flush();
  // }

  const basketItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.basket.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.basket.items[key].productTitle,
        productPrice: state.basket.items[key].productPrice,
        quantity: state.basket.items[key].quantity,
        sum: state.basket.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const basketTotal = useSelector((state) => state.basket.totalAmount);

  // useEffect(() => {
  //   switch (currentFormStep) {
  //     case 1:
  //       // code block
  //       break;
  //     case 1:
  //       // code block
  //       break;
  //     case 1:
  //       // code block
  //       break;
  //     default:
  //     // code block
  //   }
  // }, [currentFormStep]);

  const shopItems = (
    <Box
      mx={0}
      width={matchesXS ? "90vw" : "100%"}
      maxWidth={matchesXS ? 200 : 400}
    >
      <Grid
        className={classes.mainContainer}
        container
        direction="column"
        justify="space-between"
        spacing={2}
      >
        {basketItems.map((item, index) => (
          <Grid
            container
            item
            key={`${item}${index}`}
            direction="row"
            alignItems="center"
            justify="space-between"
            spacing={1}
            wrap="wrap"
            // style={{ minWidth: matchesXS ? "100%" : 400 }}
          >
            <Grid
              item
              container
              direction="row"
              justify={matchesMd ? "space-between" : "space-between"}
              wrap="nowrap"
              xs={12}
              md={8}
            >
              <Grid item>
                <Box mr={4}>
                  <Typography align="left" variant="h5" noWrap>
                    {item.productTitle}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box mr={2}>
                  <Typography align="left" variant="h6" noWrap align="right">
                    x {item.quantity}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid
              item
              container
              // direction={matchesXS ? "row-reverse" : "row"}
              direction="row"
              alignItems="center"
              justify={matchesMd ? "space-between" : "space-between"}
              spacing={0}
              xs={12}
              md={4}
              noWrap
              // justify={matchesMd ? "flex-start" : "space-between"}

              // className={classes.marginLeft}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  style={{ zmarginLeft: 50 }}
                  onClick={() => {
                    dispatch(basketActions.removeItem(item.productId));
                    if (typeof persistor != "undefined") {
                      console.log("persistor", persistor);
                      console.log("state", persistor.getState());
                    }
                  }}
                >
                  Remove
                </Button>

                {/* <img height={20} src="/assets/doodles/trolley-remove.svg" /> */}
              </Grid>
              <Grid item>
                <Box ml={2}>
                  <Typography align="right" variant="h5">
                    £{item.sum}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          spacing={0}
        >
          <Typography variant="h5">Total</Typography>
          <Typography style={{ zmarginRight: matchesXS ? 0 : 72 }} variant="h5">
            £{basketTotal}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <React.Fragment>
      <TopMargin />

      <Grid
        container
        justify="space-around"
        style={{
          marginTop: 150,
          padding: matchesXS ? 20 : 0,
        }}
        spacing={0}
        // alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Box
            // style={{ ...theme.mixins.gutters(), width: "100%" }}
            display="flex"
            justify="space-between"
            justifyContent="space-between"
            flexDirection="column"
            style={{ padding: matchesXS ? 0 : 25 }}
          >
            <Typography variant="h1" component="h1">
              Basket
            </Typography>
            <Box mr={6} mb={2}>
              <img width={100} src="/assets/doodles/underline-hash.svg" />
            </Box>

            {shopItems}
          </Box>
        </Grid>
        <Grid item xs={12} sm md={6}>
          <Box
            // style={{ ...theme.mixins.gutters(), width: "100%" }}
            display="flex"
            justify="space-between"
            justifyContent="space-between"
            flexDirection="column"
            style={{
              padding: matchesXS ? 0 : 25,
              marginTop: matchesXS ? 25 : 0,
            }}
          >
            <Typography variant="h1" component="h1">
              Checkout
            </Typography>
            <Box mr={6} mb={2}>
              <img width={100} src="/assets/doodles/underline-hash.svg" />
            </Box>

            <StepperForm />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
