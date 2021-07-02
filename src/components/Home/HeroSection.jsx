import React from "react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import hero_svg from "../../assets/img/hero-svg.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 800,
  },
}));

export default function HeroSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <Grid container spacing={4} direction="row" alignItems="center">
        <Grid item xs={12} md={6}>
          <Box mb={4}>
            <Typography variant="h2" color="primary" className={classes.title}>
              BUDGETY
            </Typography>
          </Box>
          <Box mb={6}>
            <Typography variant="h5">A secure and easy way to track your expenses</Typography>
          </Box>
          <Link to="/login">
            <Button size="large" disableElevation variant="contained" color="primary">
              Get Started
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={hero_svg} alt="finance" />
        </Grid>
      </Grid>
    </div>
  );
}
