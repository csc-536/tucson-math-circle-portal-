/*
 * File: allStudents.js
 * Author: Athan Walker
 * Purpose: Provide a list of registered students
 */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import SectionFilter from "./sectionFilter";
import StudentTable from "./studentTable";
import { getAllStudents } from "../http";
import { clone, uniqueId } from "lodash";

function AllStudents(props) {
  const history = useHistory();

  const [studentList, setStudentList] = useState([]);
  const [sectionList, setSectionList] = useState([
    "junior_a",
    "junior_b",
    "senior",
    "opt_out",
  ]);
  const [sort, setSort] = useState(false);

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

  /*
   * 'handleMailChange' handles the event of a mail in option being clicked.
   * If Junior A, B, or Senior is clicked, alternate its selected boolean and
   * unselect 'Opt Out'.
   * If 'Opt Out' is clicked and is selected, unselect all other options.
   * If the clicked radio button is the only currently selected, do nothing.
   */
  const handleRadioChange = (e) => {
    const { value } = e.target;
    let newSectionList = clone(sectionList);
    if (newSectionList.includes(value)) {
      const i = newSectionList.indexOf(value);
      newSectionList.splice(i, 1);
    } else {
      newSectionList.push(value);
    }
    setSectionList(newSectionList);
    setSort(!sort);
  };

  return (
    <div id="allStudentsPage">
      <h1 id="studentPageHeader">All Students</h1>
      <SectionFilter
        sectionList={sectionList}
        handleRadioChange={handleRadioChange}
      />
      <StudentTable paramStudentList={studentList} sectionList={sectionList} />
    </div>
  );
}

export default AllStudents;
