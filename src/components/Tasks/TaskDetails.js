import {
  Backdrop,
  CircularProgress,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { db } from "../../firebase";
import React, { useEffect, useCallback, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const TaskDetails = ({ detail, comm, toggleBack }) => {
  console.log(comm);

  const [docData, setDocData] = useState();
  const [show, setShow] = useState(false);
  const [task, setTask] = useState([]);

  const Cards = () => (
    <>
      <Grid container spacing={2}>
        {task.map((element, index) => {
          {
            console.log("test");
            if (element.url == "") {
              return (
                <Grid item key={index}>
                  <Card key={index} sx={{ height: 180, width: 330 }}>
                    <CardContent>
                      <Typography variant="h5">{element.note}</Typography>
                    </CardContent>
                    <CardContent>
                      <Typography variant="h6">Not Available</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            } else {
              return (
                <Grid item key={index}>
                  <Card key={index}>
                    <CardContent align="center">
                      <Typography variant="h5">{element.note}</Typography>
                      <CardMedia
                        sx={{ height: 180, width: 300 }}
                        image={element.url}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              );
            }
          }
        })}
      </Grid>
    </>
  );

  const getTask = useCallback(async () => {
    const data = (await getDocs(collection(db, "Task", detail, "notes"))).docs;
    //   console.log(data);4

    const taskNote = [];
    data.forEach((ele) => {
      const t = {};
      t.note = ele.data().note;
      t.url = ele.data().url;
      taskNote.push(t);
    });

    setTask(taskNote);
    setShow(true);
    console.log(taskNote);
    // setShow(true);
  }, []);

  useEffect(() => {
    getTask();
  }, [getTask]);

  //   useEffect(() => {
  //     LoadedScreen();
  //   }, [LoadedScreen]);

  const LoadingScreen = () => {
    return <CircularProgress />;
  };

  const LoadedScreen = () => {
    // console.log(taskNote.length);
    if (task.length == 0) {
      return (
        <Backdrop open={true}>
          <Box>
            <Box>
              <Typography variant="h3">No Notes Found</Typography>
            </Box>
          </Box>
        </Backdrop>
      );
    } else if (comm != undefined) {
      return (
        // <Backdrop open={true}>
        <Box
          component={"div"}
          sx={{ alignItems: "center", width: "70%", height: "80%" }}
        >
          {/* <Box width={"100%"} height={"80%"}> */}
          <Paper elevation={4} sx={{ paddingTop: 3, paddingBottom: 3 }}>
            <Typography variant="h4" paddingLeft={5}>
              Task Comment
            </Typography>
            <Typography pl={5} variant="h6">
              {comm}
            </Typography>
          </Paper>
          <br />
          <Paper elevation={4} sx={{ paddingTop: 3, paddingBottom: 3 }}>
            <Typography variant="h4" paddingLeft={5}>
              Task Notes
            </Typography>
          </Paper>
          <br />
          <Box pT="5%">
            <Container>
              <Cards />
            </Container>
          </Box>
        </Box>
        // {/* </Backdrop> */}
      );
    } else {
      return (
        // <Backdrop open={true}>
        <Box
          component={"div"}
          sx={{ alignItems: "center", width: "70%", height: "80%" }}
        >
          {/* <Box width={"100%"} height={"80%"}> */}
          <Paper elevation={4} sx={{ paddingTop: 3, paddingBottom: 3 }}>
            <Typography variant="h4" paddingLeft={5}>
              Task Notes
            </Typography>
          </Paper>
          <br />
          <Box pT="5%">
            <Container>
              <Cards />
            </Container>
          </Box>
        </Box>
        // {/* </Backdrop> */}
      );
    }
  };

  return (
    <div>
      <Backdrop sx={{ color: "#ffff" }} open={true} onClick={toggleBack}>
        {show && <LoadedScreen />}
        {!show && <LoadingScreen />}
      </Backdrop>
    </div>
  );
};

export default TaskDetails;
