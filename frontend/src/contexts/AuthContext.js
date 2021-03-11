import { createContext } from "react";
import { isLoggedIn, loggedInRole } from "../utils";

export const AuthContext = createContext({
  auth: {
    userLoggedIn: isLoggedIn(),
    role: loggedInRole(),
  },
});
