import React, { useState } from "react";
import { Container, Grid, Typography, CssBaseline, Box, TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import SingleCard from "../components/OwnedAndDebt/SingleCard";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
  title: {
    fontWeight: 500,
  },
  mt: {
    marginTop: theme.spacing(6),
  },
  card: {
    paddingBottom: "16px !important",
  },
  arrowUp: {
    color: "#64dd17",
  },
  arrowDown: {
    color: "#e53935",
  },
}));

export default function OwnedAndDebt() {
  const classes = useStyles();
  const [addPersonModal, setAddPersonModal] = useState(false);
  const [personInfo, setPersonInfo] = useState({ name: "", phone_number: "" });

  const handleChange = (e) => setPersonInfo({ ...personInfo, [e.target.name]: e.target.value });

  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" mb={4}>
          <Typography variant="h4" color="primary" className={classes.title}>
            List of Owned / Debt
          </Typography>
        </Box>
        <Grid container spacing={2} justify="space-between">
          <Button variant="contained" color="primary" disableElevation endIcon={<AddCircleOutlineRoundedIcon />} onClick={() => setAddPersonModal(true)}>
            Add new person
          </Button>
          <TextField
            type="search"
            variant="outlined"
            size="small"
            placeholder="Search by name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid container spacing={2} direction="column" justify="center" className={classes.mt}>
          <Grid item xs={12}>
            <SingleCard />
          </Grid>
        </Grid>

        {/* ADD PERSON MODAL */}
        <Dialog open={addPersonModal} onClose={() => setAddPersonModal(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Person</DialogTitle>
          <DialogContent>
            <DialogContentText>Here you can add person with whom you have done any kind of transactions either owned or debts.</DialogContentText>
            <TextField autoFocus variant="outlined" margin="normal" label="Person Name" name="name" required fullWidth onChange={handleChange} />
            <TextField variant="outlined" margin="normal" label="Phone Number" name="phone_number" required fullWidth onChange={handleChange} />
            <small>* indicates required field</small>
          </DialogContent>
          <DialogActions>
            <Button size="small" onClick={() => setAddPersonModal(false)} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" size="small" disableElevation onClick={() => setAddPersonModal(false)} color="primary">
              Create Person
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}
