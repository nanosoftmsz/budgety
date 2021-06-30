import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TimelineIcon from "@material-ui/icons/Timeline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  card: {
    backgroundColor: "transparent",
    textAlign: "center",
  },
  iconSize: {
    fontSize: "4rem",
  },
}));

export default function FeatureSummaryCard() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={4} justify="center" alignItems="center" className={classes.root}>
        <Grid item xs={12} md={4}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <EqualizerIcon className={classes.iconSize} color="primary" />
              <Typography variant="h6">Summary Dashboard</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <AttachMoneyIcon className={classes.iconSize} color="primary" />
              <Typography variant="h6">Monthly Expense</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <TimelineIcon className={classes.iconSize} color="primary" />
              <Typography variant="h6">Owned/Debts Tracking</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
