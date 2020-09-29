import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../utils/CustomButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import ChatIcon from '@material-ui/icons/Chat';
import Comments from './Comments';
import CommentForm from './CommentForm';

//MUI
import { DialogContent, Dialog, Button, Grid, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

//Redux
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataAction';
import { UnfoldMore } from '@material-ui/icons';

const styles = (theme) => ({
	...theme.pageStyles,
	invisibleSeperator: {
		border: 'none',
		margin: 4
	},
	profileImage: {
		maxWidth: 175,
		height: 175,
		borderRadius: '50%',
		objectFit: 'cover'
	},
	dialogContent: {
		padding: 40
	},
	closeButton: {
		position: 'absolute',
		left: '90%'
	},
	expandButton: {
		position: 'absolute',
		left: '90%'
	},
	spinner: {
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 50
	}
});

const PostDialog = (props) => {
	const [ open, setOpen ] = useState(false);
	const [ oldPath, setOldPath ] = useState('');
	const [ newPath, setNewPath ] = useState('');

	const handleOpen = () => {
		let oldPath = window.location.pathname;
		const { userHandle, postId } = props;
		const newPath = `/users/${userHandle}/post/${postId}`;
		if (oldPath === newPath) oldPath = `/users/${userHandle}`;
		window.history.pushState(null, null, newPath);
		setOpen(true);
		setOldPath(oldPath);
		setNewPath(newPath);
		props.getPost(props.postId);
	};
	const handleClose = () => {
		window.history.pushState(null, null, oldPath);
		setOpen(false);
		props.clearErrors();
	};
	useEffect(() => {
		if (props.openDialog) {
			handleOpen();
		}
	}, []);
	const {
		classes,
		post: { postId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments },
		UI: { loading }
	} = props;
	const dialogMarKup = loading ? (
		<div className={classes.spinner}>
			<CircularProgress size={200} thickness={2} />
		</div>
	) : (
		<Grid container spacing={8}>
			<Grid item sm={5}>
				<img src={userImage} alt="Profile" className={classes.profileImage} />
			</Grid>
			<Grid item sm={7}>
				<Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
					@{userHandle}
				</Typography>
				<hr className={classes.invisibleSeperator} />
				<Typography variant="body2" color="textSecondary">
					{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
				</Typography>
				<hr className={classes.invisibleSeperator} />
				<Typography variant="body1">{body}</Typography>
				<LikeButton postId={postId} />
				<span>{likeCount} likes</span>
				<CustomButton tip="comments">
					<ChatIcon color="primary" />
				</CustomButton>
				<span>{commentCount} comments</span>
			</Grid>
			<hr className={classes.visibleSeperater} />
			<CommentForm postId={postId} />
			<Comments comments={comments} />
		</Grid>
	);
	return (
		<Fragment>
			<CustomButton onClick={handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
				<UnfoldMore color="primary" />
			</CustomButton>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<CustomButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
					<CloseIcon />
				</CustomButton>
				<DialogContent className={classes.dialogContent}>{dialogMarKup}</DialogContent>
			</Dialog>
		</Fragment>
	);
};

PostDialog.propTypes = {
	getPost: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	post: PropTypes.array.isRequired,
	UI: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	post: state.data.post,
	UI: state.UI
});

const mapActionsToProps = {
	getPost,
	clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));
