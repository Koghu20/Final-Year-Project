import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

function Registration() {
  let nav = useNavigate();

  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const Register = (details) => {
    console.log(details);
    createUserWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
        // ..
      });

    nav("../dashboard");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    Register(details);
  };

  return (
    <Container>
      <Box component={"form"} onSubmit={submitHandler} paddingTop={12}>
        <Typography variant="h4">Register</Typography>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <Button type="submit" value="Register" onClick={Register}>
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Registration;
