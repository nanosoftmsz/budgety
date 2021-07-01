import React, { useState } from "react";
import { Container, Grid, Tooltip, Paper, Typography, Box, TextField, Divider, Dialog, DialogTitle, DialogContent, Button, DialogActions, DialogContentText } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import DateMomentUtils from "@date-io/moment";
import { orange } from "@material-ui/core/colors";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import IndividualMonthCard from "../components/MonthlyExpense/IndividualMonthCard";

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
  const [open, setOpen] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="lg">
        {/* ADD MONTH BUTTON */}
        <Grid container>
          <Tooltip title="Create New Month">
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Paper elevation={0} className={classes.paper} onClick={handleClickOpen}>
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
              <TextField size="small" type="search" variant="outlined" placeholder="Search a month" />
            </Box>
          </Grid>
        </Grid>
        <Divider component="hr"></Divider>
        <Grid container spacing={4} className={classes.mt}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <IndividualMonthCard />
          </Grid>
        </Grid>

        {/* DIALOG FOR MONTH PICKER */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create Month</DialogTitle>
          <DialogContent>
            <DialogContentText>Here you can create month for monthly expense tracking. </DialogContentText>
            <MuiPickersUtilsProvider utils={DateMomentUtils}>
              <KeyboardDatePicker
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
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}
