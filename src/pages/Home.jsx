import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HeroSection from "../components/Home/HeroSection";
import FeatureSummaryCard from "../components/Home/FeatureSummaryCard";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(3),
  },
  title: {
    fontWeight: 800,
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <Container component="main" maxWidth="lg" className={classes.content}>
        <CssBaseline />
        <HeroSection />
        <FeatureSummaryCard />
      </Container>
    </div>
  );
}
