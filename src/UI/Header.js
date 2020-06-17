import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import Link from "../Link";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import ShoppingBasketIcon from "../UI/icons/shoppingBasketIcon";

import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: trigger
      ? { backgroundColor: "rgba(23, 21, 21, 0.83)" }
      : { backgroundColor: "transparent" },
    // classes: { root: { backgroundColor: "#aaa" } },
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    //override the responsive style for this style
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
    "&:hover ": {
      opacity: 1,
    },
  },
  button: {
    ...theme.typography.order,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  logoContainer: {
    padding: 20,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logoHeader: {
    fontFamily: "Fredericka the Great, cursive",
    textAlign: "center",
    fontWeight: "500",
  },

  menu: {
    backgroundColor: "white",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.8,
    "&:hover": {
      opacity: 1,
    },
    color: "black",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: 50,
    width: 50,
    color: "white",
  },
  drawer: {
    backgroundColor: theme.palette.common.white,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "black",
    opacity: "0.9",
  },
  drawerItemOrder: {
    backgroundColor: theme.palette.primary.light,

    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  drawerItemSelected: {
    opacity: "1",
  },
  appBar: {
    zIndex: theme.zIndex.modal,
  },
  appbarColor: {
    backgroundColor: "transparent",
  },
  appbarColor: {
    backgroundColor: "#fff",
  },
  tabIndicator: {
    backgroundColor: "transparent",
  },
  underline: {
    position: "absolute",
    top: -10,
  },
  shoppingBasketContainer: {
    opacity: 0.8,
    "&:hover": {
      opacity: 1,
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const basketTotalAmount = useSelector((state) => state.basket.totalAmount);
  const [basketCookie, setBasketCookie] = useState(undefined);

  const handleChange = (e, newValue) => {
    props.setTabIndex(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (e, index) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(index);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const menuOptions = [
    { name: "catering", link: "/catering", activeIndex: 3, selectedIndex: 0 },
    { name: "option 1", link: "/1", activeIndex: 3, selectedIndex: 1 },
    { name: "option 2", link: "/2", activeIndex: 3, selectedIndex: 2 },
    { name: "option 3", link: "/3", activeIndex: 3, selectedIndex: 3 },
  ];

  const routes = [
    { name: "home", link: "/", activeIndex: 0 },
    { name: "bakes", link: "/bakes", activeIndex: 1 },
    { name: "about", link: "/about", activeIndex: 2 },
    // {
    //   name: "catering",
    //   link: "/catering",
    //   activeIndex: 3,
    //   ariaOwns: anchorEl ? "simple-menu" : undefined,
    //   ariaPopup: anchorEl ? true : undefined,
    //   mouseOver: (event) => handleClick(event),
    // },
  ];

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.tabIndex !== route.activeIndex) {
            props.setTabIndex(route.activeIndex);
          }

          if (
            route.selectedIndex &&
            route.selectedIndex !== props.selectedIndex
          ) {
            props.setSelectedIndex(route.selectedIndex);
          }

          break;
        case "/order":
          if (props.tabIndex !== 3) {
            props.setTabIndex(4);
          }
          break;

        default:
          break;
      }
    });
  }, [props.tabIndex, menuOptions, props.selectedIndex, routes, props]);

  const tabs = (
    <>
      <Tabs
        value={props.tabIndex}
        className={classes.tabContainer}
        onChange={handleChange}
        classes={{ indicator: classes.tabIndicator }}
        // indicatorColor={'primary'}
        TabIndicatorProps={{
          children: (
            <img
              className={classes.underline}
              alt=""
              src="/assets/tab-underline.svg"
            />
          ),
        }}
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            href={route.link}
            label={route.name}
            disableRipple
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>

      {/* <Button
        variant="contained"
        color={"secondary"}
        className={classes.button}
      >
        Order
      </Button> */}

      <Box
        mr={2}
        display="flex"
        alignItems="center"
        className={classes.shoppingBasketContainer}
        component={Link}
        href="/basket"
      >
        <Typography
          style={{ marginRight: 30, marginLeft: 30 }}
          variant="h5"
          color="textPrimary"
        >
          £{basketTotalAmount}
        </Typography>
        <img
          height={50}
          alt="shopping basket"
          src="/assets/shopping-basket1.svg"
        />
      </Box>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        //target the props on the components that make this menu component
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={10}
        disableAutoFocus
        keepMounted // imporves SEO
        style={{ zIndex: 1302 }}
        disableScrollLock={true}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={`${option}${index}`}
            onClick={(event) => {
              handleMenuItemClick(event, index);
              props.setTabIndex(3);
            }}
            component={Link}
            href={option.link}
            classes={{ root: classes.menuItem }}
            selected={index === props.selectedIndex && props.tabIndex === 3}
            disableRipple
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const Drawer = () => (
    <>
      <SwipeableDrawer
        disableScrollLock={true}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        onOpen={() => {
          setOpenDrawer(true);
        }}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>
          {routes.map((route) => (
            <ListItem
              key={`${route}${route.activeIndex}`}
              divider
              button
              component={Link}
              onClick={() => {
                setOpenDrawer(false);
                props.setTabIndex(route.activeIndex);
              }}
              href={route.link}
              selected={props.tabIndex === route.activeIndex}
              classes={{
                root: classes.drawerItem,
                selected: classes.drawerItemSelected,
              }}
            >
              <ListItemText
                disableTypography
                className={
                  props.tabIndex === route.activeIndex
                    ? classes.drawerItem
                    : classes.drawerItem
                }
              >
                {route.name}{" "}
              </ListItemText>
            </ListItem>
          ))}

          <ListItem
            divider
            button
            component={Link}
            href="/order"
            onClick={() => {
              setOpenDrawer(false);
              props.setTabIndex(4);
            }}
            classes={{
              root: classes.drawerItemOrder,
              selected: classes.drawerItemSelected,
            }}
            selected={props.tabIndex === 4}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              order
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        disableRipple
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar
          position="fixed"
          className={classes.appBar}
          color={"inherit"}
          classes={{ colorInherit: classes.appbarColor }}
        >
          <Toolbar disableGutters>
            <Button
              component={Link}
              href="/"
              className={classes.logoContainer}
              onClick={() => props.setTabIndex(0)}
              disableRipple
            >
              {/* <img
                src="/assets/logo.svg"
                alt="sweet treated logo"
                className={classes.logo}
              /> */}
              <Typography
                className={classes.logoHeader}
                variant="h2"
                style={{ maxWidth: 250 }}
              >
                Barley Cottage
              </Typography>
            </Button>
            <Hidden smDown>{tabs}</Hidden>
            <Hidden mdUp>{<Drawer />}</Hidden>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </React.Fragment>
  );
}
