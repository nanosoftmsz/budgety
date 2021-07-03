import React from "react";
import { Container, Grid, Card, CardContent, Typography, Box, CssBaseline, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";
import QueueRoundedIcon from "@material-ui/icons/QueueRounded";
import GroupBarChart from "../components/Dashboard/GroupBarChart";
import LineChart from "../components/Dashboard/LineChart";
import Copyright from "../components/Copyright";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
        <Grid container justify="flex-end" className={classes.section}>
          <Grid item>
            <FormControl variant="outlined" fullWidth className={classes.formControl}>
              <InputLabel>Year</InputLabel>
              <Select label="Year" variant="outlined" margin="dense">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="2020">2020</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">Monthly Save and Expense</Typography>
                  </Grid>
                </Grid>
                <Box mt={3}>
                  <GroupBarChart />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">Monthly Save Ratio</Typography>
                  </Grid>
                </Grid>
                <Box mt={3}>
                  <LineChart />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container className={classes.section}></Grid>
        <Copyright />
      </Container>
    </div>
  );
}
