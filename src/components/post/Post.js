import React from 'react';
//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ChatIcon from '@material-ui/icons/Chat';

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import theme from '../../utils/theme';
import { connect } from 'react-redux';
import CustomButton from '../../utils/CustomButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';

const styles = {
	...theme.pageStyles
};

const Post = (props) => {
	const {
		classes,
		post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount },
		user: { authenticated, credentials: { handle } }
	} = props;

	const deleteButton = authenticated && userHandle === handle ? <DeletePost postId={postId} /> : null;
	dayjs.extend(relativeTime);
	return (
		<Card className={classes.card}>
			<CardMedia image={userImage} className={classes.postImage} title="Profile image" />
			<CardContent className={classes.content}>
				<Typography
					variant="h5"
					component={Link}
					to={`users/${userHandle}`}
					style={{ textDecoration: 'none' }}
					color="primary"
				>
					{userHandle}
				</Typography>
				{deleteButton}
				<Typography variant="body2" color="textSecondary">
					{dayjs(createdAt).fromNow()}
				</Typography>
				<Typography variant="body1">{body}</Typography>
				<LikeButton postId={postId} />
				<span>{likeCount} Likes</span>
				<CustomButton tip="comments">
					<ChatIcon color="primary" />
				</CustomButton>
				<span>{commentCount} comments</span>
				<PostDialog postId={postId} userHandle={userHandle} openDialog={props.openDialog} />
			</CardContent>
		</Card>
	);
};
Post.propTypes = {
	user: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	openDialog: PropTypes.bool
};
const mapStateToProps = (state) => ({
	user: state.user
});
export default connect(mapStateToProps)(withStyles(styles)(Post));
