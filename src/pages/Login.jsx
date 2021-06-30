import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { blue } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
import { Card, CardContent } from "@material-ui/core";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(8),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  link: {
    color: blue[700],
    textDecoration: "underline",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mb: {
    marginBottom: theme.spacing(3),
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form}>
            <div className={classes.paper}>
              <Typography variant="h6" color="primary" className={classes.mb}>
                Hi, Welcome Back
              </Typography>

              <Button variant="outlined" fullWidth color="primary" className={classes.mb}>
                Sign In with Google
              </Button>

              <Typography variant="subtitle1">Sign In with Email address</Typography>

              <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/" className={classes.link}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" className={classes.link}>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </div>
          </form>
        </CardContent>
      </Card>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
