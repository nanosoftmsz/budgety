import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory, NavLink, Link } from "react-router-dom";

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
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#2962ff" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Budgety</Link>
          </Typography>

          <NavLink
            to="/login"
            activeStyle={{
              background: "#2979ff",
              borderRadius: 12,
            }}>
            <Button color="inherit" className={classes.buttonStyle}>
              Log In
            </Button>
          </NavLink>

          <NavLink
            to="/register"
            activeStyle={{
              background: "#2979ff",
              borderRadius: 12,
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
