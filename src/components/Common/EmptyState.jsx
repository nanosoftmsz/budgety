import React from "react";
import { Typography } from "@material-ui/core";
import InboxRoundedIcon from "@material-ui/icons/InboxRounded";

export default function EmptyState({ msg }) {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <InboxRoundedIcon style={{ fontSize: "3rem", color: "#607d8b", marginBottom: "1rem" }} />
        <Typography variant="h6">{msg}</Typography>
      </div>
    </div>
  );
}
