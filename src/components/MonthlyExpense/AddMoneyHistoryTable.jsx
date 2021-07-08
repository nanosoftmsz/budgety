import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Grid,
  IconButton,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ConfirmDialog from "../../components/Common/ConfirmDialog";
import Notification from "../../components/Common/Notification";
import { bearerToken } from "../../utils/constant";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function AddMoneyHistoryTable({ addHistory, fetchData }) {
  const classes = useStyles();
  const { loading, setLoading, setOpenConfirmModal } = useContext(UserContext);

  // STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowInfo, setRowInfo] = useState();
  const [infoInModal, setInfoInModal] = useState({ id: "", nameOfSource: "", amount: 0 });

  // FUNCTIONS
  const handleChange = (e) => setInfoInModal({ ...infoInModal, [e.target.name]: e.target.value });

  const getInfoInModal = (value) => {
    setIsModalOpen(true);
    setInfoInModal({ id: value._id, nameOfSource: value.source, amount: value.amount });
  };

  const submitEditedInfo = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .patch(`/income-histories/${infoInModal.id}`, { source: infoInModal.nameOfSource, amount: infoInModal.amount * 1 }, bearerToken)
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
      .delete(`income-histories/${rowInfo._id}`, bearerToken)
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
          <caption>Number of row count {addHistory?.length}</caption>
          <TableHead>
            <TableRow>
              <TableCell>Money Source</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Added Date&nbsp;</TableCell>
              <TableCell align="right">Action&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addHistory?.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.source}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{moment(row.createAt).format("LLL")}</TableCell>
                <TableCell align="right">
                  <Grid container justify="flex-end" alignItems="center">
                    <IconButton aria-label="delete" color="primary" onClick={() => getInfoInModal(row)}>
                      <EditRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" color="secondary" onClick={() => deleteRow(row)}>
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
          <DialogTitle id="form-dialog-title">Edit Monthly Amount</DialogTitle>
          <DialogContent>
            <DialogContentText>You can edit monthly amount from which the expenditure money will be deducted. </DialogContentText>
            <TextField autoFocus margin="normal" variant="outlined" name="nameOfSource" label="Money Source" required fullWidth value={infoInModal.nameOfSource} onChange={handleChange} />
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
