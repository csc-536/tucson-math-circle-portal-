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
			<div id="accountInfo">
				<label>
				    <p>Email (for account, recieve meeting information):</p>
				    <input type="text" name="email" />
				</label>
				<label id="password" class="col1">
					<p>Password:</p>
					<input type="text" name="password" />
				</label>
				<label id="re-password" class="col2">
					<p>Enter Password Again:</p>
					<input type="text" name="re-password" />
				</label>
			</div>
			<div id="checkbox">
				<Checkbox 
              		icon={icon} 
             		checkedIcon={checkedIcon} 
              		style={{ marginRight: 8 }} 
            	/>
				I understand that parents need to sign a consent form after registration
			</div>
			<hr />
			<div id="studentInformation">
				<h4>Student Information</h4>
				<label class="col1">
				    <p>Name:</p>
				    <input type="text" name="sname" />
				</label>
				<label class="col2">
					<p>Age:</p>
					<input type="text" name="age" />
				</label>
				<label class="col1">
					<p>Grade:</p>
					<input type="text" name="grade" />
				</label>
				<label class="col2">
					<p>Program Level:</p>
					<select>
						<option value='juniorA'>Junior A</option>
						<option value='juniorB'>Junior B</option>
						<option value='senior'>Senior</option>
					</select>
				</label>
			</div>
			<div id="parentInformation">
			<hr />
				<h4>Parent Information</h4>
				<label class="col1">
				    <p>Name:</p>
				    <input type="text" name="pname" />
				</label>
				<label class="col2">
					<p>Phone:</p>
					<input type="text" name="phone" />
				</label>
				<label class="col1">
					<p>Parent Email:</p>
					<input type="text" name="pemail" />
				</label>
			</div>
			<input id="reg" type="submit" value="Register" />
		</form>
	)
}

export default Registration