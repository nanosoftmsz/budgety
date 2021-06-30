import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Copyright from "../components/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: blue[700],
    textDecoration: "underline",
  },
}));

export default function Register() {
  const classes = useStyles();
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    console.log(e.target.password.value);
    console.log(e.target.remember.value);
    console.log(e.target.demo_select.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register to get started
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" required fullWidth label="Email Address" name="email" autoFocus />
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type={showPasswordCheck ? "text" : "password"} />
          <TextField variant="outlined" margin="normal" required fullWidth name="confirm_password" label="Confirm Password" type={showPasswordCheck ? "text" : "password"} />
          <FormControlLabel control={<Checkbox value="remember" color="primary" onChange={(e) => setShowPasswordCheck(e.target.checked)} />} label="Show Password" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" className={classes.link}>
                {"Already have an account. Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
