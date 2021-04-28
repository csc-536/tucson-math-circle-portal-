import { createContext } from "react";

export const meetingContext = createContext({
  filter: {
    dates: [],
    session_levels: ["junior_a", "junior_b", "senior"],
  },
  unverifiedStudents: [],
});
