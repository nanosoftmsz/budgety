import React, { useState, useContext } from "react";
import { Button, CssBaseline, TextField, Typography, Box, Container, Divider, Card, CardContent, Grid, CircularProgress } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import googleicon from "../assets/img/google.svg";
import Copyright from "../components/Copyright";
import Notification from "../components/Notification";
import axios from "axios";
import { UserContext } from "../context/UserContext";

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

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { loading, setLoading, setUserInfo } = useContext(UserContext);

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleChange = (e) => setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/auth/signin", { email: loginInfo.email, password: loginInfo.password })
      .then((res) => {
        console.log(res);
        setUserInfo({ userId: res.data.data._id, userEmail: res.data.data.email, userToken: res.data.data.token });
        localStorage.setItem("userId", res.data.data._id);
        localStorage.setItem("userEmail", res.data.data.email);
        localStorage.setItem("userToken", res.data.data.token);
        history.push("/dashboard");
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
        setLoginInfo({ email: "", password: "" });
      });
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
                  Hi, Welcome Back
                </Typography>
              </Box>

              <Button size="large" fullWidth color="primary" className={classes.googleBtn}>
                <img src={googleicon} alt="google icon" className={classes.gicon} />
                Sign In with Google
              </Button>

              <Box my={4}>
                <Divider component="hr"></Divider>
              </Box>

              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1">Sign In With Email Address</Typography>
              </Box>

              <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" value={loginInfo.email} type="email" autoFocus onChange={handleChange} />
              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" value={loginInfo.password} onChange={handleChange} />
              <Button type="submit" fullWidth variant="contained" disableElevation color="primary" className={classes.submit} disabled={loading}>
                {loading ? <CircularProgress size={24} color="primary" /> : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot-password">
                    <Button variant="text" color="primary">
                      Forgot password?
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register">
                    <Button variant="text" color="primary">
                      Don't have an account? Sign Up
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
