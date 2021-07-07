import React from "react";
import { CircularProgress } from "@material-ui/core";

export default function LoadingState() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    </div>
  );
}
