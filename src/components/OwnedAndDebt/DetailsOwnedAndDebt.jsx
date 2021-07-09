import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  CssBaseline,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  TextField,
  RadioGroup,
  CircularProgress,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { makeStyles } from "@material-ui/core/styles";
import { bearerToken } from "../../utils/constant";
import Notification from "../../components/Common/Notification";
import EmptyState from "../Common/EmptyState";
import TransactionTable from "./TransactionTable";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
  section: {
    marginTop: theme.spacing(4),
  },
}));

export default function DetailsOwnedAndDebt() {
  const classes = useStyles();
  const { id } = useParams();
  const { loading, setLoading } = useContext(UserContext);

  // STATES
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState({ amount: 0, type: "Owned" });
  const [transactionDetails, setTransactionDetails] = useState([]);

  // FUNCTIONS
  const handleChange = (e) => setTransactionInfo({ ...transactionInfo, [e.target.name]: e.target.value });

  const getDetailsTransactionInfo = () => {
    axios
      .get(`/persons/${localStorage.getItem("userId")}/${id}`, bearerToken)
      .then((res) => {
        console.log(res);
        setTransactionDetails(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      });
  };

  useEffect(() => {
    getDetailsTransactionInfo();
  }, []);

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/owned-debts", { type: transactionInfo.type, amount: transactionInfo.amount * 1, user: localStorage.getItem("userId"), person: id }, bearerToken)
      .then(() => {
        Notification("Success", "Transaction info created successfully", "success");
        getDetailsTransactionInfo();
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      })
      .finally(() => {
        setTransactionModal(false);
        setLoading(false);
        setTransactionInfo({ amount: 0, type: "Owned" });
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />

        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="body1">Transaction with</Typography>
          <Typography variant="h3"> {transactionDetails.name} </Typography>
          <br />
          <Typography variant="subtitle1"> {transactionDetails.phone} </Typography>
        </Grid>

        <Grid container justify="flex-start" className={classes.section}>
          <Button variant="contained" color="primary" disableElevation endIcon={<AddCircleOutlineRoundedIcon />} onClick={() => setTransactionModal(true)}>
            Add Transaction
          </Button>
        </Grid>

        <Grid container className={classes.section}>
          <Grid item xs={12}>
            {transactionDetails.OwnedDebt?.length !== 0 ? <TransactionTable dateWiseInfo={transactionDetails.OwnedDebt} /> : <EmptyState msg="No transaction found with the person" />}
          </Grid>
        </Grid>

        <Dialog open={transactionModal} onClose={() => setTransactionModal(false)} aria-labelledby="form-dialog-title">
          <form onSubmit={handleTransactionSubmit}>
            <DialogTitle id="form-dialog-title">Add Transaction</DialogTitle>
            <DialogContent>
              <DialogContentText>You can add either owned or debt type of transaction with the respective person.</DialogContentText>
              <TextField autoFocus variant="outlined" margin="normal" label="Amount" type="number" name="amount" value={transactionInfo.amount} required fullWidth onChange={handleChange} />
              <RadioGroup name="type" value={transactionInfo.type} onChange={handleChange}>
                <FormControlLabel value="Owned" control={<Radio color="primary" />} label="Money Given" />
                <FormControlLabel value="Debt" control={<Radio color="primary" />} label="Money Taken" />
              </RadioGroup>
              <small>* indicates required field</small>
            </DialogContent>
            <DialogActions>
              <Button size="small" onClick={() => setTransactionModal(false)} color="secondary">
                Cancel
              </Button>
              <Button size="small" type="submit" color="primary" disableElevation variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} color="primary" /> : "Submit"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </div>
  );
}
