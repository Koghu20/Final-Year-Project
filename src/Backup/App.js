import React from "react";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { initializeApp } from "firebase/app";
// import {getDatabase,onValue, ref} from "firebase/databae"; 
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { getAuth } from "firebase/auth";
import Registration from "./components/registration";
import HomePage from "./components/homepage";


export const firebaseConfig = {
  apiKey: "AIzaSyAHCSiWYOcViYIT9Lb4NLbP7zKDIuYfBQk",
  authDomain: "vehicle-tracking-2-b569f.firebaseapp.com",
  databaseURL: "https://vehicle-tracking-2-b569f-default-rtdb.firebaseio.com",
  projectId: "vehicle-tracking-2-b569f",
  storageBucket: "vehicle-tracking-2-b569f.appspot.com",
  messagingSenderId: "87638737808",
  appId: "1:87638737808:web:42ec27e7deca859675a915",
  measurementId: "G-E86X9QRZ59"
};

function App() {
  const [user, setUser] = useState();
  const [auth, setAuth] = useState();
  useEffect(() => {
    initializeApp(firebaseConfig);
    setAuth(getAuth());
  }, []);

  // const db = getDatabase();
  // const reference = ref(db, 'gps-data/' + coordinate + '/employee_01');
  // onValue(reference, (snapshot) => {
  //   const data = snapshot.val();
  //   updateDistance(postElement, data);
  // });


  const Logout = () => {
    setUser(null);
  };
  return (
    <Router>
      <Routes>
        {auth && (
          <>
            <Route path="/register" element={<Registration auth={auth}/>} />
            <Route path="/login" element={<LoginForm setUser={setUser} auth={auth} />} />
            {user && <Route path="/home" element={<HomePage setUser={setUser}  />} />}
            <Route
              exact
              path="/"
              element={
                user ? <Navigate to="/home" /> : <Navigate to="/login" />
              }
            ></Route>
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
