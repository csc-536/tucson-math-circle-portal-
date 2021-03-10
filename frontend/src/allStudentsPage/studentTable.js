import React, { useState } from "react";
function StudentTable(props) {
  const startTable = (
    <table border="5">
      <tr>
        <th>Student Name</th>
        <th>Parent Name</th>
        <th>Contact Phone</th>
        <th>Consent Form</th>
        <th> Verified </th>
      </tr>
    </table>
  );

  const [table, setTable] = useState({ startTable });

  return { table };
}

export default StudentTable;
