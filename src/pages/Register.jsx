import React, { useState } from "react";
import { Button, CssBaseline, TextField, Typography, Box, Container, FormControlLabel, Checkbox, Card, CardContent, Grid, Divider, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  const [passwordStrength, setPasswordStrength] = useState({ value: 25, color: "red", status: "Poor" });

  const managePasswordStrength = () => {};

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

              <Button size="large" fullWidth color="primary" className={classes.googleBtn}>
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
              <Grid container alignItems="center">
                <Grid item xs={12} sm={6}>
                  <FormControlLabel control={<Checkbox value="remember" color="primary" onChange={(e) => setShowPasswordCheck(e.target.checked)} />} label="Show Password" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container alignItems="center">
                    <Grid item xs={3}>
                      <CircularProgress variant="determinate" value={passwordStrength.value} style={{ color: `${passwordStrength.color}` }} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle1">{passwordStrength.status}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" disableElevation color="primary" className={classes.submit}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" className={classes.link}>
                    <Button variant="text" color="primary">
                      Already have an account? Login
                    </Button>
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
