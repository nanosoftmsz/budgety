import React, { useState } from "react";
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
  const [value, setValue] = useState(1);
  const [addAmountModal, setAddAmountModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [addAmount, setAddAmount] = useState({ nameOfSource: "", amount: 0 });
  const [expenseInfo, setExpenseInfo] = useState({ expensePurpose: "", description: "", amount: 0 });

  const handleAddAmountSubmit = (e) => {
    e.preventDefault();
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const values = [
    { money: 25000, name: "Total Earned", color: "#2979ff" },
    { money: 12500, name: "Total Expense", color: "#e91e63" },
    { money: 5000, name: "Total Save", color: "#00c853" },
  ];
  const { id } = useParams();
  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" mb={4}>
          <Typography variant="h4" color="primary" className={classes.month}>
            January 2020
          </Typography>
        </Box>
        <Grid container spacing={4} alignItems="center">
          {values.map((v) => (
            <Grid item xs={12} md={4} key={v.name}>
              <Card>
                <CardContent>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <Typography variant="h3"> {v.money.toLocaleString()} </Typography>
                    <Typography variant="h6" style={{ color: `${v.color}` }}>
                      {v.name}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
          <AddMoneyHistoryTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ExpenseHistoryTable />
        </TabPanel>

        {/* ADD AMOUNT MODAL */}
        <Dialog open={addAmountModal} onClose={() => setAddAmountModal(false)} aria-labelledby="form-dialog-title">
          <form onSubmit={handleAddAmountSubmit}>
            <DialogTitle id="form-dialog-title">Add Monthly Amount</DialogTitle>
            <DialogContent>
              <DialogContentText>You can add monthly amount from which the expenditure money will be deducted. </DialogContentText>
              <TextField autoFocus margin="normal" variant="outlined" name="source" label="Money Source" required fullWidth />
              <TextField margin="normal" variant="outlined" name="amount" label="Amount" type="number" required fullWidth />
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
          <form onSubmit={handleAddAmountSubmit}>
            <DialogTitle id="form-dialog-title">Add Expense Info</DialogTitle>
            <DialogContent>
              <DialogContentText>You can add monthly expense from here. </DialogContentText>
              <TextField autoFocus margin="normal" variant="outlined" name="purpose" label="Expense Purpose" required fullWidth />
              <TextField margin="normal" variant="outlined" name="description" label="Description" fullWidth />
              <TextField margin="normal" variant="outlined" name="amount" label="Amount" type="number" required fullWidth />
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
