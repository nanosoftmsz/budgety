import React, { useState } from "react";
import { Button, CssBaseline, TextField, Typography, Box, Container, FormControlLabel, Checkbox, Card, CardContent, Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import Copyright from "../components/Copyright";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(8),
  },
  paper: {
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
  mb: {
    marginBottom: theme.spacing(4),
  },
  googleBtn: {
    background: "#e3f2fe",
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
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h6" color="primary" className={classes.mb}>
                  Sign Up
                </Typography>
              </Box>

              <Button fullWidth color="primary" className={classes.googleBtn}>
                Sign Up with Google
              </Button>

              <Box my={4}>
                <Divider component="hr"></Divider>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1">Sign In With Email Address</Typography>
              </Box>

              <TextField variant="outlined" margin="normal" required fullWidth label="Email Address" name="email" autoFocus />
              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type={showPasswordCheck ? "text" : "password"} />
              <TextField variant="outlined" margin="normal" required fullWidth name="confirm_password" label="Confirm Password" type={showPasswordCheck ? "text" : "password"} />
              <FormControlLabel control={<Checkbox value="remember" color="primary" onChange={(e) => setShowPasswordCheck(e.target.checked)} />} label="Show Password" />
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                Sign Up
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
        </CardContent>
      </Card>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
