import React, { useState, useContext } from "react";
import { Button, CssBaseline, TextField, Typography, Box, Container, FormControlLabel, Checkbox, Card, CardContent, Grid, Divider, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import googleicon from "../assets/img/google.svg";
import { GoogleLogin } from "react-google-login";
import Copyright from "../components/Copyright";
import Notification from "../components/Notification";
import { UserContext } from "../context/UserContext";
import axios from "axios";

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
  const history = useHistory();
  const { loading, setLoading } = useContext(UserContext);

  // STATES
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [createUser, setCreateUser] = useState({ email: "", password: "", confirmPassword: "" });

  // FUNCTIONS
  const handleChange = (e) => {
    setCreateUser({ ...createUser, [e.target.name]: e.target.value });
  };

  const responseGoogle = (res) => {
    console.log(res);
  };

  const handlePasswordValidation = () => {
    console.log(createUser.password);
    console.log(createUser.confirmPassword);
    if (createUser.password !== createUser.confirmPassword) {
      Notification("Warning", "Password didn't match", "warning");
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (handlePasswordValidation()) {
      axios
        .post("/auth/signup", { email: createUser.email, password: createUser.password })
        .then((res) => {
          console.log(res);
          history.push("/login");
          Notification("Success", "Account created successfully", "success");
        })
        .catch((err) => {
          if (err.response.data.message) {
            Notification("Error", `${err.response.data.message}`, "error");
          } else {
            Notification("Error", "Something went wrong. Please check your internet connection", "error");
          }
        })
        .finally(() => {
          console.log("finally here");
          setLoading(false);
          setCreateUser({ email: "", password: "", confirmPassword: "" });
        });
    }
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
              <GoogleLogin
                clientId="213568195691-3e4k2sli1gfc38ppa5hc3jq097jegqji.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button size="large" fullWidth color="primary" className={classes.googleBtn} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <img src={googleicon} alt="google icon" className={classes.gicon} />
                    Sign Up with Google
                  </Button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={true}
                cookiePolicy={"single_host_origin"}
              />
              ,
              <Box my={4}>
                <Divider component="hr"></Divider>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1">Sign In With Email Address</Typography>
              </Box>
              <TextField variant="outlined" margin="normal" required fullWidth label="Email Address" type="email" name="email" value={createUser.email} autoFocus onChange={handleChange} />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={createUser.password}
                type={showPasswordCheck ? "text" : "password"}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                value={createUser.confirmPassword}
                type={showPasswordCheck ? "text" : "password"}
                onChange={handleChange}
              />
              <Grid container alignItems="center">
                <Grid item xs={12} sm={6}>
                  <FormControlLabel control={<Checkbox value="remember" color="primary" onChange={(e) => setShowPasswordCheck(e.target.checked)} />} label="Show Password" />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" disableElevation color="primary" className={classes.submit} disabled={loading}>
                {loading ? <CircularProgress size={24} color="primary" /> : "Sign Up"}
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
