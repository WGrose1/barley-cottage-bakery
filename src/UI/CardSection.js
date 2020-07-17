import React from "react";
import Box from "@material-ui/core/Box";
import { CardElement } from "@stripe/react-stripe-js";
import { Typography } from "@material-ui/core";

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "white",
      color: "white",
      fontSize: "16px",
      fontFamily: "Open Sans Condensed, sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "white",
      },
    },
  },
};

function CardSection() {
  return (
    <Box
      p={1}
      style={{ height: 100, minWidth: 350 }}
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
    >
      <Typography>Card Payment Details</Typography>
      <Box border="1px solid white" borderRadius="5px" padding={1}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </Box>
    </Box>
  );
}

export default CardSection;
