import React, { useState } from "react";

function MailOptInOptions(props) {
  const [juniorARadio, setJuniorARadio] = useState(true);
  const [juniorBRadio, setJuniorBRadio] = useState(true);
  const [seniorRadio, setSeniorRadio] = useState(true);
  const [optOutRadio, setOptOutRadio] = useState(false);
  const [selected, setSelected] = useState(true);

  const handleSelected = (e) => {
    setSelected(juniorARadio || juniorBRadio || seniorRadio || optOutRadio);
  };

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
