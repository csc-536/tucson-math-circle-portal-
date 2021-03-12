import { ExitToApp } from "@material-ui/icons";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import TooltipItem from "./TooltipItem";

const LogoutButton = ({ redirectPath }) => {
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);

  function handleLogout(e) {
    sessionStorage.removeItem("accessToken");
    setAuth({ userLoggedIn: false, role: "" });
    history.push(redirectPath);
  }

  return (
    <TooltipItem
      edge="end"
      label="logout-button"
      title="Logout"
      onClick={handleLogout}
      item={<ExitToApp />}
    />
  );
};

export default LogoutButton;
