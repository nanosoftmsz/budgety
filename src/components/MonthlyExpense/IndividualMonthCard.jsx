import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: theme.spacing(1),
  },
}));

export default function IndividualMonthCard() {
  const classes = useStyles();
  return (
    <div>
      <Link to="/monthly-expenditure/5">
        <Card>
          <CardContent>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h6">January 2020</Typography>
              </Grid>
              <Grid item>
                <ArrowRightAltIcon fontSize="large" className={classes.mt} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
