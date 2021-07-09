import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ dateWiseInfo }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <caption>Number of row count {dateWiseInfo?.length} </caption>
        <TableHead>
          <TableRow>
            <TableCell>Transaction Date</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Given</TableCell>
            <TableCell align="right">Taken</TableCell>
            <TableCell align="right">Total Given</TableCell>
            <TableCell align="right">Total Taken</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dateWiseInfo?.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {moment(row.createAt).format("LLL")}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.givenAmount}</TableCell>
              <TableCell align="right">{row.takenAmount}</TableCell>
              <TableCell align="right">{row.dateWiseTotalGiven}</TableCell>
              <TableCell align="right">{row.dateWiseTotalTaken}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
