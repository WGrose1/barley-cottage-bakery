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

const useStyles = makeStyles((theme) => ({}));

export default function Basket() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [inCheckout, setInCheckout] = useState(true);
  const [currentFormStep, setCurrentFormStep] = useState(1);

  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCheckoutSubmit = () => {};

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

  console.log(basketItems);
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
    <Box mx={3} maxWidth={400} minWidth={260}>
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
            wrap="nowrap"
          >
            <Grid item>
              <Typography align="left" variant="h4" noWrap>
                {item.productTitle}
              </Typography>
            </Grid>

            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justify="flex-end"
              spacing={1}
            >
              <Grid item>
                <Typography align="right" variant="h4">
                  £{item.sum}
                </Typography>
              </Grid>
              <Grid item onClick={() => {}}>
                <img height={20} src="/assets/doodles/trolley-remove.svg" />
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Box display="flex" justifyContent="flex-end"></Box>
      </Grid>
    </Box>
  );

  return (
    <React.Fragment>
      <TopMargin />

      <Grid container justify="space-around" style={{ marginTop: 50 }}>
        <Grid item>
          <Box mx={1.5} display="flex">
            <Box
              style={{ ...theme.mixins.gutters(), width: "100%" }}
              display="flex"
              justify="space-between"
              justifyContent="space-around"
              flexDirection="column"
            >
              <Typography variant="h1" component="h1">
                Basket
              </Typography>
              <Box mr={6} mb={2}>
                <img width={100} src="/assets/doodles/underline-hash.svg" />
              </Box>
            </Box>
          </Box>
          {shopItems}
        </Grid>
        <Grid item>
          <StepperForm />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
