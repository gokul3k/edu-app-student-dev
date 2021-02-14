import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExperienceForm from "components/forms/ExperienceForm";

export default function ExperienceDialog({
  addExp,
  exp,
  id,
  open,
  handleClickOpen,
  handleClose,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add experience</DialogTitle>
        <DialogContent>
          <DialogContentText>
           You can add your work experience, internship experience and all
          </DialogContentText>
          <ExperienceForm addExp={addExp} exp={exp} id={id} handleClose={handleClose}/>
        </DialogContent>
    
      </Dialog>
    </div>
  );
}
