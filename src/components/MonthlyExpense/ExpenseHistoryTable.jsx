import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { Paper, Grid, IconButton } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ExpenseHistoryTable({ expenseHistory }) {
  const classes = useStyles();

  return (
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
                  <IconButton aria-label="delete" className={classes.margin} color="primary">
                    <EditRoundedIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="delete" className={classes.margin} color="secondary">
                    <DeleteRoundedIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
