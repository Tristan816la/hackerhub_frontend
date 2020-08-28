import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import CustomButton from '../../utils/CustomButton';
import ProfileSkeleton from '../../utils/ProfileSkeleton';
// Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import theme from '../../utils/theme';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';
import ImageIcon from '@material-ui/icons/Image';

const styles = { ...theme.pageStyles };

const Profile = (props) => {
	const {
		classes,
		user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated }
	} = props;

	const handleEditPic = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};
	const handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		props.uploadImage(formData);
	};
	const handleLogout = () => {
		props.logoutUser();
	};

	let profileMarkup = !loading ? authenticated ? (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={imageUrl} alt="profile" className="profile-image" />
					<input type="file" id="imageInput" onChange={handleImageChange} hidden="hidden" />
					<CustomButton tip="Edit profile picture" onClick={handleEditPic} btnClassName="button">
						<ImageIcon color="primary" />
					</CustomButton>
				</div>
				<hr />
				<div className="profile-details">
					<MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
						@{handle}
					</MuiLink>
					<hr />
					{bio && <Typography variant="body2">{bio}</Typography>}
					<hr />
					{location && (
						<Fragment>
							<LocationOn color="primary" />
							<span>{location}</span>
							<hr />
						</Fragment>
					)}
					{website && (
						<Fragment>
							<LinkIcon color="primary" />
							<a href={website} target="_blank" rel="noopener noreferrer">
								{' '}
								{website}
								<hr />
							</a>
						</Fragment>
					)}
					<CalenderToday color="primary" /> <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
				</div>
				<CustomButton tip="Logout" onClick={handleLogout}>
					<KeyboardReturn color="primary" />
				</CustomButton>
				<EditDetails />
			</div>
		</Paper>
	) : (
		<Paper className={classes.paper}>
			<Typography variant="body2" align="center">
				No profile found, please login again
			</Typography>
			<div className={classes.buttons}>
				<Button variant="contained" color="primary" component={Link} to="/login">
					Login
				</Button>
				<Button variant="contained" color="secondary" component={Link} to="/signup">
					Signup
				</Button>
			</div>
		</Paper>
	) : (
		<ProfileSkeleton />
	);

	return profileMarkup;
};
const mapStateToProps = (state) => ({
	user: state.user
});
const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
