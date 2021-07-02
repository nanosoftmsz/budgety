import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink, Link } from "react-router-dom";

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
  buttonStyle: {
    textTransform: "none",
  },
}));

export default function TheNavbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Budgety</Link>
          </Typography>

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
        </Toolbar>
      </AppBar>
    </div>
  );
}
