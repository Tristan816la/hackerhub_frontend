import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../utils/CustomButton';
import { DialogTitle, DialogContent, Dialog, Button, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

//Redux
import { connect } from 'react-redux';
import { newPost, clearErrors } from '../../redux/actions/dataAction';
const styles = (theme) => ({
	...theme.pageStyles,
	submitButton: {
		position: 'relative',
		float: 'right',
		marginTop: 10
	},
	progressSpinner: {
		position: 'absolute'
	},
	closeButton: {
		position: 'absolute',
		left: '91%',
		top: '6%'
	}
});
const NewPost = (props) => {
	const [ open, setOpen ] = useState(false);
	const [ body, setBody ] = useState('');
	const [ errors, setErrors ] = useState({});

	useEffect(
		() => {
			if (props.UI.errors) {
				setErrors(props.UI.errors);
			}
			if (!props.UI.errors && !props.UI.loading) {
				setBody('');
				handleClose();
			}
		},
		[ props.UI.errors, props.UI.loading ]
	);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		props.clearErrors();
		setErrors({});
		setOpen(false);
	};
	const handleChange = (event) => {
		setBody(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		props.newPost({ body: body });
	};
	const { classes, UI: { loading } } = props;
	return (
		<Fragment>
			<CustomButton onClick={handleOpen} tip="Create a new Post!">
				<AddIcon />
			</CustomButton>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<CustomButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
					<CloseIcon />
				</CustomButton>
				<DialogTitle>Make a new post</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit}>
						<TextField
							name="body"
							type="text"
							label="POST!"
							multiline
							rows="3"
							placeholder="Post with your fellow hackers"
							error={errors.body ? true : false}
							helperText={errors.body}
							className={classes.textField}
							onChange={handleChange}
							fullWidth
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.submitButton}
							disabled={loading}
						>
							Submit
							{loading && <CircularProgress size={30} className={classes.progressSpinner} />}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</Fragment>
	);
};
NewPost.propTypes = {
	newPost: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	UI: state.UI
});
export default connect(mapStateToProps, { newPost, clearErrors })(withStyles(styles)(NewPost));
