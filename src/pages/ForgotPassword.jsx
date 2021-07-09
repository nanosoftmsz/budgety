import React, { useState } from "react";
import { Button, CssBaseline, TextField, Typography, Box, Container, Card, CardContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Copyright from "../components/Common/Copyright";

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
  const [showAlert, setShowAlert] = useState(true);

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
