import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Meeting from "./Meeting";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  cardActions: {
    float: "right",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: 5,
    padding: theme.spacing(2, 4, 3),
  },
}));

const MeetingCard = ({ meeting, past }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const {
    auth: { userLoggedIn, role },
  } = useContext(AuthContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const handleEdit = () => {
    history.push({
      pathname: "/meeting",
      state: { meeting, past },
    });
  };

  const rootRef = React.useRef(null);
  return (
    <Card className={classes.root} variant="outlined">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        disableEnforceFocus
        disableAutoFocus
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <Meeting meeting={meeting} />
        </div>
      </Modal>
      <CardContent>
        <Typography gutterBottom variant="h4" component="h3">
          Meeting
        </Typography>
        <Typography variant="h6" component="h6" color="textSecondary">
          July 20, 2014
        </Typography>
        <Typography variant="body1" component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {role === "coordinator" ? (
          <Button size="small" color="primary" onClick={handleEdit}>
            Edit
          </Button>
        ) : (
          <Button size="small" color="primary" onClick={handleOpen}>
            Learn More
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MeetingCard;
