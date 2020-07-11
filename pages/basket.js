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
    <Box mx={0} minWidth={matchesXS ? "90vw" : 400} maxWidth="50%">
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
              justify="space-between"
              wrap="nowrap"
              xs={12}
              sm={8}
            >
              <Grid item>
                <Typography align="left" variant="h5" noWrap>
                  {item.productTitle}
                </Typography>
              </Grid>
              <Grid item>
                <Box ml={2}>
                  <Typography align="left" variant="h6" noWrap>
                    x {item.quantity}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction={matchesXS ? "row-reverse" : "row"}
              alignItems="center"
              justify={matchesXS ? "space-between" : "flex-end"}
              spacing={2}
              xs={12}
              sm={4}

              // className={classes.marginLeft}
            >
              <Grid xs sm={6} item>
                <Typography align="right" variant="h5">
                  £{item.sum}
                </Typography>
              </Grid>

              <Grid item xs sm={6} onClick={() => {}}>
                <Button
                  variant="outlined"
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
          <Typography style={{ marginRight: matchesXS ? 0 : 62 }} variant="h5">
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
        spacing={10}
        // alignItems="center"
        justifyContent="flex-end"
      >
        <Grid item xs md={6}>
          <Box
            // style={{ ...theme.mixins.gutters(), width: "100%" }}
            display="flex"
            justify="space-between"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Typography variant="h1" component="h1">
              Basket
            </Typography>
            <Box mr={6} mb={2}>
              <img width={100} src="/assets/doodles/underline-hash.svg" />
            </Box>
          </Box>

          {shopItems}
        </Grid>
        <Grid item xs md={6}>
          <StepperForm />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
