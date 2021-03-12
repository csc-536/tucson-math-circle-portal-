import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

const useStyles = makeStyles({
    dialogContentText: {
        textAlign: "center",
        color: "red",
    },
});

const DeleteButton = ({ deleteAction, className }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");

    const handleInputOnChange = (e) => {
        setInput(e.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        if (input === "DELETE") {
            deleteAction();
            handleClose();
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                className={className}
                startIcon={<DeleteForever />}
                onClick={handleClickOpen}
                disableElevation
            >
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Whoa, there!</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.dialogContentText}>
                        Once you delete this, there's no getting it back. <br />{" "}
                        Are you sure you want to do this?
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        value={input}
                        onChange={handleInputOnChange}
                        id="name"
                        placeholder="Confirm by typing DELETE"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteButton;
