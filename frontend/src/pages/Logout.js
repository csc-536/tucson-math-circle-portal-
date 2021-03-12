import React from "react";
import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <div>
      <h1>Bye Bye!</h1>
      <p>
        <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Logout;
