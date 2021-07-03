import React from "react";
import { Container, Grid, Card, CardContent, Typography, Box, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";
import QueueRoundedIcon from "@material-ui/icons/QueueRounded";
import GroupBarChart from "../components/Dashboard/GroupBarChart";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
  icon: {
    fontSize: "3rem",
  },
  save: {
    color: "#64dd17",
  },
  owned: {
    color: "#2979ff",
  },
  debt: {
    color: "#e91e63",
  },
  section: {
    marginTop: theme.spacing(4),
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />
        <Grid container spacing={4} alignItems="center" justify="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h4">42343</Typography>
                    <Typography variant="subtitle1">Total Saved</Typography>
                  </Grid>
                  <Grid item>
                    <MonetizationOnRoundedIcon className={clsx(classes.icon, classes.save)} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h4">42343</Typography>
                    <Typography variant="subtitle1">Total Owned</Typography>
                  </Grid>
                  <Grid item>
                    <QueueRoundedIcon className={clsx(classes.icon, classes.owned)} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h4">42343</Typography>
                    <Typography variant="subtitle1">Total Debt</Typography>
                  </Grid>
                  <Grid item>
                    <ReceiptRoundedIcon className={clsx(classes.icon, classes.debt)} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="center" className={classes.section}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <GroupBarChart />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
