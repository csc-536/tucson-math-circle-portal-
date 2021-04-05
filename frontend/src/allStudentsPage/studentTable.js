import "./allStudents.css";
import React, { useState } from "react";
function StudentTable({ studentList, sectionList }) {
  return (
    <table id="studentTable" border="4">
      <tr>
        <th>Student Last Name, First Name</th>
        <th>Junior (A) Attended/Registered</th>
        <th>Junior (B) Attended/Registered</th>
        <th>Senior Attended/Registered</th>
        <th>Guardian Name</th>
        <th>Guardian Phone</th>
        <th>Guardian Email</th>
      </tr>
      {studentList.map((account) => {
        let filteredIn = false;
        if (
          account["mailing_lists"].length === 0 &&
          sectionList.includes("opt_out")
        ) {
          filteredIn = true;
        }
        account["mailing_lists"].map((section) => {
          if (sectionList.includes(section)) {
            filteredIn = true;
          }
        });
        if (filteredIn) {
          return account["student_list"].map((student) => {
            return (
              <tr>
                <td>
                  {student["last_name"]}, {student["first_name"]}
                </td>
                <td>
                  {student["meeting_counts"]["junior_a"]["attended"]} /{" "}
                  {student["meeting_counts"]["junior_a"]["registered"]}
                </td>
                <td>
                  {student["meeting_counts"]["junior_b"]["attended"]} /{" "}
                  {student["meeting_counts"]["junior_b"]["registered"]}
                </td>
                <td>
                  {student["meeting_counts"]["senior"]["attended"]} /{" "}
                  {student["meeting_counts"]["senior"]["registered"]}
                </td>
                <td>
                  {account["guardians"][0]["first_name"]}{" "}
                  {account["guardians"][0]["last_name"]}
                </td>
                <td>{account["guardians"][0]["phone_number"]}</td>
                <td>{account["guardians"][0]["email"]}</td>
              </tr>
            );
          });
        } else {
          return;
        }
      })}
    </table>
  );
}

export default StudentTable;
