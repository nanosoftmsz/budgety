import React, { useState, useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";

export default function ConfirmDialog({ willBeDeleted }) {
  const { openConfirmModal, setOpenConfirmModal } = useContext(UserContext);
  const confirmDelete = () => {
    willBeDeleted();
    setOpenConfirmModal(false);
  };
  return (
    <div>
      <Dialog open={openConfirmModal} onClose={() => setOpenConfirmModal(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle>Your data will be deleted</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once deleted you can't retrieve this information again. Are you sure you want to <strong> delete </strong>the following information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
