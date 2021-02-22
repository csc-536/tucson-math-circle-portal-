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
			<h1>Account Registration Form</h1>
			<div id="accountInfo">
				<label>
				    Email (for account, recieve meeting information):
				    <input type="text" name="email" />
				</label>
				<label id="password" className="col1">
					Password:
					<input type="password" name="password" />
				</label>
				<label id="re-password" className="col2">
					Enter Password Again:
					<input type="password" name="re-password" />
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
			<div id="studentInformation">
				<hr />
				<h3>Student Information</h3>
				<label className="col1">
				    Name:
				    <input type="text" name="sname" />
				</label>
				<label className="col2">
					Age:
					<input type="text" name="age" />
				</label>
				<label className="col1">
					Grade:
					<input type="text" name="grade" />
				</label>
				<label className="col2">
					Program Level:
					<br />
					<select>
						<option value='juniorA'>Junior A</option>
						<option value='juniorB'>Junior B</option>
						<option value='senior'>Senior</option>
					</select>
				</label>
			</div>
			<div id="parentInformation">
			<hr />
				<h3>Parent Information</h3>
				<label className="col1">
				    Name:
				    <input type="text" name="pname" />
				</label>
				<label className="col2">
					Phone:
					<input type="text" name="phone" />
				</label>
				<label className="col1">
					Parent Email:
					<input type="text" name="pemail" />
				</label>
			</div>
			<input id="reg" type="submit" value="Register" />
		</form>
	)
}

export default Registration