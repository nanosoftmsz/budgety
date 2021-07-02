import React from "react";
import { Container, Grid, Paper, Typography, CssBaseline, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },
  title: {
    fontWeight: 500,
  },
}));

export default function OwnedAndDebt() {
  const classes = useStyles();
  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" mb={4}>
          <Typography variant="h4" color="primary" className={classes.title}>
            List of Owned / Debt
          </Typography>
        </Box>
        <Grid container mt={4}></Grid>
      </Container>
    </div>
  );
}
