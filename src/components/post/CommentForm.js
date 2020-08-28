import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//Redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataAction';

const styles = (theme) => ({
	...theme.pageStyles
});
const CommentForm = (props) => {
	const { classes, authenticated } = props;
	const [ errors, setErrors ] = useState({});
	const [ body, setBody ] = useState('');
	useEffect(
		() => {
			if (props.UI.errors) {
				setErrors(props.UI.errors);
			}
			if (!props.UI.errors && !props.UI.loading) {
				setBody('');
			}
		},
		[ props.UI.errors ]
	);
	const handleChange = (event) => {
		setBody(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		props.submitComment(props.postId, { body });
	};
	const commentFormMarkup = authenticated ? (
		<Grid item sm={12} style={{ textAlign: 'center' }}>
			<form onSubmit={handleSubmit}>
				<TextField
					name="body"
					type="text"
					label="Comment on post"
					error={errors.error ? true : false}
					helperText={errors.error}
					value={body}
					onChange={handleChange}
					fullWidth
					className={classes.textField}
				/>
				<Button type="submit" variant="contained" color="primary" className={classes.button}>
					Submit
				</Button>
			</form>
			<hr className={classes.visibaleSeperator} />
		</Grid>
	) : null;
	return commentFormMarkup;
};
CommentForm.propTypes = {
	submitComment: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	authenticate: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
	UI: state.UI,
	authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
