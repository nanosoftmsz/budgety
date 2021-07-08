import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import {
  Container,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  Box,
  Tabs,
  Tab,
  DialogTitle,
  TextField,
  DialogActions,
} from "@material-ui/core";
import TabPanel from "../components/Common/TabPanel";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded";
import ExpenseHistoryTable from "../components/MonthlyExpense/ExpenseHistoryTable";
import AddMoneyHistoryTable from "../components/MonthlyExpense/AddMoneyHistoryTable";
import Notification from "../components/Common/Notification";
import { UserContext } from "../context/UserContext";
import { bearerToken } from "../utils/constant";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },

  mt: {
    marginTop: theme.spacing(2),
  },

  mr: {
    marginRight: theme.spacing(2),
  },

  section: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },

  month: {
    fontWeight: 500,
  },
}));
export default function IndividualMonthExpense() {
  const classes = useStyles();
  const { id } = useParams();
  const { loading, setLoading } = useContext(UserContext);
  const [value, setValue] = useState(1);
  const [addAmountModal, setAddAmountModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [data, setData] = useState([]);
  const [addAmount, setAddAmount] = useState({ nameOfSource: "", amount: 0 });
  const [expenseInfo, setExpenseInfo] = useState({ expensePurpose: "", description: "", amount: 0 });

  const getIndividualMonthData = () => {
    axios
      .get(`months/${localStorage.getItem("userId")}/${id}`, bearerToken)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        if (err.response.data?.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      });
  };

  useEffect(() => {
    getIndividualMonthData();
  }, []);

  const handleAddAmountSubmit = (e) => {
    e.preventDefault();
    setAddAmountModal(false);
    axios
      .post(
        "/income-histories",
        {
          source: addAmount.nameOfSource,
          amount: addAmount.amount,
          user: data.user,
          month: data._id,
        },
        bearerToken
      )
      .then((res) => {
        console.log(res);
        Notification("Success", "Amount added successfully", "success");
        getIndividualMonthData();
      })
      .catch((err) => {
        if (err.response.data?.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    setExpenseModal(false);
    axios
      .post(
        "/expense-histories",
        {
          purpose: expenseInfo.expensePurpose,
          description: expenseInfo.description || "N/A",
          amount: expenseInfo.amount,
          user: data.user,
          month: data._id,
        },
        bearerToken
      )
      .then((res) => {
        console.log(res);
        Notification("Success", "Amount added successfully", "success");
        getIndividualMonthData();
      })
      .catch((err) => {
        if (err.response.data?.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      });
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddAmountChange = (e) => setAddAmount({ ...addAmount, [e.target.name]: e.target.value });
  const handleExpenseAmountChange = (e) => setExpenseInfo({ ...expenseInfo, [e.target.name]: e.target.value });

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" mb={4}>
          <Typography variant="h4" color="primary" className={classes.month}>
            {data.name}
          </Typography>
        </Box>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Typography variant="h3"> {data.earned ? data.earned.toLocaleString() : 0} </Typography>
                  <Typography variant="h6" style={{ color: "#2979ff" }}>
                    Total Earned
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Typography variant="h3"> {data.expense ? data.expense.toLocaleString() : 0} </Typography>
                  <Typography variant="h6" style={{ color: "#e91e63" }}>
                    Total Expense
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Typography variant="h3"> {data.saved ? data.saved.toLocaleString() : 0} </Typography>
                  <Typography variant="h6" style={{ color: "#00c853" }}>
                    Total Save
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* BUTTON LIST */}
        <Grid container justify="flex-end" className={classes.section}>
          <Button variant="outlined" color="primary" className={classes.mr} endIcon={<AttachMoneyRoundedIcon />} onClick={() => setAddAmountModal(true)}>
            Add Amount
          </Button>
          <Button variant="contained" color="primary" disableElevation endIcon={<PostAddRoundedIcon />} onClick={() => setExpenseModal(true)}>
            Add Expense
          </Button>
        </Grid>

        {/* TABS FOR SAVE AND EXPENDITURE MONEY */}
        <Tabs value={value} onChange={handleTabChange} indicatorColor="primary" centered aria-label="simple tabs example">
          <Tab label="Money Added History" {...a11yProps(0)} />
          <Tab label="Expense History" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <AddMoneyHistoryTable addHistory={data.Income} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ExpenseHistoryTable expenseHistory={data.Expense} />
        </TabPanel>

        {/* ADD AMOUNT MODAL */}
        <Dialog open={addAmountModal} onClose={() => setAddAmountModal(false)} aria-labelledby="form-dialog-title">
          <form onSubmit={handleAddAmountSubmit}>
            <DialogTitle id="form-dialog-title">Add Monthly Amount</DialogTitle>
            <DialogContent>
              <DialogContentText>You can add monthly amount from which the expenditure money will be deducted. </DialogContentText>
              <TextField autoFocus margin="normal" variant="outlined" name="nameOfSource" label="Money Source" required fullWidth value={addAmount.nameOfSource} onChange={handleAddAmountChange} />
              <TextField margin="normal" variant="outlined" name="amount" label="Amount" type="number" required fullWidth value={addAmount.amount} onChange={handleAddAmountChange} />
              <small>* indicates required field</small>
            </DialogContent>
            <DialogActions>
              <Button size="small" onClick={() => setAddAmountModal(false)} color="secondary">
                Cancel
              </Button>
              <Button size="small" variant="contained" disableElevation type="submit" color="primary">
                Add Money
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* EXPENSE DIALOG */}
        <Dialog open={expenseModal} onClose={() => setExpenseModal(false)} aria-labelledby="form-dialog-title">
          <form onSubmit={handleExpenseSubmit}>
            <DialogTitle id="form-dialog-title">Add Expense Info</DialogTitle>
            <DialogContent>
              <DialogContentText>You can add monthly expense from here. </DialogContentText>
              <TextField
                autoFocus
                margin="normal"
                variant="outlined"
                name="expensePurpose"
                label="Expense Purpose"
                required
                fullWidth
                value={expenseInfo.expensePurpose}
                onChange={handleExpenseAmountChange}
              />
              <TextField margin="normal" variant="outlined" name="description" label="Description" fullWidth value={expenseInfo.description} onChange={handleExpenseAmountChange} />
              <TextField margin="normal" variant="outlined" name="amount" label="Amount" type="number" required fullWidth value={expenseInfo.amount} onChange={handleExpenseAmountChange} />
              <small>* indicates required field</small>
            </DialogContent>
            <DialogActions>
              <Button size="small" onClick={() => setExpenseModal(false)} color="secondary">
                Cancel
              </Button>
              <Button size="small" variant="contained" disableElevation type="submit" color="primary">
                Add Expense
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </div>
  );
}
