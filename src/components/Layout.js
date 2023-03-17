import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import Step1 from "./ProgressSteps/Step1";

function Layout() {
  return (
    <Container maxWidth="sm" sx={{ mt: 1 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Step1 />
      </Paper>
    </Container>
  );
}

export default Layout;
