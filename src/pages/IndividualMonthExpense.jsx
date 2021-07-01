import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Container, CssBaseline, Grid, Card, CardContent, Button, Dialog, DialogContent, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
  },

  mt: {
    marginTop: theme.spacing(2),
  },

  mr: {
    marginRight: theme.spacing(2),
  },

  section: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
}));
export default function IndividualMonthExpense() {
  const classes = useStyles();
  const values = [
    { money: 25000, name: "Total Earned", color: "#2979ff" },
    { money: 12500, name: "Total Expense", color: "#e91e63" },
    { money: 5000, name: "Total Save", color: "#00c853" },
  ];
  const { id } = useParams();
  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.root}>
        <CssBaseline />
        <Box display="flex" justifyContent="center" mb={4}>
          <Typography variant="h4" color="primary">
            January 2020
          </Typography>
        </Box>
        <Grid container spacing={4} alignItems="center">
          {values.map((v) => (
            <Grid item xs={12} md={4} key={v.name}>
              <Card>
                <CardContent>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <Typography variant="h3"> {v.money.toLocaleString()} </Typography>
                    <Typography variant="h6" style={{ color: `${v.color}` }}>
                      {v.name}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container justify="flex-end" className={classes.section}>
          <Button variant="outlined" color="primary" className={classes.mr}>
            Add Amount
          </Button>
          <Button variant="contained" color="primary" disableElevation>
            Add Expenditure
          </Button>
        </Grid>
      </Container>
    </div>
  );
}
