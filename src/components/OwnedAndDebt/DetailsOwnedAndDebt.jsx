import React, { useState } from "react";
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
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import { makeStyles } from "@material-ui/core/styles";
import TransactionTable from "./TransactionTable";

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
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState({ amount: 0, type: "given" });

  const handleChange = (e) => setTransactionInfo({ ...transactionInfo, [e.target.name]: e.target.value });

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />

        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="body1">Transaction with</Typography>
          <Typography variant="h3">Zubayer Himel</Typography>
        </Grid>

        <Grid container justify="flex-start" className={classes.section}>
          <Button variant="contained" color="primary" disableElevation endIcon={<AddCircleOutlineRoundedIcon />} onClick={() => setTransactionModal(true)}>
            Add Transaction
          </Button>
        </Grid>

        <Grid container className={classes.section}>
          <Grid item xs={12}>
            <TransactionTable />
          </Grid>
        </Grid>

        <Dialog open={transactionModal} onClose={() => setTransactionModal(false)} aria-labelledby="form-dialog-title">
          <form onSubmit={handleTransactionSubmit}>
            <DialogTitle id="form-dialog-title">Add Transaction</DialogTitle>
            <DialogContent>
              <DialogContentText>You can add either owned or debt type of transaction with the respective person.</DialogContentText>
              <TextField autoFocus variant="outlined" margin="normal" label="Amount" type="number" required fullWidth onChange={handleChange} />
              <RadioGroup name="type" value={transactionInfo.type} onChange={handleChange}>
                <FormControlLabel value="given" control={<Radio color="primary" />} label="Money Given" />
                <FormControlLabel value="taken" control={<Radio color="primary" />} label="Money Taken" />
              </RadioGroup>
              <small>* indicates required field</small>
            </DialogContent>
            <DialogActions>
              <Button size="small" onClick={() => setTransactionModal(false)} color="secondary">
                Cancel
              </Button>
              <Button size="small" type="submit" color="primary" disableElevation variant="contained">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </div>
  );
}
