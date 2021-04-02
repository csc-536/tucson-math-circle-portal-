/*
 * File: mailOptInOptions.js
 * Author: Athan Walker
 * Purpose: Provide selection of mail in options
 */
import React, { useState } from "react";

function SectionFilter({ sectionList, handleRadioChange }) {
  /*
   * Return a div providing main in options via radio buttons.
   */
  return (
    <div id="outerSectionFilterDiv">
      <h3 id="sectionFilterHeader">Sections Filter</h3>
      <div id="innerSectionFilterDiv">
        <label className="sectionRadio">
          Junior (A)
          <input
            type="radio"
            value="junior_a"
            name="junior_a"
            checked={sectionList.includes("junior_a")}
            onClick={handleRadioChange}
          />
        </label>

        <label className="sectionRadio">
          Junior (B)
          <input
            type="radio"
            value="junior_b"
            name="junior_b"
            checked={sectionList.includes("junior_b")}
            onClick={handleRadioChange}
          />
        </label>

        <label className="sectionRadio">
          Senior
          <input
            type="radio"
            value="senior"
            name="senior"
            checked={sectionList.includes("senior")}
            onClick={handleRadioChange}
          />
        </label>

        <label className="sectionRadio">
          Opt Out
          <input
            type="radio"
            value="opt_out"
            name="opt_out"
            checked={sectionList.length == 0}
            onClick={handleRadioChange}
          />
        </label>
      </div>
    </div>
  );
}

export default SectionFilter;
