import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";

const useStyles = makeStyles({
  dialogContentText: {
    textAlign: "center",
    color: "blue",
  },
});

const RegisterButton = ({
  check,
  email,
  preRegister,
  regAction,
  className,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleInputOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleClickOpen = async () => {
    if (check() === -1) {
      handleClose();
      return;
    }

    console.log(email);
    try {
      await preRegister({ email });
      console.log("EMAIL SENT");
    } catch (error) {
      console.log(error.response);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValidate = () => {
    // if (input === "0000") {
    console.log(input);
    regAction(input);
    handleClose();
    // }
  };

  // const preReg = async () => {
  //   console.log(email);
  //   try {
  //     await preRegister({ email });
  //     console.log("EMAIL SENT");
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }

  // preReg();

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={className}
        startIcon={<ArrowForward />}
        onClick={handleClickOpen}
        disableElevation
      >
        REGISTER
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Whoa, there!</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            A verification email has been sent to you account email address.
            Enter the four digit code to finish logging in:
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            value={input}
            onChange={handleInputOnChange}
            id="name"
            placeholder="Four digit code"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button id="regButton" onClick={handleValidate}>
            VERIFY
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegisterButton;
