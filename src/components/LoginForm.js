import React, { useState } from "react";
import Button from "@mui/material/Button";
import Register from "./registration";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Container } from "@mui/system";
import { Close } from "@mui/icons-material";
import { auth } from "../firebase";

function LoginForm() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const details = {
      email: form.get("email").trim(),
      //name: form.get("name").trim(),
      password: form.get("password").trim(),
    };
    try {
      await signInWithEmailAndPassword(auth, details.email, details.password);
      //setUser({ name: details.name, email: details.email });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/user-not-found") {
        setError("Account not found");
      } else if (errorCode === "auth/wrong-password") {
        setError("Wrong Password");
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        component={"form"}
        onSubmit={submitForm}
        sx={{
          minHeight: "380px",
          backgroundColor: "#FFF",
          p: 2.5,
          borderRadius: 2.5,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          <b>Login</b>
        </Typography>
        {/* <TextField
          required
          name="name"
          variant="outlined"
          label="Name"
          id="name"
          fullWidth
          sx={{ mb: 2 }}
          autoFocus
        /> */}
        <TextField
          required
          name="email"
          variant="outlined"
          label="Email"
          id="email"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          required
          name="password"
          variant="outlined"
          label="Password"
          type="password"
          id="password"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ mr: 2 }}>
          <b>Login</b>
        </Button>
        <Button
          type="button"
          onClick={() => navigate("/register")}
          variant="contained"
        >
          <b>Register</b>
        </Button>

        <Collapse in={error !== null}>
          <Alert
            id="response_alert"
            severity="error"
            sx={{ fontSize: "13px", mt: 2 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setError(null)}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            <b style={{ whiteSpace: "pre-wrap" }}>{error}</b>
          </Alert>
        </Collapse>
      </Box>
    </Container>
  );
}

export default LoginForm;
