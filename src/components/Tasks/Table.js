import { ArrowForwardIos, WindowSharp } from "@mui/icons-material";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
  Paper,
  Collapse,
  IconButton,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import TaskDetails from "./TaskDetails";
import CloseIcon from "@mui/icons-material/Close";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const states = {
  open: "warning",
  attention: "error",
  assigned: "secondary",
  ongoing: "warning",
  completed: "success",
};
const priSt = {
  Urgent: "warning",
  Normal: "success",
};

export default function TableComponent({ data, setData }) {
  const [detail, setDetail] = useState();
  const [backDp, setBackDp] = useState(false);
  const [deleteHand, setDeleteHand] = useState(false);
  const [dltId, setDltID] = useState();
  const [openStatus, setOpenStatus] = useState(true);
  const [comm, setComm] = useState();
  data = data.data;
  var keys = Object.keys(data[0]).map((i) => i.toUpperCase());
  keys.shift(); // delete "id" key

  const row = [
    "Task ID",
    "Assinged Employee",
    "Task Type",
    "Task Destination",
    "Priority",
    "Due Date",
    "Task Status",
  ];

  const taskHandler = (taskID, com) => {
    setDetail(taskID);
    setComm(com);
    console.log(comm);
    setBackDp(true);
  };

  const toggleBack = () => {
    // console.log("innnnnnnn");
    setBackDp(!backDp);
  };

  let nav = useNavigate();
  const deleteHandler = async (id) => {
    setDltID(id);
    setDeleteHand(true);
    console.log(id);
  };

  const deleteTask = async () => {
    await deleteDoc(doc(db, "Task", dltId));
    window.location.reload();
  };

  const archiveHandler = async () => {
    await updateDoc(doc(db, "Task", dltId), {
      taskStatus: "archived",
    });
    window.location.reload();
  };

  const DltBack = () => {
    return (
      <Dialog
        open={deleteHand}
        onClose={() => {
          setDeleteHand(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete or archive the task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteTask}>Delete</Button>
          <Button onClick={archiveHandler} autoFocus>
            Archive
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Paper elevation={11} style={{ maxHeight: 600, overflow: "auto" }}>
      <Table className="mb-0">
        <TableHead>
          <TableRow hover={true}>
            {row.map((key) => (
              <TableCell variant="head" key={key}>
                {key}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .sort((a, b) => a.id - b.id)
            .map(
              ({
                taskID,
                assignedEmployee,
                taskType,
                taskDestination,
                taskStatus,
                dueDate,
                priority,
                id,
                taskComment,
              }) => (
                <TableRow key={taskID}>
                  <TableCell
                    className="pl-3 fw-normal"
                    onClick={() => {
                      taskHandler(id, taskComment);
                    }}
                  >
                    {taskID}
                  </TableCell>
                  <TableCell>{assignedEmployee}</TableCell>
                  <TableCell>{taskType}</TableCell>
                  <TableCell>{taskDestination}</TableCell>
                  {/* <TableCell>{price}</TableCell> */}
                  {/* <TableCell>{taskStatus}</TableCell> */}
                  <TableCell>
                    <Chip label={priority} color={priSt[priority]} />
                  </TableCell>
                  <TableCell>{dueDate}</TableCell>
                  <TableCell>
                    <Chip label={taskStatus} color={states[taskStatus]} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        deleteHandler(id);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
        </TableBody>
      </Table>
      {/* {backDp && <TaskDetails />} */}

      {backDp && (
        <TaskDetails detail={detail} comm={comm} toggleBack={toggleBack} />
      )}
      <DltBack />
    </Paper>
  );
}
