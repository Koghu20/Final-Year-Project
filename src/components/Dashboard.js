import * as Muicon from "@mui/icons-material";

import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Bar,
  Legend,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
  BarChart,
} from "recharts";
import React, { useState, useEffect, useCallback } from "react";
import mock from "./mockData/mock";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
// import FmdBadIcon from "@mui/icons-material/FmdBad";
import App from "../App";

const taskStatus = {
  assigned: 0,
  ongoing: 0,
  open: 0,
  attention: 0,
  completed: 0,
  urgent: 0,
  normal: 0,
};

const taskList = [];

const Color = ["#2ca02c", "#1f77b4"];

function PieChartF({ title, val1 }) {
  const dat = [
    { name: "Group A", value: taskStatus[val1] },
    { name: "Group B", value: taskList.length },
  ];
  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h5">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={144}>
        <PieChart>
          <Pie data={dat} innerRadius={30} outerRadius={50} dataKey="value">
            {dat.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={Color[index]} />
            ))}
          </Pie>
          <text x={108} y={75} textAnchor="middle" dominantBaseline="middle">
            {dat[0].value}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
}

function StatBox({ ico, title, val }) {
  const Icon = Muicon[ico];

  return (
    <Paper elevation={8} sx={{ flex: 1, m: 2, borderRadius: "10px" }}>
      <Grid container paddingBottom={2} spacing={2}>
        <Grid item>
          <Box paddingLeft={3}>
            <Icon sx={{ paddingTop: "40%" }} fontSize="large" />
          </Box>
        </Grid>
        <Grid item>
          <Box paddingRight={3}>
            <Typography variant="h5">{title}</Typography>
            <Box>
              <Typography variant="h6" align="center">
                {val}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

function getAvailableWorker(va) {
  const userCol = collection(db, "users");
  let data = 0;
  const que = query(userCol, where("status", "==", va));
  const [docs, loading, error] = useCollectionData(que);
  if (!loading) {
    data = docs.length;
  }
  return data;
}

function Dashboard() {
  const [state, setState] = useState([]);

  const getTask = useCallback(async () => {
    const data = (await getDocs(collection(db, "Task"))).docs;

    const state = mock.bc;
    data.forEach((ele) => {
      const item = ele.data();
      taskList.push(item);
      if (item.priority == "Urgent" && item.taskStatus != "completed")
        ++taskStatus["urgent"];
      if (item.priority == "Normal" && item.taskStatus != "completed")
        ++taskStatus["normal"];
      if (state[item.state] != undefined) ++state[item.state];
      if (taskStatus[item.taskStatus] != undefined)
        ++taskStatus[item.taskStatus];
      else console.log(state[item.state]);
    });

    // console.log(taskList[0].skill);
    const finalResults = [];
    for (const [state, count] of Object.entries(state))
      finalResults.push({ state, count });
    setState(finalResults);
  }, []);

  useEffect(() => {
    // Dashboard();
  }, [taskStatus]);
  useEffect(() => {
    getTask();
  }, [getTask]);

  return (
    <Container maxWidth="lg">
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid container spacing={4}>
          <Grid item>
            <StatBox
              ico="Engineering"
              title="Available Workers     "
              val={getAvailableWorker("active")}
            />
          </Grid>
          <Grid item>
            <StatBox
              ico="Work"
              title="Workers on Site    "
              val={getAvailableWorker("busy")}
            />
          </Grid>
          <Grid item>
            <StatBox
              ico="Task"
              title=" Tasks Today  "
              val={
                taskStatus["assigned"] +
                taskStatus["ongoing"] +
                taskStatus["attention"]
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Container sx={{ paddingTop: "3%", paddingBottom: "2%" }}>
        <Typography paddingBottom={"3%"} variant="h5" color="text">
          Monthly Breakdown Count
        </Typography>
        <BarChart width={1000} height={250} data={state}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </Container>
      <Container>
        {/* <BarChart /> */}
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <PieChartF title="Normal Tasks" val1="normal" />
          </Grid>
          <Grid item xs={3}>
            <PieChartF title="Ongoing Tasks" val1="ongoing" />
          </Grid>
          <Grid item xs={3}>
            <PieChartF title="Urgent Tasks" val1="urgent" />
          </Grid>
          <Grid item xs={3}>
            <PieChartF title="Requires Attention" val1="attention" />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default Dashboard;
