import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Notification from "../../components/Common/Notification";
import { UserContext } from "../../context/UserContext";
import { bearerToken } from "../../utils/constant";
import moment from "moment";
import axios from "axios";
import ConfirmDialog from "../Common/ConfirmDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ExpenseHistoryTable({ expenseHistory, fetchData }) {
  const classes = useStyles();
  const { loading, setLoading, setOpenConfirmModal } = useContext(UserContext);

  // STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowInfo, setRowInfo] = useState();
  const [infoInModal, setInfoInModal] = useState({ id: "", expensePurpose: "", description: "", amount: 0 });

  // FUNCTIONS
  const handleChange = (e) => setInfoInModal({ ...infoInModal, [e.target.name]: e.target.value });

  const getInfoInModal = (value) => {
    console.log(value);
    setIsModalOpen(true);
    setInfoInModal({ id: value._id, expensePurpose: value.purpose, description: value.description, amount: value.amount });
  };

  const submitEditedInfo = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .patch(`/expense-histories/${infoInModal.id}`, { purpose: infoInModal.expensePurpose, description: infoInModal.description, amount: infoInModal.amount * 1 }, bearerToken)
      .then((res) => {
        Notification("Success", "Information updated successfully", "success");
        fetchData();
      })
      .catch((err) => {
        if (err.response.data?.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      })
      .finally(() => setIsModalOpen(false), setLoading(false));
  };

  const deleteRow = (value) => {
    console.log(value);
    setOpenConfirmModal(true);
    setRowInfo(value);
  };

  const confirmDelete = () => {
    console.log("called");
    console.log(rowInfo);
    axios
      .delete(`expense-histories/${rowInfo._id}`, bearerToken)
      .then(() => {
        Notification("Success", "Your information has been deleted!", "success");
        fetchData();
      })
      .catch((err) => {
        if (err.response.data?.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <caption>Number of row count {expenseHistory?.length} </caption>
          <TableHead>
            <TableRow>
              <TableCell>Purpose</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Amount&nbsp;</TableCell>
              <TableCell align="right">Added Date&nbsp;</TableCell>
              <TableCell align="right">Action&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseHistory?.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.purpose}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{moment(row.createAt).format("LLL")}</TableCell>
                <TableCell align="right">
                  <Grid container justify="flex-end" alignItems="center">
                    <IconButton aria-label="delete" className={classes.margin} color="primary" onClick={() => getInfoInModal(row)}>
                      <EditRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" className={classes.margin} color="secondary" onClick={() => deleteRow(row)}>
                      <DeleteRoundedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="form-dialog-title">
        <form onSubmit={submitEditedInfo}>
          <DialogTitle id="form-dialog-title">Edit Expense Info</DialogTitle>
          <DialogContent>
            <DialogContentText>You can edit monthly expense from here. </DialogContentText>
            <TextField autoFocus margin="normal" variant="outlined" name="expensePurpose" label="Expense Purpose" required fullWidth value={infoInModal.expensePurpose} onChange={handleChange} />
            <TextField margin="normal" variant="outlined" name="description" label="Description" fullWidth value={infoInModal.description} onChange={handleChange} />
            <TextField margin="normal" variant="outlined" name="amount" label="Amount" type="number" required fullWidth value={infoInModal.amount} onChange={handleChange} />
            <small>* indicates required field</small>
          </DialogContent>
          <DialogActions>
            <Button size="small" onClick={() => setIsModalOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button size="small" variant="contained" disableElevation type="submit" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="primary" /> : "Update Info"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmDialog willBeDeleted={confirmDelete} />
    </div>
  );
}
