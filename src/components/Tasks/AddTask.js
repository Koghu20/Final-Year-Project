import {
  Button,
  Box,
  InputLabel,
  Select,
  TextField,
  Typography,
  MenuItem,
  Grid,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useCallback } from "react";
import axios from "axios";
import "firebase/firestore";
import ShowVal from "./ShowVal";

function AddTask() {
  const [status, setStatus] = useState("open");
  const [skill, setSkill] = useState("Maintenance");
  const [priority, setPriority] = useState("Normal");
  const [state, setState] = useState("Selangor");
  const [open, setOpen] = useState(false);
  const [submitVal, setSubmitVal] = useState();
  const [autoAss, setAutoAssign] = useState("On");
  const [manA, setManA] = useState(false);
  const [manUse, setManUse] = useState();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSkillChange = (event) => {
    setSkill(event.target.value);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleAutoAss = (event) => {
    setAutoAssign(event.target.value);
    console.log(event.target.value);
    if (event.target.value == "Off") setManA(true);
    else setManA(false);
  };

  const handleManU = (event) => {
    setManUse(event.target.value);
  };

  const dialogBox = () => {};

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitVal({
      taskName: data.get("tName"),
      location: data.get("location"),
      city: data.get("city"),
      date: data.get("date"),
      breakdown: data.get("breakdown"),
      status: data.get("status"),
      priority: data.get("priority"),
      autoA: data.get("autoA"),
      manU: data.get("manU"),
    });
    // console.log(submitVal)
    setOpen(!open);
    // name: data.get("tName");
    // breakdown: data.get("breakdown");
  };

  return (
    <Box component="div">
      <Container>
        <Typography variant="h5">Add Task</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ width: "400px", margin: "5px" }}
            name="tName"
            type="text"
            label="Task Name"
            variant="outlined"
            required
          />
          <br />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            name="location"
            type="text"
            label="location"
            variant="outlined"
            required
          />
          <br />

          <InputLabel>State</InputLabel>
          <Select
            autoWidgth
            value={state}
            name="city"
            label="State"
            required
            onChange={handleStateChange}
          >
            <MenuItem value={"Melaka"}>Melaka</MenuItem>
            <MenuItem value={"Selangor"}>Selangor</MenuItem>
            <MenuItem value={"Perak"}>Perak</MenuItem>
            <MenuItem value={"Negeri Sembilan"}>Negeri Sembilan</MenuItem>
            <MenuItem value={"Pahang"}>Pahang</MenuItem>
            <MenuItem value={"Terrenganu"}>Terrenganu</MenuItem>
            <MenuItem value={"Kuala Lumpur"}>Kuala Lumur</MenuItem>
          </Select>
          <br />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            name="date"
            type="date"
            // label="Date"
            required
            variant="outlined"
          >
            Date
          </TextField>
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid item>
              <InputLabel>Breakdown</InputLabel>
              <Select
                autoWidgth
                value={skill}
                name="breakdown"
                label="breakdown"
                required
                onChange={handleSkillChange}
              >
                <MenuItem value={"Breakdown"}>Breakdown</MenuItem>
                <MenuItem value={"Expert"}>Expert</MenuItem>
                <MenuItem value={"Maintenance"}>Maintenance</MenuItem>
                <MenuItem value={"Unknown"}>Unknown</MenuItem>
                <MenuItem value={"Towing"}>Towing</MenuItem>
                <MenuItem value={"Troubleshooting"}>Troubleshooting</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <InputLabel>Status</InputLabel>
              <Select
                autoWidgth
                value={status}
                name="status"
                label="Status"
                required
                onChange={handleStatusChange}
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"assigned"}>Assigned</MenuItem>
                <MenuItem value={"attention"}>Attention</MenuItem>
                <MenuItem value={"open"}>Open</MenuItem>
                <MenuItem value={"completed"}>Completed</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <InputLabel>Priority</InputLabel>
              <Select
                autoWidgth
                value={priority}
                name="priority"
                label="priority"
                required
                onChange={handlePriorityChange}
              >
                <MenuItem value={"Urgent"}>Urgent</MenuItem>
                <MenuItem value={"Normal"}>Normal</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <InputLabel>Auto Assigning</InputLabel>
              <Select
                autoWidgth
                value={autoAss}
                name="autoA"
                label="autoA"
                required
                onChange={handleAutoAss}
              >
                <MenuItem value={"On"}>On</MenuItem>
                <MenuItem value={"Off"}>Off</MenuItem>
              </Select>
            </Grid>
            {manA && (
              <Grid item>
                <InputLabel>Manual Assigning</InputLabel>
                <Select
                  autoWidgth
                  value={manUse}
                  name="manU"
                  label="manU"
                  required
                  onChange={handleManU}
                >
                  <MenuItem value={"ahmadAli"}>ahmadAli</MenuItem>
                  <MenuItem value={"rajman"}>rajman</MenuItem>
                  <MenuItem value={"test01"}>test01</MenuItem>
                  <MenuItem value={"test02"}>test02</MenuItem>
                  <MenuItem value={"test03"}>test03</MenuItem>
                </Select>
              </Grid>
            )}
          </Grid>
          <br />
          <br />
          <Button type="submit" variant="contained" color="primary">
            save
          </Button>
        </form>
      </Container>
      {open && <ShowVal data={submitVal} />}
    </Box>
  );
}

export default AddTask;
