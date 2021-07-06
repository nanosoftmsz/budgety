import React from "react";
import { Container, Grid, Button, CssBaseline, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import not_found from "../assets/img/not_found.svg";

export default function PageNotFound() {
  return (
    <div>
      <Container component="main" maxWidth="sm" style={{ marginTop: "4rem" }}>
        <CssBaseline />
        <Grid container direction="column" alignItems="center" justify="center">
          <img src={not_found} alt="page not found" style={{ height: "50vh" }} />
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={3}>
            <Typography variant="h5">Sorry. Your requested page is not found!</Typography>
            <Link to="/">
              <Button variant="contained" color="primary" style={{ marginTop: "2rem" }}>
                Take me to home
              </Button>
            </Link>
          </Box>
        </Grid>
      </Container>
    </div>
  );
}
