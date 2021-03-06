import React, { useState, useEffect, useContext } from "react";
import { Button, CssBaseline, TextField, Typography, Box, Container, Card, CardContent, Grid, CircularProgress, FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import AutorenewRoundedIcon from "@material-ui/icons/AutorenewRounded";
import Copyright from "../components/Common/Copyright";
import invalid from "../assets/img/invalid.svg";
import Notification from "../components/Common/Notification";
import { UserContext } from "../context/UserContext";
import PasswordStrengthMeter from "../components/Common/PasswordStrengthMeter";
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
    marginBottom: theme.spacing(4),
  },
  googleBtn: {
    background: "#e3f2fe",
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const { loading, setLoading } = useContext(UserContext);
  const history = useHistory();

  // STATES
  const [resetPassword, setResetPassword] = useState({ password: "", confirm_password: "" });
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  // FUNCTIONS
  const handleChange = (e) => setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });

  useEffect(() => {
    const url = window.location.href;
    const mail = url.split("&mail=")[1];
    setEmail(mail);
    console.log(mail);
    axios
      .post("/auth/verify-forgot-url", { email: mail, verifyUrl: url })
      .then((res) => {
        console.log(res);
        if (res.data.message === true) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      });
  }, []);

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (resetPassword.password !== resetPassword.confirm_password) return Notification("Warning", "Password didn't match", "warning");
    setLoading(true);
    axios
      .post("/auth/reset-password", { email: email, password: resetPassword.password })
      .then((res) => {
        console.log(res);
        Notification("Success", "Your password has been reset successfully", "success");
        history.push("/login");
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      {isVerified ? (
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.paper}>
              <form className={classes.form} onSubmit={handleResetPassword}>
                <Box display="flex" justifyContent="center">
                  <Typography variant="h6" color="primary" className={classes.mb}>
                    Reset Password
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="center">
                  <Typography variant="subtitle1">Please choose new password</Typography>
                </Box>

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Enter New Password"
                  name="password"
                  type={showPasswordCheck ? "text" : "password"}
                  autoFocus
                  value={resetPassword.password}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type={showPasswordCheck ? "text" : "password"}
                  label="Confirm New Password"
                  name="confirm_password"
                  value={resetPassword.confirm_password}
                  onChange={handleChange}
                />

                {resetPassword.password && <PasswordStrengthMeter password={resetPassword.password} />}

                <Grid container alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel control={<Checkbox value="remember" color="primary" onChange={(e) => setShowPasswordCheck(e.target.checked)} />} label="Show Password" />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" disableElevation color="primary" className={classes.submit} disabled={loading}>
                  {loading ? <CircularProgress size={24} color="primary" /> : "Reset Password"}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Grid container direction="column" alignItems="center" justify="center">
          <img src={invalid} alt="page not found" style={{ height: "40vh", marginTop: "4rem" }} />
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={3}>
            <Typography variant="h5">Snap! You link has expired.</Typography>
            <Link to="/forgot-password">
              <Button disableElevation variant="contained" color="primary" style={{ marginTop: "2rem" }} endIcon={<AutorenewRoundedIcon />}>
                Resend email
              </Button>
            </Link>
          </Box>
        </Grid>
      )}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
