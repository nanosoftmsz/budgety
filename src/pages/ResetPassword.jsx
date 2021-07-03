import React from "react";
import { Button, CssBaseline, TextField, Typography, Box, Container, Card, CardContent } from "@material-ui/core";
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

export default function ResetPassword() {
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
                  Reset Password
                </Typography>
              </Box>

              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1">Please choose new password</Typography>
              </Box>

              <TextField variant="outlined" margin="normal" required fullWidth label="Enter New Password" name="password" type="password" autoFocus />
              <TextField variant="outlined" margin="normal" required fullWidth label="Confirm New Password" name="confirm_password" type="password" />
              <Button type="submit" fullWidth variant="contained" disableElevation color="primary" className={classes.submit}>
                Reset Password
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
