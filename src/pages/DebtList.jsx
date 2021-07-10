import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, CssBaseline, Box, Typography } from "@material-ui/core";
import Notification from "../components/Common/Notification";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    marginTop: theme.spacing(6),
  },
}));

export default function DebtList() {
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`/dashboard/debt/${localStorage.getItem("userId")}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      });
  }, []);

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      <CssBaseline />
      <Box display="flex" justifyContent="center" mb={3}>
        <Typography variant="h4">Debt Person List</Typography>
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
                <TableCell>{row.name}</TableCell>
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
