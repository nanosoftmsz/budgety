import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  Tooltip,
  Paper,
  Typography,
  Box,
  TextField,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  DialogContentText,
  InputAdornment,
  CssBaseline,
  CircularProgress,
} from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import SearchIcon from "@material-ui/icons/Search";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import DateMomentUtils from "@date-io/moment";
import { orange } from "@material-ui/core/colors";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import axios from "axios";
import IndividualMonthCard from "../components/MonthlyExpense/IndividualMonthCard";
import EmptyState from "../components/Common/EmptyState";
import LoadingState from "../components/Common/LoadingState";
import Notification from "../components/Common/Notification";
import { bearerToken } from "../utils/constant";
import { UserContext } from "../context/UserContext";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "8em",
    borderRadius: 8,
    cursor: "pointer",
    border: "2px dashed grey",
    transition: ".2s all ease-in-out",

    "&:hover": {
      backgroundColor: grey[200],
    },
  },
  icon: {
    fontSize: "5em",
    color: "#2979ff",
  },
  section: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(6),
  },

  mt: {
    marginTop: theme.spacing(2),
  },
  textColor: {
    color: orange[800],
  },
}));

export default function MonthlyExpenseList() {
  const classes = useStyles();
  const { loading, setLoading } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [monthName, setMonthName] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllMonths();
  }, []);

  const getAllMonths = () => {
    axios
      .get(`/months/${localStorage.getItem("userId")}`, bearerToken)
      .then((res) => {
        console.log(res);
        setMonthName(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const dialogClose = () => {
    setOpen(false);
  };

  const createMonth = (e) => {
    e.preventDefault();
    let monthYear = moment(selectedMonth).format("LL");
    monthYear = monthYear.split(" ");
    setLoading(true);

    axios
      .post("/months", { name: `${monthYear[0]} ${monthYear[2]}`, user: localStorage.getItem("userId") }, bearerToken)
      .then(() => {
        Notification("Success", "Month created successfully", "success");
        getAllMonths();
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      })
      .finally(() => setLoading(false), setOpen(false));
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {/* ADD MONTH BUTTON */}
        <Grid container>
          <Tooltip title="Create New Month">
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Paper elevation={0} className={classes.paper} onClick={() => setOpen(true)}>
                <AddRoundedIcon className={classes.icon} />
              </Paper>
            </Grid>
          </Tooltip>
        </Grid>

        {/* MONTH LIST */}
        <Grid container alignItems="center" className={classes.section}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" className={classes.textColor}>
              List of Months
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="flex-end">
              <TextField
                margin="dense"
                type="search"
                variant="outlined"
                placeholder="Search a month"
                color="primary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider component="hr"></Divider>
        <Grid container spacing={4} className={classes.mt}>
          {loading ? (
            <Grid item xs={12}>
              <LoadingState />
            </Grid>
          ) : monthName.length > 0 ? (
            monthName.map((month) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={month._id}>
                <IndividualMonthCard info={month} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <EmptyState msg="Month not found. Please create one" />
            </Grid>
          )}
        </Grid>

        {/* DIALOG FOR MONTH PICKER */}
        <Dialog open={open} onClose={dialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create Month</DialogTitle>
          <form onSubmit={createMonth}>
            <DialogContent>
              <DialogContentText>Here you can create month for monthly expense tracking. </DialogContentText>
              <MuiPickersUtilsProvider utils={DateMomentUtils}>
                <KeyboardDatePicker
                  disableFuture
                  disableToolbar
                  autoOk
                  fullWidth
                  variant="inline"
                  inputVariant="outlined"
                  margin="normal"
                  views={["year", "month"]}
                  id="date-picker-inline"
                  label="Pick Your Desired Month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
              <Button size="small" onClick={dialogClose} color="secondary">
                Cancel
              </Button>
              <Button size="small" variant="contained" disableElevation type="submit" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} color="primary" /> : "Create"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </div>
  );
}
