import TextField from '@material-ui/core/TextField'; 
import Autocomplete from '@material-ui/lab/Autocomplete'; 
import Checkbox from '@material-ui/core/Checkbox'; 
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'; 
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import './registration.css'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />; 
const checkedIcon = <CheckBoxIcon fontSize="small" />

function Registration(props) {
	return (
		<form>
			<h2>Account Registration Form</h2>
			<label>
			    Email (for account, recieve meeting information):
			    <input type="text" name="email" />
			</label>
			<label>
				Password
				<input type="text" name="password" />
			</label>
			<label>
				Enter Password Again
				<input type="text" name="re-password" />
			</label>
			<label>
				<Checkbox 
              		icon={icon} 
             		checkedIcon={checkedIcon} 
              		style={{ marginRight: 8 }} 
            	/>
				I understand that parents need to sign a consent form after registration
			</label>
			<h4>Student Information</h4>
			<label>
			    Name:
			    <input type="text" name="sname" />
			</label>
			<label>
				Age:
				<input type="text" name="age" />
			</label>
			<label>
				Grade
				<input type="text" name="grade" />
			</label>
			<label>
				<select>
					<option value='juniorA'>Junior A</option>
					<option value='juniorB'>Junior B</option>
					<option value='senior'>Senior</option>
				</select>
			</label>
			<h4>Parent Information</h4>
			<label>
			    Name:
			    <input type="text" name="pname" />
			</label>
			<label>
				Phone:
				<input type="text" name="phone" />
			</label>
			<label>
				Parent Email
				<input type="text" name="pemail" />
			</label>
			<input type="submit" value="Submit" />
		</form>
	)
}

export default Registration