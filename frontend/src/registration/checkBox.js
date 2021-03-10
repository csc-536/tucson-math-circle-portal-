/*
 * File: checkBox.js
 * Author: Athan Walker
 * Purpose: Provide a checkbox for the registration form regarding user
 *          consent
 */
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

function CheckBox(props) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  /*
   * Returns the checkbox and text
   */
  return (
    <div id="checkbox">
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        style={{ marginRight: 8 }}
      />
      <p>
        I understand that guardians need to sign a consent form after
        registration
      </p>
    </div>
  );
}

export default CheckBox;
