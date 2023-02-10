import {
  query,
  collection,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { db } from "../../firebase";

function Chat() {
  console.log("Innn");
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const getTask = useCallback(async () => {
    const data = (
      await getDocs(collection(db, "chatRoom", "AdminUser_test01", "chats"))
    ).docs;

    data.forEach((ele) => {
      console.log(ele.data);
    });
  });

  useEffect(() => {
    // const q = query(
    //   collection(db, "chatRoom", "AdminUser_test01", "chat"),
    //   orderBy("timestamp")
    // );
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   let messages = [];
    //   console.log(querySnapshot);
    //   querySnapshot.forEach((doc) => {
    //     messages.push({ ...doc.data(), id: doc.id });
    //   });
    //   setMessages(messages);
    // });
    // return () => unsubscribe();
    getTask();
  }, [getTask]);

  return (
    <div>
      <h1>Yesss</h1>
    </div>
  );
}

export default Chat;
