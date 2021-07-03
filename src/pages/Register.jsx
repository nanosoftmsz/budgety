import React, { useState } from "react";
import { Button, CssBaseline, TextField, Typography, Box, Container, FormControlLabel, Checkbox, Card, CardContent, Grid, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import googleicon from "../assets/img/google.svg";
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

  gicon: {
    width: "20px",
    height: "20px",
    marginRight: theme.spacing(4),
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
  const [createUser, setCreateUser] = useState({ email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    setCreateUser({ ...createUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(createUser.email);
    console.log(createUser.password);
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
                <img src={googleicon} alt="google icon" className={classes.gicon} />
                Sign Up with Google
              </Button>

              <Box my={4}>
                <Divider component="hr"></Divider>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1">Sign In With Email Address</Typography>
              </Box>

              <TextField variant="outlined" margin="normal" required fullWidth label="Email Address" type="email" name="email" autoFocus onChange={handleChange} />
              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type={showPasswordCheck ? "text" : "password"} onChange={handleChange} />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type={showPasswordCheck ? "text" : "password"}
                onChange={handleChange}
              />
              <Grid container alignItems="center">
                <Grid item xs={12} sm={6}>
                  <FormControlLabel control={<Checkbox value="remember" color="primary" onChange={(e) => setShowPasswordCheck(e.target.checked)} />} label="Show Password" />
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
