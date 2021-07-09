import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Box, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateMomentUtils from "@date-io/moment";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";
import QueueRoundedIcon from "@material-ui/icons/QueueRounded";
import GroupBarChart from "../components/Dashboard/GroupBarChart";
import MonthlyEarnedLineChart from "../components/Dashboard/MonthlyEarnedLineChart";
import MonthlySavedLineChart from "../components/Dashboard/MonthlySavedLineChart";
import Copyright from "../components/Common/Copyright";
import clsx from "clsx";
import moment from "moment";
import axios from "axios";
import { bearerToken } from "../utils/constant";

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

  const [selectedYear, setSelectedYear] = useState(new Date());
  const [currentYear, setCurrentYear] = useState("");
  const [dashboardCharts, setDashboardCharts] = useState();
  const [dashboardCards, setDashboardCards] = useState();

  useEffect(() => {
    let year = moment().format("LL");
    year = year.split(" ");
    setCurrentYear(year[2]);

    axios
      .post("/dashboard/chart", { user: localStorage.getItem("userId"), year: year[2] }, bearerToken)
      .then((res) => {
        console.log(res);
        setDashboardCharts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/dashboard/summary/${localStorage.getItem("userId")}`, bearerToken)
      .then((res) => {
        console.log(res);
        setDashboardCards(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleYearChange = (date) => {
    setSelectedYear(date);
    let year = moment(date).format("LL");
    year = year.split(" ");
    setCurrentYear(year[2]);

    axios
      .post("/dashboard/chart", { user: localStorage.getItem("userId"), year: year[2] }, bearerToken)
      .then((res) => {
        console.log(res);
        setDashboardCharts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                    <Typography variant="h4"> {dashboardCards.TotalSaved.toLocaleString()}</Typography>
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
                    <Typography variant="h4">{dashboardCards.TotalOwned.toLocaleString()}</Typography>
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
                    <Typography variant="h4">{dashboardCards.TotalDebt.toLocaleString()}</Typography>
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
        <Grid container spacing={2} justify="flex-end" alignItems="center" className={classes.section}>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateMomentUtils}>
              <KeyboardDatePicker
                disableFuture
                disableToolbar
                autoOk
                fullWidth
                variant="inline"
                inputVariant="outlined"
                margin="dense"
                views={["year"]}
                id="date-picker-inline"
                label="Pick Your Desired Year"
                value={selectedYear}
                onChange={handleYearChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">Monthly Save and Expense for year {currentYear}</Typography>
                  </Grid>
                </Grid>
                <Box mt={3}>
                  <GroupBarChart barChartData={dashboardCharts?.MonthlyEarnedExpenseSave} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">Monthly Earned Ratio for year {currentYear}</Typography>
                  </Grid>
                </Grid>
                <Box mt={3}>
                  <MonthlyEarnedLineChart monthlyEarnedLineChart={dashboardCharts?.MonthlyEarned} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">Monthly Save Ratio for year {currentYear}</Typography>
                  </Grid>
                </Grid>
                <Box mt={3}>
                  <MonthlySavedLineChart monthlySavedLineChart={dashboardCharts?.MonthlySave} />
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
