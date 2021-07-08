import React, { useState } from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import zxcvbn from "zxcvbn";

export default function PasswordStrengthMeter({ password }) {
  const result = zxcvbn(password);
  const num = (result.score * 100) / 4;

  const progressLabel = () => {
    switch (result.score) {
      case 0:
        return "Very weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  const progressColor = () => {
    switch (result.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#f57f17";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  return (
    <div>
      <Grid container justify="flex-end" alignItems="center">
        <CircularProgress size={34} variant="determinate" value={num} style={{ color: `${progressColor()}` }} />
        <Typography variant="body2" style={{ marginLeft: "8px", color: `${progressColor()}` }}>
          Your password is {progressLabel()}
        </Typography>
      </Grid>
    </div>
  );
}
