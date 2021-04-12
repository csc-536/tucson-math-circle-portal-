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
    sortTable();
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
      if (newSectionList.length === 1) {
        return;
      }
      const i = newSectionList.indexOf(value);
      newSectionList.splice(i, 1);
    } else {
      newSectionList.push(value);
    }
    setSectionList(newSectionList);
    setSort(!sort);
  };

  const sortTable = (e) => {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("studentTable");
    if (table === null) {
      return;
    }
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        // Check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  };

  return (
    <div id="allStudentsPage">
      <h1 id="studentPageHeader">All Students</h1>
      <SectionFilter
        sectionList={sectionList}
        handleRadioChange={handleRadioChange}
      />
      <button id="studentSortButton" onClick={sortTable}>
        Sort Table By Student Last Name
      </button>
      <StudentTable
        sortTable={sortTable}
        paramStudentList={studentList}
        sectionList={sectionList}
      />
    </div>
  );
}

export default AllStudents;
