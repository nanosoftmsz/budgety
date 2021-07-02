import React from "react";
import { Container, Grid, Typography, CssBaseline, Box, TextField, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" mb={4}>
          <Typography variant="h4" color="primary" className={classes.title}>
            List of Owned / Debt
          </Typography>
        </Box>
        <Grid container justify="flex-end">
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
      </Container>
    </div>
  );
}
