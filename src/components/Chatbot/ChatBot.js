import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CustomButton from '../../utils/CustomButton';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import './ChatBot.css';
import Response from './Response';
import { newChat, clearErrors } from '../../redux/actions/dataAction';

const styles = (theme) => ({
	...theme.pageStyles,
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h5">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(6)
	}
}))(MuiDialogContent);

const ChatBot = (props) => {
	const { classes } = props;
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

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		props.newChat({ body: body });
	};
	const handleChange = (event) => {
		setBody(event.target.value);
	};

	return (
		<div>
			<CustomButton color="primary" tip="chatbot" onClick={handleClickOpen}>
				<ChatBubbleIcon />
			</CustomButton>
			<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Hello Hacker
				</DialogTitle>
				<DialogContent dividers>
					<Response />
				</DialogContent>
				<DialogContent>
					<form onSubmit={handleSubmit}>
						<TextField
							name="bot"
							type="text"
							error={errors.body ? true : false}
							placeholder="Ask your question here!"
							fullWidth
							helperText={errors.body}
							className={classes.textField}
							onChange={handleChange}
						/>
						<hr className={classes.invisibleSeparator} />
						<hr className={classes.invisibleSeparator} />
						<hr className={classes.invisibleSeparator} />
						<hr className={classes.invisibleSeparator} />
						<Button type="submit" color="primary" variant="contained">
							Submit
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};
const mapStateToProps = (state) => ({
	UI: state.UI
});
export default connect(mapStateToProps, { newChat, clearErrors })(withStyles(styles)(ChatBot));
