import React, { Fragment } from 'react';
import defaultImage from '../images/default.png';
import PropTypes from 'prop-types';
//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
const styles = (theme) => ({
	...theme.palettee,
	card: {
		display: 'flex',
		marginBottom: 20
	},
	cardContent: {
		width: '100%',
		flexDirection: 'column',
		padding: 25
	},
	media: {
		height: '100%',
		width: '60%'
	},
	handle: {
		width: 60,
		height: 20,
		backgroundColor: theme.palette.primary.main,
		marginBottom: 7
	},
	date: {
		height: 14,
		width: 100,
		backgroundColor: 'rgba(0,0,0,0.3)',
		marginBottom: 10
	},
	fullLine: {
		height: 15,
		width: '90%',
		marginBottom: 10,
		backgroundColor: 'rgba(0,0,0,0.6)'
	},
	halfLine: {
		height: 15,
		width: '50%',
		backgroundColor: 'rgba(0,0,0,0.6)',
		marginBottom: 10
	}
});
const PostSkeleton = (props) => {
	const { classes } = props;
	const content = Array.from({ length: 5 }).map((item, index) => (
		<Card className={classes.card} key={index}>
			<CardMedia image={defaultImage} className={classes.media} />

			<CardContent className={classes.cardContent}>
				<div className={classes.handle} />
				<div className={classes.date} />
				<div className={classes.fullLine} />
				<div className={classes.fullLine} />
				<div className={classes.halfLine} />
			</CardContent>
		</Card>
	));
	return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostSkeleton);