import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Field, reduxForm, formValueSelector } from "redux-form";
// import CardSection from "./CardSection";
import { withStyles } from "@material-ui/core/styles";
import validate from "./validateCheckoutForm";

const styles = (theme) => ({});

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment("{CLIENT_SECRET}", {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Jenny Rosen",
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <CardSection /> */}
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
};

export default reduxForm({
  form: "checkout_form", // a unique identifier for this form
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(withStyles(styles)(CheckoutForm));
