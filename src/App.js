import React from "react";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Registration from "./components/registration";
import Dashboard from "./components/Dashboard";
import DisplayMap from "./components/DisplayMap";
import Navbar from "./components/Navbar";
import Monitor from "./components/Monitor";
import Task from "./components/Task";
import ChatWindow from "./components/ChatWindow";
import AddTask from "./components/Tasks/AddTask";

function App() {
  const [user] = useAuthState(auth);

  console.log(user);
  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        {auth && (
          <>
            <Route path="/register" element={<Registration auth={auth} />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <LoginForm />}
            />
            {user && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Monitor" element={<Monitor />} />
                <Route path="/Chat" element={<ChatWindow />} />
                <Route path="/task" element={<Task />} />
              </>
            )}

            <Route
              exact
              path="/"
              element={
                user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            ></Route>
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
