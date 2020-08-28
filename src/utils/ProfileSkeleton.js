import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import defaultImg from '../images/default.png';
//MUI
import Paper from '@material-ui/core/Paper';
//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';
const styles = (theme) => ({
	...theme.pageStyles,
	handle: {
		height: 20,
		backgroundColor: theme.palette.primary.main,
		widht: 60,
		margin: '0 auto 7px auto'
	},
	fullLine: {
		height: 15,
		backgroundColor: 'rgba(0,0,0,0.6)',
		width: '100%',
		marginBottom: 10
	},
	halfLine: {
		height: 15,
		backgroundColor: 'rgba(0,0,0,0.6)',
		width: '50%',
		marginBottom: 10
	}
});
const ProfileSkeleton = (props) => {
	const { classes } = props;
	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img src={defaultImg} alt="profile" className="profile-image" />
				</div>
				<hr />
				<div className="profile-details">
					<div className={classes.handle} />
					<hr />
					<div className={classes.fullLine} />
					<div className={classes.fullLine} />
					<hr />
					<LocationOn color="primary">
						<span>Location</span>
					</LocationOn>
					<hr />
					<LinkIcon color="primary">https://tristan.com</LinkIcon>
					<hr />
					<CalenderToday>Joined date</CalenderToday>
				</div>
			</div>
		</Paper>
	);
};
ProfileSkeleton.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
