import {
	SET_POSTS,
	LIKE_POST,
	UNLIKE_POST,
	LOADING_DATA,
	DELETE_POST,
	SET_ERRORS,
	CLEAR_ERRORS,
	NEW_POST,
	LOADING_UI,
	STOP_LOADING_UI,
	SET_POST,
	SUBMIT_COMMENT,
	NEW_CHAT
} from '../types';
import axios from 'axios';

// Get All Posts
export const getPosts = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/posts')
		.then((res) => {
			dispatch({
				type: SET_POSTS,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_POSTS,
				payload: []
			});
		});
};
export const newPost = (newP) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/posts', newP)
		.then((res) => {
			dispatch({
				type: NEW_POST,
				payload: res.data
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

export const newChat = (newC) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/chatbot', newC)
		.then((res) => {
			dispatch({
				type: NEW_CHAT,
				payload: res.data
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};
// Like a Post
export const likePost = (postId) => (dispatch) => {
	axios
		.get(`/posts/${postId}/like`)
		.then((res) => {
			dispatch({ type: LIKE_POST, payload: res.data });
		})
		.catch((err) => console.log(err));
};

// Unlike a Post
export const unlikePost = (postId) => (dispatch) => {
	axios
		.get(`/posts/${postId}/unlike`)
		.then((res) => {
			dispatch({ type: UNLIKE_POST, payload: res.data });
		})
		.catch((err) => console.log(err));
};

export const deletePost = (postId) => (dispatch) => {
	axios
		.delete(`/posts/${postId}`)
		.then(() => {
			dispatch({ type: DELETE_POST, payload: postId });
		})
		.catch((err) => console.log(err));
};

export const getPost = (postId) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.get(`/posts/${postId}`)
		.then((res) => {
			dispatch({ type: SET_POST, payload: res.data });
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch((err) => console.log(err));
};

// Submit comment
export const submitComment = (postId, commentData) => (dispatch) => {
	axios
		.post(`/posts/${postId}/comment`, commentData)
		.then((res) => {
			dispatch({
				type: SUBMIT_COMMENT,
				payload: res.data
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

export const getUserPage = (userHandle) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/user/${userHandle}`)
		.then((res) => {
			dispatch({ type: SET_POSTS, payload: res.data.posts });
		})
		.catch(() => {
			dispatch({ type: SET_POSTS, payload: null });
		});
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
