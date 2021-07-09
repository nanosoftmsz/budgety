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
  Card,
  CardContent,
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
  const [finalValue, setFinalValue] = useState({ amount: 0, msg: "No transaction yet" });
  const [transactionDetails, setTransactionDetails] = useState([]);

  // FUNCTIONS
  const handleChange = (e) => setTransactionInfo({ ...transactionInfo, [e.target.name]: e.target.value });

  const getDetailsTransactionInfo = () => {
    axios
      .get(`/persons/${localStorage.getItem("userId")}/${id}`, bearerToken)
      .then((res) => {
        console.log(res);
        setTransactionDetails(res.data.data);
        if (res.data.data.owned > res.data.data.debt) {
          setFinalValue({ amount: res.data.data.owned - res.data.data.debt, msg: `You'll get ${res.data.data.owned - res.data.data.debt}/- from ${res.data.data.name} ` });
        } else if (res.data.data.debt > res.data.data.owned) {
          setFinalValue({ amount: res.data.data.debt - res.data.data.owned, msg: `${res.data.data.name}'ll get ${res.data.data.debt - res.data.data.owned}/- from you ` });
        } else if (res.data.data.debt === res.data.data.owned) {
          setFinalValue({ amount: 0, msg: `No owned or debt` });
        }
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
        if (err.response.data?.message) {
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

        <Grid container spacing={3} className={classes.section} justify="center">
          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Typography variant="h3"> {transactionDetails.owned?.toLocaleString()} </Typography>
                  <Typography variant="h6" style={{ color: "#00b500" }}>
                    Total Owned
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Typography variant="h3"> {transactionDetails.debt?.toLocaleString()} </Typography>
                  <Typography variant="h6" style={{ color: "#EA1111" }}>
                    Total Debt
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Typography variant="h3"> {finalValue.amount?.toLocaleString()} </Typography>
                  <Typography variant="h6">{finalValue.msg}</Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
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
