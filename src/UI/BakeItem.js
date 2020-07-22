import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Product from "../models/Product";
import ReactGA from "react-ga";

import * as basketActions from "../store/Actions/basketActions";

const useStyles = makeStyles((theme) => {
  return {
    gridItem: {
      padding: 10,
      marginBottom: 20,
      "&:hover": {
        "& bakedItemImage": {
          opacity: 1,
        },
      },
    },
    addToBasketBtn: {
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

const BakeItem = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [addQuantity, setaddQuatity] = useState(1);
  const dispatch = useDispatch();

  const { id, title, description, price, imageUrl } = props.item;

  const handleAddToBasket = () => {
    dispatch(
      basketActions.addItem(
        new Product(id, title, imageUrl, description, price),
        addQuantity
      )
    );
    setaddQuatity(1);
  };

  return (
    <React.Fragment>
      <Grid
        className={classes.gridItem}
        container
        item
        spacing={3}
        xs
        // sm={6}

        // lg={3}

        justify="center"
        direction="column"
      >
        <Grid container item justify="center" alignContent="center">
          <img
            className={classes.bakedItemImage}
            height={150}
            src={imageUrl}
            alt="dark chocolate brownie"
          />
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify="flex-end"
        >
          <Grid container justify="center" item>
            <Grid item>
              <Typography align="center" variant="h4" noWrap>
                {title}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Box mr={1}>
                  <Typography align="center" variant="body1">
                    {description}
                  </Typography>
                </Box>
                <Typography variant="body1"> £{price}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            item
            justify="center"
            alignItems="center"
            spacing={3}
            style={{ marginTop: 12 }}
          >
            <Grid item>
              <Paper variant="outlined" style={{ background: "none" }}>
                <Box display="flex">
                  <IconButton
                    className={classes.iconButton}
                    aria-label="remove"
                    onClick={() => {
                      setaddQuatity(addQuantity - 1);
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <InputBase
                    className={classes.input}
                    placeholder="1"
                    style={{ width: 20, textAlign: "center", fontSize: 22 }}
                    classes={{ input: classes.quantityInput }}
                    value={addQuantity}
                    // inputProps={{ "aria-label": "search google maps" }}
                  />
                  <IconButton
                    className={classes.iconButton}
                    aria-label="add"
                    onClick={() => {
                      setaddQuatity(addQuantity + 1);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Button
                className={classes.addToBasketBtn}
                variant="outlined"
                onClick={() => {
                  ReactGA.event({
                    category: "BakeItem",
                    action: "Item addedto basket",
                  });
                  handleAddToBasket();
                }}
              >
                Add to basket
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default BakeItem;
