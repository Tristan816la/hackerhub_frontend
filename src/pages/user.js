import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../components/profile/StaticProfile';
import PostSkeleton from '../utils/PostSkeleton';
import ProfileSkeleton from '../utils/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserPage } from '../redux/actions/dataAction';

const User = (props) => {
	const [ profile, setProfile ] = useState(null);
	const [ postPram, setPostParam ] = useState(null);
	useEffect(() => {
		const handle = props.match.params.handle;
		const postId = props.match.params.postId;

		if (postId) setPostParam(postId);
		props.getUserPage(handle);
		axios
			.get(`/user/${handle}`)
			.then((res) => {
				setProfile(res.data.user);
			})
			.catch((err) => console.log(err));
	}, []);
	const { posts, loading } = props.data;
	const postsMarkup = loading ? (
		<PostSkeleton />
	) : posts === null ? (
		<p>No posts from this user</p>
	) : !postPram ? (
		posts.map((post) => <Post key={post.postId} post={post} />)
	) : (
		posts.map((post) => {
			if (post.postId !== postPram) return <Post key={post.postId} post={post} />;
			else return <Post key={post.postId} post={post} openDialog />;
		})
	);
	return (
		<Grid container spacing={10}>
			<Grid item sm={8} xs={12}>
				{postsMarkup}
			</Grid>
			<Grid item sm={4} xs={12}>
				{profile === null ? <ProfileSkeleton /> : <StaticProfile profile={profile} />}
			</Grid>
		</Grid>
	);
};
User.propTypes = {
	getUserPage: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	data: state.data
});

export default connect(mapStateToProps, { getUserPage })(User);
