import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import CustomButton from '../../utils/CustomButton';
import { useState } from 'react';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/dataAction';

const styles = {
	deleteButton: {
		position: 'absolute',
		left: '90%',
		top: '10%'
	}
};
const DeletePost = (props) => {
	const { classes } = props;
	const [ open, setOpen ] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const deletePost = () => {
		props.deletePost(props.postId);
		setOpen(false);
	};
	return (
		<Fragment>
			<CustomButton tip="Delete Post" onClick={handleOpen} btnClassName={classes.deleteButton}>
				<DeleteOutline color="secondary" />
			</CustomButton>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>Are you sure you want to delete this post?</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						No
					</Button>
					<Button onClick={deletePost} color="secondary">
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

DeletePost.propTypes = {
	deletePost: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired
};

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
