import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataAction';
import Grid from '@material-ui/core/Grid';
import Post from '../components/post/Post.js';
import Profile from '../components/profile/Profile';
import PostSkeleton from '../utils/PostSkeleton';
const Home = (props) => {
	useEffect(
		() => {
			props.getPosts();
		},
		[ Profile ]
	);
	const { posts, loading } = props.data;
	let recentPostMarkUp = !loading ? posts.map((post) => <Post key={post.postId} post={post} />) : <PostSkeleton />;
	return (
		<Grid container spacing={10}>
			<Grid item sm={8} xs={12}>
				{recentPostMarkUp}
			</Grid>
			<Grid item sm={4} xs={12}>
				<Profile />
			</Grid>
		</Grid>
	);
};
Home.propTypes = {
	getPosts: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	data: state.data
});
export default connect(mapStateToProps, { getPosts })(Home);
