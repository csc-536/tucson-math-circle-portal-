/*
 * File: mailOptInOptions.js
 * Author: Athan Walker
 * Purpose: Provide selection of mail in options
 */
import React, { useState } from "react";

function MailOptInOptions(props) {
  /*
   * 'juniorARadio' is a boolean indicating if Junior A is selected.
   * 'juniorBRadio' is a boolean indicating if Junior B is selected.
   * 'seniorRadio' is a boolean indicating if Senior is selected.
   * 'optOutRadio' is a boolean indicating if Opt Out is selected.
   */
  const [juniorARadio, setJuniorARadio] = useState(true);
  const [juniorBRadio, setJuniorBRadio] = useState(true);
  const [seniorRadio, setSeniorRadio] = useState(true);
  const [optOutRadio, setOptOutRadio] = useState(false);

  /*
   * 'handleClick' handles the event of a mail in option being clicked.
   * If Junior A, B, or Senior is clicked, alternate its selected boolean and
   * unselect 'Opt Out'.
   * If 'Opt Out' is clicked and is selected, unselect all other options.
   * If the clicked radio button is the only currently selected, do nothing.
   */
  const handleClick = (e) => {
    if (e.target.value.localeCompare("juniorA") == 0) {
      if (
        (!juniorARadio || juniorBRadio || seniorRadio || optOutRadio) == false
      ) {
        return;
      }
      setJuniorARadio(!juniorARadio);
      setOptOutRadio(false);
    } else if (e.target.value.localeCompare("juniorB") == 0) {
      if (
        (juniorARadio || !juniorBRadio || seniorRadio || optOutRadio) == false
      ) {
        return;
      }
      setJuniorBRadio(!juniorBRadio);
      setOptOutRadio(false);
    } else if (e.target.value.localeCompare("senior") == 0) {
      if (
        (juniorARadio || juniorBRadio || !seniorRadio || optOutRadio) == false
      ) {
        return;
      }
      setSeniorRadio(!seniorRadio);
      setOptOutRadio(false);
    } else if (e.target.value.localeCompare("optOut") == 0) {
      if (
        (juniorARadio || juniorBRadio || seniorRadio || !optOutRadio) == false
      ) {
        return;
      }
      setOptOutRadio(!optOutRadio);
      setJuniorARadio(false);
      setJuniorBRadio(false);
      setSeniorRadio(false);
    }
  };

  /*
   * Return a div providing main in options via radio buttons.
   */
  return (
    <div id="mailOptDiv">
      <label className="mailRadio">
        Junior A
        <input
          type="radio"
          value="juniorA"
          id="juniorA"
          checked={juniorARadio}
          onClick={handleClick}
        />
      </label>

      <label className="mailRadio">
        Junior B
        <input
          type="radio"
          value="juniorB"
          id="juniorB"
          checked={juniorBRadio}
          onClick={handleClick}
        />
      </label>

      <label className="mailRadio">
        Senior
        <input
          type="radio"
          value="senior"
          id="senior"
          checked={seniorRadio}
          onClick={handleClick}
        />
      </label>

      <label className="mailRadio">
        Opt Out
        <input
          type="radio"
          value="optOut"
          id="optOut"
          checked={optOutRadio}
          onClick={handleClick}
        />
      </label>
    </div>
  );
}

export default MailOptInOptions;
