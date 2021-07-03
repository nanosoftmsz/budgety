import React from "react";
import { Button, CssBaseline, TextField, Typography, Box, Container, Divider, Card, CardContent, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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

export default function ForgotPassword() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.paper}>
            <form className={classes.form}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h6" color="primary" className={classes.mb}>
                  Forgot password?
                </Typography>
              </Box>

              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1">Enter your email address below and we'll send you password reset OTP.</Typography>
              </Box>

              <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" type="email" autoFocus />
              <Button type="submit" fullWidth variant="contained" disableElevation color="primary" className={classes.submit}>
                Send Mail
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
