import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useCallback, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, dbd } from "../firebase";
import DisplayMap from "./DisplayMap";
import { onValue, ref } from "firebase/database";

import { grey } from "@mui/material/colors";

function Monitor() {
  const [userList, setUserList] = useState([]);
  const [location, setLocation] = useState([]);
  const [allLoc, setAllLoc] = useState({});
  const [clicked, setClicked] = useState("");
  const [dFinder, setDFinder] = useState(false);
  const [abc, setAbc] = useState();

  const cardClickHandler = (ele) => {
    setClicked(ele.uName);
    setLocation([allLoc[ele.vehicle]]);
    // this.state({ color: "green" });
  };

  const color = (ele) => {
    if (ele == clicked) {
      return "#ADD8E6";
    } else return "";
  };

  const Cards = () => (
    <>
      <Grid container spacing={2} paddingLeft={4}>
        {userList.map((element, index) => {
          {
            return (
              <Grid item key={index} width={300}>
                <Card
                  key={index}
                  style={{ backgroundColor: color(element.uName) }}
                  onClick={() => {
                    cardClickHandler(element);
                  }}
                >
                  <CardContent align="center">
                    <Typography variant="h6">{element.uName}</Typography>
                    <Typography variant="body2">{element.vehicle}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          }
        })}
      </Grid>
    </>
  );
  const userData = [];

  const [input, setInput] = useState();
  const getUser = useCallback(async () => {
    const data = (await getDocs(collection(db, "users"))).docs;
    //   console.log(data);4

    const coordinate = await ref(dbd, "gps-data");
    await onValue(coordinate, (snapshot) => {
      const locData = snapshot.val().coordinate;
      // console.log(locData.van01);
      setAllLoc(locData);
      setLocation(Object.values(locData));
      // setLocation(locData);
    });

    data.forEach((ele) => {
      if (ele.data().role != "admin") {
        const t = {};
        t.uName = ele.data().userName;
        t.vehicle = ele.data().vehicleNumber;
        userData.push(t);
      }
    });

    setUserList(userData);
    // console.log(userData);
    // setShow(true);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  let a = "";
  const handleText = (e) => {
    // console.log(e.target.value);
    setAbc(e.target.value);
  };

  //   handleTextFieldChange: function(e) {
  //     this.setState({
  //         textFieldValue: e.target.value
  //     });
  // },

  // const ReverseGeocoding = (loc) => {
  //   const [address, setAddress] = useState("");

  //   useEffect(() => {
  //     axios
  //       .get(
  //         "https://graphhopper.com/api/1/geocode?point=" +
  //           loc +
  //           "&key=3cf66de1-a959-4830-9ee8-cdd16b6a92ee"
  //       )
  //       .then((response) => {
  //         setAddress(response.data.hits[0].point.name);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);

  //   return <div>Address: {address}</div>;
  // };

  const findDriver = () => {
    console.log(abc);
    // console.log(e);
  };

  const DistanceCalc = () => {
    return (
      <Box paddingLeft={3} height={400}>
        <Typography paddingLeft={2} variant="h4">
          Nearest Driver Finder
        </Typography>
        <Box display={"inline-flex"} paddingTop={2}>
          <Typography
            variant="h6"
            paddingTop={2}
            paddingLeft={3}
            paddingRight={2}
          >
            Enter Destination Location :
          </Typography>
          <TextField
            sx={{ width: 400 }}
            label="Destination"
            onChange={handleText}
            // onChange={(e) => setInput(e.target.value)}
          ></TextField>
        </Box>
        <Button pl={2} onClick={findDriver()}>
          Find
        </Button>
        {dFinder && console.log}
      </Box>
    );
  };

  return (
    <div>
      <Box component="div" pl={3} pr={3} align="center">
        <Typography sx={{ pl: 2, paddingBottom: "2%" }} variant="h3">
          Vehicle Monitoring
        </Typography>
        <Box
          // border={1}
          // borderColor="red"
          paddingBottom={10}
          component="span"
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Box component="span" width={400}>
            <Container align="center">
              <Card
                width="400"
                paddingBottom="3"
                align="center"
                sx={{ backgroundColor: grey }}
              >
                <CardContent>
                  <Typography variant="h4">Employees</Typography>
                </CardContent>
              </Card>
              <br />
              <Cards />
            </Container>
          </Box>
          <Box>
            <DisplayMap location={location} />
          </Box>
        </Box>
        <Box pT={5}></Box>
        {/* <DistanceCalc /> */}
      </Box>
    </div>
  );
}

export default Monitor;
