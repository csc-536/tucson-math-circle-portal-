/*
 * File: allStudents.js
 * Author: Athan Walker
 * Purpose: Provide a list of registered students
 */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import StudentTable from "./studentTable";
import { getAllStudents } from "../http";

function AllStudents(props) {
  const history = useHistory();
  const [studentList, setStudentList] = useState([]);
  if (sessionStorage.getItem("accessToken") === null) {
    history.push("/");
  }

  useEffect(() => {
    const students = async () => {
      try {
        const res = await getAllStudents();
        console.log(res.data);
        setStudentList(res.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    students();
  }, []);

  return <StudentTable studentList={studentList} />;
}

export default AllStudents;
