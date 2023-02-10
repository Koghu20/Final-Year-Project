import React, { useState, useCallback, useEffect } from "react";
import Navbar from "./Chat/Navbar";
import Chat from "./UserChat/Chat";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { query, orderBy, onSnapshot } from "firebase/firestore";

import { db } from "../firebase";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { Send } from "@mui/icons-material";
import { Container } from "@mui/system";

function ChatWindow() {
  const [usersList, setUsersList] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const retUser = useCallback(async () => {
    const data = (await getDocs(collection(db, "users"))).docs;

    const users = [];
    data.forEach((ele) => {
      // if (currentUser === "") setCurrentUser(ele.data().userName);
      if (ele.data().role != "admin") users.push(ele.data().userName);
    });

    setUsersList(users);
    // setCurrentUser("test01");
    // console.log(usersList);
    // setShow(true);
  }, []);

  useEffect(() => {
    retUser();
  }, [retUser]);

  const SendMessage = async () => {
    if (input === "") {
      alert("Please enter a valid message");
      return;
    }
    // const {uid, displayName} = auth.currentUser
    let a = "AdminUser_" + currentUser;
    console.log(a);
    await addDoc(collection(db, "chatRoom", a, "chats"), {
      message: input,
      sendBy: "AdminUser",
      time: Date.now(),
    });
    setInput("");
    // input = "";
    // scroll.current.scrollInto
  };

  useEffect(() => {
    console.log(currentUser);
    let a = "AdminUser_" + currentUser;
    console.log(a);

    const q = query(collection(db, "chatRoom", a, "chats"), orderBy("time"));
    // console.log(q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        let t = {};
        let date = new Date(doc.data().time);

        console.log(doc.data());
        t.msg = doc.data().message;
        if (doc.data().sendBy === "AdminUser") t.type = "right";
        else t.type = "left";
        t.time = date.toLocaleTimeString();

        messages.push(t);
      });
      setMessages(messages);
    });
    console.log(messages);
    return () => unsubscribe();
  }, [currentUser]);

  const userStyle = (ele) => {
    if (ele === currentUser) {
      return "#ADD8E6";
    }
    return "";
  };

  const UserList = () => {
    return (
      <List>
        {usersList.map((ele, i) => {
          return (
            <ListItem
              button
              onClick={() => {
                setCurrentUser(ele);
              }}
              style={{ backgroundColor: userStyle(ele) }}
              key={i}
            >
              <ListItemIcon>
                <Avatar>{ele.charAt(0)}</Avatar>
              </ListItemIcon>
              <ListItemText>{ele}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const DisplayMessage = () => {
    console.log(currentUser);
    return (
      <List>
        {messages.map((ele, i) => {
          return (
            <ListItem key={i}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align={ele.type}
                    primary={ele.msg}
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    align={ele.type}
                    secondary={ele.time}
                  ></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5">Chat</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} sx={{ border: 1 }}>
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar>A</Avatar>
                </ListItemIcon>
                <ListItemText>Admin User</ListItemText>
              </ListItem>
            </List>
            <Divider />
            <UserList />
          </Grid>
          <Divider />
          <Grid
            item
            xs={9}
            sx={{ border: 1, borderLeft: 0 }}
            style={{ backgroundColor: "white" }}
          >
            <Box style={{ height: 500, maxHeight: 800, overflow: "auto" }}>
              <DisplayMessage />
            </Box>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </Grid>
              <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add">
                  <Button
                    color="warning"
                    onClick={() => {
                      SendMessage();
                    }}
                  >
                    Send
                  </Button>
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ChatWindow;
