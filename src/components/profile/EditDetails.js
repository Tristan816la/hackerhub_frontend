import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CustomButton from '../../utils/CustomButton';
import { DialogTitle, DialogContent, Dialog, DialogActions, Button, TextField, Tooltip } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

const styles = (theme) => ({
	...theme.pageStyles,
	button: {
		float: 'right'
	}
});

const EditDetails = (props) => {
	const [ bio, setBio ] = useState('');
	const [ website, setWebsite ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ open, setOpen ] = useState(false);
	const { classes } = props;
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleBio = (event) => {
		setBio(event.target.value);
	};
	const handleWebsite = (event) => {
		setWebsite(event.target.value);
	};
	const handleLocation = (event) => {
		setLocation(event.target.value);
	};

	const handleSubmit = () => {
		const userDetails = {
			bio,
			website,
			location
		};
		props.editUserDetails(userDetails);
		handleClose();
	};

	useEffect(
		() => {
			const { credentials } = props;
			if (credentials.bio) {
				setBio(credentials.bio);
			}
			if (credentials.website) {
				setWebsite(credentials.website);
			}
			if (credentials.location) {
				setLocation(credentials.location);
			}
		},
		[ open ]
	);

	return (
		<Fragment>
			<CustomButton tip="Edit details" onClick={handleOpen} btnClassName={classes.button}>
				<EditIcon color="primary" />
			</CustomButton>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>Edit your details</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							name="bio"
							type="text"
							label="Bio"
							multiline
							rows="3"
							placeholder="A short bio about yourself"
							className={classes.textField}
							value={bio}
							onChange={handleBio}
							fullWidth
						/>
						<TextField
							name="website"
							type="text"
							label="website"
							placeholder="Your personal/professional website"
							className={classes.textField}
							value={website}
							onChange={handleWebsite}
							fullWidth
						/>
						<TextField
							name="location"
							type="text"
							label="Location"
							placeholder="Where you live"
							className={classes.textField}
							value={location}
							onChange={handleLocation}
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};
EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	credentials: state.user.credentials
});
export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
