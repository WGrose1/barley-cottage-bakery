import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/UI/Theme";
import Header from "../src/UI/Header";
import Footer from "../src/UI/Footer";
import { store, persistor } from "../src/store/createStore";
// import initStore from "../src/store/createStore";
import { Provider } from "react-redux";
import "../global.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PersistGate } from "redux-persist/integration/react";

import { CookiesProvider } from "react-cookie";

// const store = initStore();

const stripePromise = loadStripe(
  "pk_test_51GulktI1HACdLbtz8EKaiiaCuJwB5sGU7ycIuqMBnBixEngtVUDyv6S1xK0rosr4BegFAWHptYsdrVcwjqrC69JJ00cnKEDkrq"
);

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    console.log("tabIndex", tabIndex);
  }, [tabIndex]);

  // static async getInitialProps({ Component, ctx }) {
  //     return {
  //       pageProps: {
  //         ...(Component.getInitialProps
  //           ? await Component.getInitialProps(ctx)
  //           : {})
  //       }
  //     };
  //   }

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {/* elements provides access to stripe components */}
        <CookiesProvider>
          <Elements stripe={stripePromise}>
            <Head>
              <title>sweet treated</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Header
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />

              <Component {...pageProps} />
              <Footer
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            </ThemeProvider>
          </Elements>
        </CookiesProvider>
      </PersistGate>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
