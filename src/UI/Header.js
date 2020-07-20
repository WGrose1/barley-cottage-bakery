import React, { useState, useEffect, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import Link from "../Link";

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
import { useSpring, animated } from "react-spring";

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
    // width: 200,
    height: "fit-content",
    padding: 0,
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
    opacity: 0.9,
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
    opacity: "1",
    // opacity: "0.9",
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
    // maxWidth: 60,
  },
  shoppingBasketContainer: {
    marginLeft: "auto",
    marginRight: "2em",
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
  const mediumUp = useMediaQuery(theme.breakpoints.up("md"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [toggleBasketAnim, setToggleBasketAnim] = useState(false);

  const basketTotalAmount = useSelector((state) => state.basket.totalAmount);

  useEffect(() => {
    if (basketTotalAmount > 0) {
      console.log("animating");
      setToggleBasketAnim(true);
    }
  }, [basketTotalAmount]);

  useEffect(() => {
    console.log("toggleBasketAnim", toggleBasketAnim);
  });

  const [basketCookie, setBasketCookie] = useState(undefined);

  const { x } = useSpring({
    from: { x: 0 },
    x: toggleBasketAnim === true ? 1 : 0,
    onRest: (val) => {
      setTimeout(() => {
        setToggleBasketAnim(false);
      }, 1500);
    },
    reset: true,
  });

  const handleChange = (e, newValue) => {
    props.setTabIndex(newValue);
  };
  const handleInitialTab = () => {
    props.setTabIndex(1);
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
    { name: "catering", link: "/catering", activeIndex: 5, selectedIndex: 0 },
    { name: "option 1", link: "/1", activeIndex: 5, selectedIndex: 1 },
    { name: "option 2", link: "/2", activeIndex: 5, selectedIndex: 2 },
    { name: "option 3", link: "/3", activeIndex: 5, selectedIndex: 3 },
  ];

  const routes = [
    { name: "home", link: "/", activeIndex: 0 },
    { name: "bakes", link: "/bakes", activeIndex: 1 },
    { name: "brownie builder", link: "/browniebuilder", activeIndex: 2 },
    // { name: "delivery", link: "/delivery", activeIndex: 3 },
    // { name: "our story", link: "/about", activeIndex: 4 },
    // { name: "catering", link: "/catering", activeIndex: 5 },
    // {
    //   name: "catering",
    //   link: "/catering",
    //   activeIndex: 3,
    //   ariaOwns: anchorEl ? "simple-menu" : undefined,
    //   ariaPopup: anchorEl ? true : undefined,
    //   mouseOver: (event) => handleClick(event),
    // },
  ];

  const tabsActions = useRef();

  // useEffect(() => {
  //   if (tabsActions.current) {
  //     tabsActions.current.updateIndicator();
  //     // tabsActions.current.updateIndicator();
  //   }
  // }, []);

  useEffect(() => {
    //workaround to make sure the tab indicato resizes
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("resize"));
    }, 1);
  }, []);

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
        action={tabsActions}
        value={props.tabIndex}
        className={classes.tabContainer}
        onChange={handleChange}
        classes={{ indicator: classes.tabIndicator }}
        // indicatorColor={'primary'}
        TabIndicatorProps={{
          children: (
            <div>
              <img
                className={classes.underline}
                alt=""
                src="/assets/tab-underline.svg"
              />
            </div>
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
        <Tab
          key={`basket_tab`}
          className={classes.tab}
          component={Link}
          href="/basket"
          label={
            <Box
              display="flex"
              alignItems="center"
              // className={classes.shoppingBasketContainer}

              // style={{ marginLeft: "auto" }}
              onClick={() => {
                props.setTabIndex(undefined);
                // setToggleBasketAnim(!toggleBasketAnim);
              }}
            >
              <Typography
                style={{
                  marginRight: 1,
                  marginLeft: 1,
                  // minWidth: 65,
                  textAlign: "right",
                }}
                variant="h6"
                color="textPrimary"
              >
                {Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(basketTotalAmount)}
              </Typography>

              <animated.img
                style={{
                  marginLeft: 25,
                  opacity: x.interpolate({
                    range: [0, 0.5, 1],
                    output: [0.7, 1, 0.7],
                  }),
                  transform: x
                    .interpolate({
                      range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                      output: [1, 0.97, 0.9, 1.3, 1.4, 1.1, 1.03, 1],
                    })
                    .interpolate((x) => `scale(${x})`),
                  bottom: 5,
                  position: "relative",
                }}
                height={32}
                alt="shopping basket"
                src="/assets/shopping-basket1.svg"
              />
            </Box>
          }
          disableRipple
        />
      </Tabs>

      {/* <Button
        variant="contained"
        color={"secondary"}
        className={classes.button}
      >
        Order
      </Button> */}

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
              // props.setTabIndex(3);
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
    <React.Fragment>
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
                {route.name}
              </ListItemText>
            </ListItem>
          ))}

          {/* <ListItem
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
          </ListItem> */}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        disableRipple
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
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
            <Box m={2}>
              <Button
                component={Link}
                href="/"
                className={classes.logoContainer}
                onClick={() => props.setTabIndex(0)}
                disableRipple
              >
                {/* <img
                src="/assets/logo.svg"
                alt="Barley Cottage Bakery logo"
                className={classes.logo}
              /> */}
                {/* <Typography
                className={classes.logoHeader}
                variant="h2"
                style={{ maxWidth: 250 }}
              >
                Barley Cottage
              </Typography> */}
                <img width={mediumUp ? 150 : 70} src="/assets/logo1.svg" />
              </Button>
            </Box>
            <Hidden smDown>{tabs}</Hidden>
            <Hidden mdUp>
              <Box
                display="flex"
                alignItems="flex-end"
                className={classes.shoppingBasketContainer}
                component={Link}
                href="/basket"
                // style={{ marginLeft: "auto" }}
                onClick={() => {
                  props.setTabIndex(undefined);
                  // setToggleBasketAnim(!toggleBasketAnim);
                }}
              >
                <Typography
                  style={{
                    marginRight: 25,

                    minWidth: 25,
                    textAlign: "right",
                  }}
                  variant="h6"
                  color="textPrimary"
                >
                  {Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(basketTotalAmount)}
                </Typography>

                <animated.img
                  style={{
                    opacity: x.interpolate({
                      range: [0, 0.5, 1],
                      output: [0.7, 1, 0.7],
                    }),
                    transform: x
                      .interpolate({
                        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                        output: [1, 0.97, 0.9, 1.3, 1.4, 1.1, 1.03, 1],
                      })
                      .interpolate((x) => `scale(${x})`),
                    bottom: 5,
                    position: "relative",
                  }}
                  height={32}
                  alt="shopping basket"
                  src="/assets/shopping-basket1.svg"
                />
              </Box>
            </Hidden>
            <Hidden mdUp>{<Drawer />}</Hidden>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </React.Fragment>
  );
}
