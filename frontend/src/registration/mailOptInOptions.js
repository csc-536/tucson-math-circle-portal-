import React, { useState } from "react";

function MailOptInOptions(props) {
  const [juniorARadio, setJuniorARadio] = useState(true);
  const [juniorBRadio, setJuniorBRadio] = useState(true);
  const [seniorRadio, setSeniorRadio] = useState(true);
  const [optOutRadio, setOptOutRadio] = useState(false);

  const handleClick = (e) => {
    if (e.target.value.localeCompare("juniorA") == 0) {
      setJuniorARadio(!juniorARadio);
      setOptOutRadio(false);
    } else if (e.target.value.localeCompare("juniorB") == 0) {
      setJuniorBRadio(!juniorBRadio);
      setOptOutRadio(false);
    } else if (e.target.value.localeCompare("senior") == 0) {
      setSeniorRadio(!seniorRadio);
      setOptOutRadio(false);
    } else if (e.target.value.localeCompare("optOut") == 0) {
      setJuniorARadio(false);
      setJuniorBRadio(false);
      setSeniorRadio(false);
      setOptOutRadio(!optOutRadio);
    }
  };

  return (
    <div>
      <input
        type="radio"
        value="juniorA"
        id="juniorA"
        checked={juniorARadio}
        onClick={handleClick}
      />
      <label>Junior A</label>

      <input
        type="radio"
        value="juniorB"
        id="juniorB"
        checked={juniorBRadio}
        onClick={handleClick}
      />
      <label>Junior B</label>

      <input
        type="radio"
        value="senior"
        id="senior"
        checked={seniorRadio}
        onClick={handleClick}
      />
      <label>Senior</label>

      <input
        type="radio"
        value="optOut"
        id="optOut"
        checked={optOutRadio}
        onClick={handleClick}
      />
      <label>Opt Out</label>
    </div>
  );
}

export default MailOptInOptions;
