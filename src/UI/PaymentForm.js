import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Field, reduxForm, formValueSelector } from "redux-form";
import CardSection from "./CardSection";
import { withStyles } from "@material-ui/core/styles";
import validate from "./validateCheckoutForm";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import * as basketActions from "../store/Actions/basketActions";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
  button: {},
});

const PaymentForm = (props) => {
  const [processingPayment, setProcessingPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const basketTotal = useSelector((state) => state.basket.totalAmount);
  const basketData = useSelector((state) => state.basket);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setProcessingPayment(true);
    setErrorMessage(undefined);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // const response = await fetch("/api/payment");

    const response = await axios({
      method: "post",
      url: "/api/payment",
      data: {
        amount: basketTotal,
      },
    });

    console.log(response.data);

    if (response.status === 200) {
      const { client_secret: clientSecret } = await response.data;
      // Call stripe.confirmCardPayment() with the client secret.
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          // billing_details: {
          //   name: "Jenny Rosen",
          // },
        },
      });

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
        setErrorMessage(result.error.message);
        setProcessingPayment(false);
      } else {
        setProcessingPayment(false);
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          console.log("succeeded");
          dispatch(basketActions.clearBasket());
          const response = await axios.post("/api/neworder", {
            newOrder: basketData,
          });

          if (response.status === 200) {
            const orderID = await response.data.orderid;
            console.log(orderID);
          } else {
          }

          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    } else {
      setErrorMessage("There was an error processing your payment");
    }
  };

  const handleSubmitTest = async (e) => {
    e.preventDefault();

    const response = await axios.post("/api/neworder", {
      newOrder: basketData,
    });

    if (response.status === 200) {
      const orderID = await response.data.orderid;
      console.log(orderID);
    } else {
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmitTest(e);
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <CardSection />
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        {processingPayment ? (
          <CircularProgress />
        ) : (
          <Box
            mt={8}
            display="flex"
            justifyContent="space-between"
            width="100%"
          >
            <Button
              variant="outlined"
              onClick={() => {
                props.handleBackPage();
              }}
              className={props.classes.button}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!stripe || basketTotal < 1}
            >
              Confirm order
            </Button>
          </Box>
        )}
      </Box>
    </form>
  );
};

export default reduxForm({
  form: "checkout_form", // a unique identifier for this form
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(withStyles(styles)(PaymentForm));
