import React from "react";
import EventIcon from "@material-ui/icons/Event";
import { Button } from "@material-ui/core";

const ReminderButton = ({ className, onClick }) => {
  return (
    <Button
      variant="contained"
      className={className}
      disableElevation
      onClick={onClick}
      startIcon={<EventIcon />}
    >
      Send Reminder
    </Button>
  );
};

export default ReminderButton;
