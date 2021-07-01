import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Container, CssBaseline, Grid, Card, CardContent, Button, Dialog, DialogContent, Typography } from "@material-ui/core";

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
  const values = [
    { money: 25000, name: "Total Earned" },
    { money: 12500, name: "Total Expense" },
    { money: 5000, name: "Total Save" },
  ];
  const { id } = useParams();
  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />
        <Grid container spacing={4} alignItems="center">
          {values.map((v) => (
            <Grid item xs={12} md={4} key={v.name}>
              <Card>
                <CardContent>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <Typography variant="h3"> {v.money.toLocaleString()} </Typography>
                    <Typography variant="h6" color="primary">
                      {v.name}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
