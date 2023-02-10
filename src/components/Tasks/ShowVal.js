import {
  Icon,
  Button,
  IconButton,
  Backdrop,
  Dialog,
  Transition,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { db, dbd } from "../../firebase";
import { collection, where, query, getDocs } from "firebase/firestore";
import { onValue, ref } from "firebase/database";
import axios from "axios";
import { addDoc } from "firebase/firestore";
import { Done } from "@mui/icons-material";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

function ShowVal(submitVal) {
  //   console.log(submitVal.data.location);
  //   const useData = [];
  const locList = [];
  // console.log(submitVal.data.autoA);
  const [chUser, setChUser] = useState("");
  const [chDist, setChDist] = useState("");
  const [chTime, setChTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const priority = submitVal.data.priority;
  const API_KEY = "3cf66de1-a959-4830-9ee8-cdd16b6a92ee	";
  let nav = useNavigate();
  // const TO_LOCATION = ;

  const getUser = useCallback(async () => {
    const data = (await getDocs(collection(db, "users"))).docs;
    const filtUser = [];
    let cUser = "Waiting";

    await data.forEach((ele) => {
      const item = ele.data();
      try {
        if (priority === "Urgent") {
          if (
            item.skill.includes(submitVal.data.breakdown) ||
            item.skill.includes("Expert")
          )
            filtUser.push({
              uName: item.userName,
              vehicle: item.vehicleNumber,
            });
        } else if (submitVal.data.breakdown == "Unknown") {
          if (
            item.skill.includes(submitVal.data.breakdown) &&
            !item.skill.includes("Expert")
          )
            filtUser.push({ uName: item.userName, taskCount: item.taskCount });
        } else {
          if (item.skill.includes(submitVal.data.breakdown))
            filtUser.push({ uName: item.userName, taskCount: item.taskCount });
        }
      } catch {
        console.log(ele + " missing data");
      }
    });

    if (priority === "Urgent") {
      const coordinate = await ref(dbd, "gps-data");
      await onValue(coordinate, (snapshot) => {
        const data = snapshot.val().coordinate;

        let sTime = 10000000;
        let cUser;
        filtUser.forEach(async (ele) => {
          console.log(data[ele.vehicle]);
          ele.location = data[ele.vehicle];
          const temp = await getTime(ele.location);
          ele.dist = temp.dist;
          ele.eta = temp.time;
          //   console.log("" + ele.eta + " +++"+);
          if (ele.eta < sTime) {
            console.log("In");
            sTime = ele.eta;
            cUser = ele.uName;
            setChDist(ele.dist);
            setChTime(ele.eta);
            setChUser(cUser);
            setLoading(false);
          }
        });
      });
    } else {
      let count = 1000;
      console.log("In normal");
      filtUser.forEach(async (ele) => {
        console.log(ele);

        if (ele.taskCount < count) {
          count = ele.taskCount;
          cUser = ele.uName;
          setChUser(cUser);
          setCount(count);
          setLoading(false);
        }
      });
      //   await
      //   await
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const getTime = async (uLoc) => {
    const origin = "" + uLoc.lat + "," + uLoc.lng;

    const LOCATION = "" + submitVal.data.location + " , " + submitVal.data.city;
    var destination = "";

    await axios
      .get(`https://graphhopper.com/api/1/geocode?q=${LOCATION}&key=${API_KEY}`)
      .then((response) => {
        const coordinates = response.data.hits[0].point;
        destination = "" + coordinates.lat + "," + coordinates.lng;
      })
      .catch((error) => {
        console.error(error);
      });

    var t = [];
    await axios
      .get(
        `https://graphhopper.com/api/1/route?point=${origin}&point=${destination}&vehicle=car&key=${API_KEY}`
      )
      .then((response) => {
        const route = response.data.paths[0];
        const distance = route.distance; // distance in meters
        const time = route.time; // time in milliseconds
        t = { dist: distance / 1000, time: time / 60000 };
        console.log(
          `Distance: ${distance} meters, Time: ${time / 60000} minutes`
        );
      })
      .catch((error) => {
        console.error(error);
        // return null;
      });
    return t;
  };

  const handleClose = async () => {
    const pushData = {
      taskID: submitVal.data.taskName,
      dueDate: submitVal.data.date,
      priority: submitVal.data.priority,
      state: submitVal.data.city,
      taskDestination: submitVal.data.location,
      taskStatus: "assigned",
      assignedEmployee: chUser,
      taskType: submitVal.data.breakdown,
    };
    const docRef = await addDoc(collection(db, "Task"), pushData);

    // await updateDoc(doc(db, "users",), {
    //   taskStatus: "archived",
    // });
    window.location.reload();
    // nav("../task");
  };

  function LoadingScreen() {
    return (
      <Dialog
        open={"open"}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  const LoadedScreen = () => {
    let pA = false;
    let time = "";
    let dis = "";
    // console.log(chTime);
    // console.log(chDist);
    if (priority == "Urgent") {
      pA = true;
      if (chTime > 60) {
        let hrs = Math.floor(chTime / 60);
        let min = Math.floor(chTime - hrs * 60);
        console.log(hrs * 60);
        console.log(chTime);

        time = "" + hrs + " Hrs" + " and " + min + " minutes";
      } else {
        time = "" + Math.floor(chTime) + " Minutes";
      }

      dis = "" + Math.floor(chDist) + " KM";
    }

    if (submitVal.data.manU != undefined) {
      setChUser(submitVal.data.manU);
    }

    return (
      <Dialog
        open={"open"}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        disableTypography
      >
        <Box>
          <Container
            sx={{
              paddingTop: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Done fontSize="large" color="success" />
          </Container>
          <DialogTitle>
            <Typography variant="h5">Employee Assigned</Typography>
          </DialogTitle>
          {pA && (
            <Container>
              <DialogTitle variant="h5">Employee: {chUser}</DialogTitle>
              <Typography>Estimated Distance: {dis}</Typography>
              <Typography>Estimated Time is : {time}</Typography>
            </Container>
          )}
          {!pA && (
            <Container>
              <DialogTitle variant="h5">{chUser}</DialogTitle>
              <Typography>Pending Work : {count}</Typography>
            </Container>
          )}
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  };

  return (
    <div>
      {loading && <LoadingScreen />}
      {!loading && <LoadedScreen />}
    </div>
  );
}

export default ShowVal;
