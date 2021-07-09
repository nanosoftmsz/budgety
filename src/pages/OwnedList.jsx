import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, CssBaseline, Box, Typography } from "@material-ui/core";
import { bearerToken } from "../utils/constant";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    marginTop: theme.spacing(6),
  },
}));

export default function OwnedList() {
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`/dashboard/owned/${localStorage.getItem("userId")}`, bearerToken)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      <CssBaseline />
      <Box display="flex" justifyContent="center" mb={3}>
        <Typography variant="h4">Owned Person List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <caption>Number of row count {data?.length} </caption>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.phone}>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
