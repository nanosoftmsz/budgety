import React from "react";
import { Card, CardContent, Button, IconButton, Typography, Box, Grid, Tooltip } from "@material-ui/core";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";

const useStyles = makeStyles((theme) => ({
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

export default function SingleCard() {
  const classes = useStyles();

  return (
    <div>
      <Link to="owned-and-debt/5">
        <Card>
          <CardContent className={classes.card}>
            <Grid container alignItems="center" justify="center">
              <Grid item xs={12} sm={6} md={5}>
                <Typography variant="subtitle1">Zubayer Himel</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle1">01955377998</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Box display="flex" justifyContent="space-around" alignItems="center">
                  <Tooltip title="Owned">
                    <Button size="large" endIcon={<ArrowDropUpRoundedIcon fontSize="large" className={classes.arrowUp} />}>
                      3299
                    </Button>
                  </Tooltip>
                  <Tooltip title="Debt">
                    <Button size="large" endIcon={<ArrowDropDownRoundedIcon fontSize="large" className={classes.arrowDown} />}>
                      2344
                    </Button>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={1}>
                <Box display="flex" justifyContent="flex-end" alignItems="center">
                  <IconButton aria-label="right">
                    <KeyboardArrowRightRoundedIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
