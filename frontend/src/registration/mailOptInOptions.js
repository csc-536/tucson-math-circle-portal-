/*
 * File: mailOptInOptions.js
 * Author: Athan Walker
 * Purpose: Provide selection of mail in options
 */
import React, { useState } from "react";

function MailOptInOptions({ handleMailChange, section }) {
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

      <label className="mailRadio">
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
