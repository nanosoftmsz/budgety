import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Hidden, IconButton, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink, Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  buttonStyle: {
    textTransform: "none",
  },
}));

export default function TheNavbar() {
  const classes = useStyles();
  const history = useHistory();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setIsDrawerOpen(open);
  };

  const logout = () => {
    console.log(localStorage.getItem("userToken"));
    axios
      .post("/logout", { token: localStorage.getItem("userToken") })
      .then((res) => {
        console.log("logged out");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUserInfo({ userToken: null });
        localStorage.clear();
        history.push("/");
        window.location.reload();
      });
  };

  const list = () => (
    <div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {userInfo.userToken || localStorage.getItem("userToken") ? (
          <>
            <ListItem button component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/monthly-expenditure">
              <ListItemText primary="Monthly Expenditure" />
            </ListItem>
            <ListItem button component={Link} to="/owned-and-debt">
              <ListItemText primary="Owned / Debt" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Sign In" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Budgety</Link>
          </Typography>

          {/* SHOW ONLY ON MEDIUM AND SMALLER SIZED DEVICES */}
          <Hidden lgUp>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" edge="start" className={classes.menuButton} onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>

            <Drawer anchor={"left"} open={isDrawerOpen} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </Hidden>

          {/* HIDE ONLY ON MEDIUM AND SMALLER SIZE DEVICES */}
          <Hidden mdDown>
            {userInfo.userToken || localStorage.getItem("userToken") ? (
              <>
                <NavLink
                  to="/dashboard"
                  activeStyle={{
                    borderBottom: "3px solid #2979ff",
                    borderRadius: "3px",
                  }}>
                  <Button color="inherit" className={classes.buttonStyle}>
                    Dashboard
                  </Button>
                </NavLink>

                <NavLink
                  to="/monthly-expenditure"
                  activeStyle={{
                    borderBottom: "3px solid #2979ff",
                    borderRadius: "3px",
                  }}>
                  <Button color="inherit" className={classes.buttonStyle}>
                    Monthly Expenditure
                  </Button>
                </NavLink>

                <NavLink
                  to="/owned-and-debt"
                  activeStyle={{
                    borderBottom: "3px solid #2979ff",
                    borderRadius: "3px",
                  }}>
                  <Button color="inherit" className={classes.buttonStyle}>
                    Owned / Debt
                  </Button>
                </NavLink>

                <Button color="inherit" className={classes.buttonStyle} onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  activeStyle={{
                    borderBottom: "3px solid #2979ff",
                    borderRadius: "3px",
                  }}>
                  <Button color="inherit" className={classes.buttonStyle}>
                    Log In
                  </Button>
                </NavLink>

                <NavLink
                  to="/register"
                  activeStyle={{
                    borderBottom: "3px solid #1565c0",
                    borderRadius: "3px",
                  }}>
                  <Button color="inherit" className={classes.buttonStyle}>
                    Register
                  </Button>
                </NavLink>
              </>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
