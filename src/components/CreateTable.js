import React from "react";
import { Box, Container } from "@mui/system";
import Table from "./Tasks/Table";
import { Button, Typography } from "@mui/material";

function CreateTable(data, setData) {
  // console.log
  return (
    <Box>
      <Container sx={{ paddingBottom: "2%" }}>
        <Typography sx={{ paddingBottom: "2%" }} variant="h3">
          Task Manager
        </Typography>
        <Table data={data} setData={setData} />
      </Container>
      <Container item>
        <Button variant="contained">Add new Task</Button>
      </Container>
    </Box>
  );
}

export default CreateTable;
