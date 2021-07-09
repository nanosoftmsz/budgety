import React, { useState, useEffect } from "react";
import { Button, CssBaseline, TextField, Typography, Box, Container, Card, CardContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AutorenewRoundedIcon from "@material-ui/icons/AutorenewRounded";
import Copyright from "../components/Common/Copyright";
import invalid from "../assets/img/invalid.svg";

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
  const [resetPassword, setResetPassword] = useState({ password: "", confirm_password: "" });
  const [isVerified, setIsVerified] = useState(true);

  // FUNCTIONS
  const handleChange = (e) => setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });

  useEffect(() => {
    console.log(window.location.href);
  }, []);
  const handleResetPassword = (e) => {
    e.preventDefault();
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
                  type="password"
                  autoFocus
                  value={resetPassword.password}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Confirm New Password"
                  name="confirm_password"
                  type="password"
                  value={resetPassword.confirm_password}
                  onChange={handleChange}
                />
                <Button type="submit" fullWidth variant="contained" disableElevation color="primary" className={classes.submit}>
                  Reset Password
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
