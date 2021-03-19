/*
 * File: mailOptInOptions.js
 * Author: Athan Walker
 * Purpose: Provide selection of mail in options
 */
import React, { useState } from "react";

function MailOptInOptions({ handleMailChange, section }) {
  /*
   * 'juniorARadio' is a boolean indicating if Junior A is selected.
   * 'juniorBRadio' is a boolean indicating if Junior B is selected.
   * 'seniorRadio' is a boolean indicating if Senior is selected.
   * 'optOutRadio' is a boolean indicating if Opt Out is selected.
   */
  // const [juniorARadio, setJuniorARadio] = useState(true);
  // const [juniorBRadio, setJuniorBRadio] = useState(true);
  // const [seniorRadio, setSeniorRadio] = useState(true);
  // const [optOutRadio, setOptOutRadio] = useState(false);

  /*
   * 'handleClick' handles the event of a mail in option being clicked.
   * If Junior A, B, or Senior is clicked, alternate its selected boolean and
   * unselect 'Opt Out'.
   * If 'Opt Out' is clicked and is selected, unselect all other options.
   * If the clicked radio button is the only currently selected, do nothing.
   */
  // const handleClick = (e) => {
  //   if (e.target.value.localeCompare("junior_a") === 0) {
  //     if (
  //       (!juniorARadio || juniorBRadio || seniorRadio || optOutRadio) == false
  //     ) {
  //       return;
  //     }
  //     setJuniorARadio(!juniorARadio);
  //     setOptOutRadio(false);
  //   } else if (e.target.value.localeCompare("junior_b") == 0) {
  //     if (
  //       (juniorARadio || !juniorBRadio || seniorRadio || optOutRadio) == false
  //     ) {
  //       return;
  //     }
  //     setJuniorBRadio(!juniorBRadio);
  //     setOptOutRadio(false);
  //   } else if (e.target.value.localeCompare("senior") == 0) {
  //     if (
  //       (juniorARadio || juniorBRadio || !seniorRadio || optOutRadio) == false
  //     ) {
  //       return;
  //     }
  //     setSeniorRadio(!seniorRadio);
  //     setOptOutRadio(false);
  //   } else if (e.target.value.localeCompare("opt_out") == 0) {
  //     if (
  //       (juniorARadio || juniorBRadio || seniorRadio || !optOutRadio) == false
  //     ) {
  //       return;
  //     }
  //     setOptOutRadio(!optOutRadio);
  //     setJuniorARadio(false);
  //     setJuniorBRadio(false);
  //     setSeniorRadio(false);
  //   }
  //   handleMailChange(juniorARadio, juniorBRadio, seniorRadio, optOutRadio);
  // };

  /*
   * Return a div providing main in options via radio buttons.
   */
  return (
    <div id="mailOptDiv">
      <label className="mailRadio">
        Junior A
        <input
          type="radio"
          value="junior_a"
          name="junior_a"
          checked={section.includes("junior_a")}
          onClick={handleMailChange}
        />
      </label>

      <label className="mailRadio">
        Junior B
        <input
          type="radio"
          value="junior_b"
          name="junior_b"
          checked={section.includes("junior_b")}
          onClick={handleMailChange}
        />
      </label>

      <label className="mailRadio" onClick={handleMailChange}>
        Senior
        <input
          type="radio"
          value="senior"
          name="senior"
          checked={section.includes("senior")}
          onClick={handleMailChange}
        />
      </label>

      <label className="mailRadio">
        Opt Out
        <input
          type="radio"
          value="opt_out"
          name="opt_out"
          checked={section.includes("opt_out")}
          onClick={handleMailChange}
        />
      </label>
    </div>
  );
}

export default MailOptInOptions;
