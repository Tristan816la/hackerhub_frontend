import React from 'react';
import CustomButton from '../../utils/CustomButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataAction';

const LikeButton = (props) => {
	const { authenticated } = props.user;
	const postId = props.postId;
	const likedPost = () => {
		if (props.user.likes && props.user.likes.find((like) => like.postId === postId)) {
			return true;
		} else return false;
	};
	const likePost = () => {
		props.likePost(postId);
	};
	const unlikePost = () => {
		props.unlikePost(postId);
	};
	const likeButton = !authenticated ? (
		<Link to="/login">
			<CustomButton tip="like">
				<FavoriteBorder color="primary" />
			</CustomButton>
		</Link>
	) : likedPost() ? (
		<CustomButton tip="Undo like" onClick={unlikePost}>
			<FavoriteIcon color="primary" />
		</CustomButton>
	) : (
		<CustomButton tip="Like" onClick={likePost}>
			<FavoriteBorder color="primary" />
		</CustomButton>
	);
	return likeButton;
};

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	user: state.user
});
const mapActionsToProps = {
	likePost,
	unlikePost
};
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
