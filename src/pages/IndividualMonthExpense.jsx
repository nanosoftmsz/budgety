import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Container, CssBaseline, Grid, Card, CardContent, Button, Dialog, DialogContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },

  mt: {
    marginTop: theme.spacing(2),
  },
}));
export default function IndividualMonthExpense() {
  const classes = useStyles();
  const { id } = useParams();
  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />
      </Container>
    </div>
  );
}
