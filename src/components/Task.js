import { Button, Grid, Typography, IconButton } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState, useCallback, useEffect } from "react";
import Table from "./Tasks/Table";
import mock from "./mockData/mock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import AddTask from "./Tasks/AddTask";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
// import CreateTable from "./CreateTable";

function Task() {
  const [loadState, setLoadState] = useState(false);

  function bttOnClick() {
    console.log("Click");
    setLoadState(false);
    setDataAdd(true);
  }

  const addTask = () => {
    {
      return (
        <Box>
          <IconButton onClick={() => backHandler()}>
            <ArrowBackIcon></ArrowBackIcon>
          </IconButton>
          <AddTask />
        </Box>
      );
    }
  };

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

        <Container>
          <Button
            variant="contained"
            onClick={() => {
              bttOnClick();
            }}
          >
            Add new Task
          </Button>
        </Container>
      </Box>
    );
  }

  const [data, setData] = useState();

  const backHandler = () => {
    setLoadState(true);
    setDataAdd(false);
  };

  const [dataAdd, setDataAdd] = useState(false);
  const getTask = useCallback(async () => {
    const data = (await getDocs(collection(db, "Task"))).docs;
    const taskList = [];
    data.forEach((ele) => {
      const item = ele.data();
      item.id = ele.id;
      if (item.taskStatus != "archived") taskList.push(item);
    });
    setData(taskList);

    if (taskList != null) {
      setLoadState(true);
    }
    // console.log(loadState);
  }, []);

  useEffect(() => {
    getTask();
  }, [getTask]);
  console.log(loadState);

  return (
    <Container>
      {dataAdd && addTask()}
      {loadState && <CreateTable data={data} setData={setData} />}
    </Container>
  );
}

export default Task;
