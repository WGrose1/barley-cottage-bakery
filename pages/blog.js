import React, { useEffect } from "react";
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
import Axios from "axios";

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

// If you export an async function called getServerSideProps from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps.

export async function getServerSideProps(context) {
  const response = await Axios.get("http://localhost:3000/api/getblogposts");
  //console.log(response.data.data.items);
  return {
    props: { blogPostData: response.data.data.items }, // will be passed to the page component as props
  };
}

export default function Blogs(props) {
  const theme = useTheme();
  const classes = useStyles();

  useEffect(() => {
    console.log(props.blogPostData);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title key="title">blog | Barley Cottage Bakery</title>
        <meta
          name="description"
          key="description="
          content="whats going on at Barley Cottage Bakery"
        />

        <meta
          property="og:title"
          key="og:title"
          content="Blog | Barley Cottage Bakery"
        />
        <meta
          property="og:url"
          key="og:url"
          content="barleycottage.co.uk/blog"
        />
        <link
          rel="canonical"
          key="canonical"
          href="https://barleycottage.co.uk/blog"
        ></link>
      </Head>
      <TopMargin />
      <Box
        // style={{ ...theme.mixins.gutters() }}
        display="flex"
        justify="space-between"
        justifyContent="space-around"
        flexDirection="column"
        alignItems="center"
      >
        <Box>
          <Typography variant="h1" component="h1"></Typography>
          <Box mr={6} mb={2}>
            {/* <img width={150} src="/assets/doodles/underline-hash.svg" /> */}
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
              <Typography variant="body1">Coming Soon...</Typography>
            </Box>
          </Grid>
          <Grid item sm={12} md>
            <Box px={8} mt={2}>
              <Typography variant="body1"></Typography>
            </Box>
          </Grid>

          {props.blogPostData.map((item, index) => (
            <Grid key={`${item}${index}`} item xs={12} sm={6} md={4}>
              <Container
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></Container>
            </Grid>
          ))}
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
