import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: theme.spacing(1),
  },
}));

export default function IndividualMonthCard({ info }) {
  const classes = useStyles();
  return (
    <div>
      <Link to={`/monthly-expenditure/${info._id}`}>
        <Card>
          <CardContent>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="h6">{info.name}</Typography>
              </Grid>
              <Grid item>
                <ArrowRightAltRoundedIcon fontSize="large" className={classes.mt} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
