import React from "react";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {"Copyright © Barley Cottage Bakery "}

      {new Date().getFullYear()}
    </Typography>
  );
}
