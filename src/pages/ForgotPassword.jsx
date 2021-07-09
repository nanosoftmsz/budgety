import React, { useState, useContext } from "react";
import { Button, CssBaseline, TextField, Typography, Box, Container, Card, CardContent, Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Copyright from "../components/Common/Copyright";
import Notification from "../components/Common/Notification";
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

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mb: {
    marginBottom: theme.spacing(2),
  },
  mt: {
    marginTop: theme.spacing(4),
  },
}));

export default function ForgotPassword() {
  const classes = useStyles();
  const { loading, setLoading } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email);
    axios
      .post("/auth/forgot-password", { email: email })
      .then((res) => {
        console.log(res);
        setShowAlert(true);
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.data.message) {
        //   Notification("Error", `${err.response.data.message}`, "error");
        // } else {
        //   Notification("Error", "Something went wrong. Please check your internet connection", "error");
        // }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      {showAlert && (
        <Grid container justify="center" className={classes.mt}>
          <Grid item xs={12}>
            <Alert severity="success" onClose={() => setShowAlert(false)}>
              <AlertTitle>Success</AlertTitle>
              Please check your email. We've sent you an email with reset link. Your link will expire after <strong>5 min</strong>
            </Alert>
          </Grid>
        </Grid>
      )}
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={sendEmail}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h6" color="primary" className={classes.mb}>
                  Forgot password?
                </Typography>
              </Box>

              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1">Enter your email address below and we'll send you password reset OTP.</Typography>
              </Box>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" disableElevation color="primary" className={classes.submit} disabled={loading}>
                {loading ? <CircularProgress size={24} color="primary" /> : "Send Mail"}
              </Button>
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
