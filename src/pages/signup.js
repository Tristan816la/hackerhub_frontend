import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Icon from '../images/signupicon.png';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
	...theme.pageStyles
});

const Signup = (props) => {
	const { classes, UI: { loading } } = props;
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ handle, setHandle ] = useState('');
	const [ errors, setErrors ] = useState({});
	const history = useHistory();
	useEffect(
		() => {
			if (props.UI.errors) {
				setErrors(props.UI.errors);
			}
		},
		[ props.UI.errors ]
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		const newUserData = {
			email,
			password,
			confirmPassword,
			handle
		};
		props.signupUser(newUserData, history);
	};
	const handleEmail = (event) => {
		setEmail(event.target.value);
	};
	const handlePassword = (event) => {
		setPassword(event.target.value);
	};
	const handleConfirmPassword = (event) => {
		setConfirmPassword(event.target.value);
	};
	const handleHandle = (event) => {
		setHandle(event.target.value);
	};
	return (
		<Grid container className={classes.form}>
			<Grid item sm />
			<Grid item sm className={classes.item}>
				<img src={Icon} alt="icon" className={classes.image} />
				<Typography variant="h2" className={classes.pageTitle}>
					Signup
				</Typography>
				<form noValidate onSubmit={handleSubmit}>
					<TextField
						id="email"
						name="email"
						type="email"
						label="Email"
						className={classes.textField}
						value={email}
						helperText={errors.email}
						error={errors.email ? true : false}
						onChange={handleEmail}
						fullWidth
					/>
					<TextField
						id="password"
						name="password"
						type="password"
						label="Password"
						className={classes.textField}
						value={password}
						helperText={errors.password}
						error={errors.password ? true : false}
						onChange={handlePassword}
						fullWidth
					/>
					{errors.general && (
						<Typography variant="body2" className={classes.generalError}>
							{errors.general}
						</Typography>
					)}
					<TextField
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						label="Confirm Password"
						className={classes.textField}
						value={confirmPassword}
						helperText={errors.confirmPassword}
						error={errors.confirmPassword ? true : false}
						onChange={handleConfirmPassword}
						fullWidth
					/>
					<TextField
						id="handle"
						name="handle"
						type="text"
						label="Handle"
						className={classes.textField}
						value={handle}
						helperText={errors.handle}
						error={errors.handle ? true : false}
						onChange={handleHandle}
						fullWidth
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={classes.button}
						disabled={loading}
					>
						Signup
						{loading && <CircularProgress size={30} className={classes.progress} />}
					</Button>
					<br />
					<br />
					<small>
						Already have an account? login <Link to="/login">here</Link>
					</small>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	);
};

Signup.ProTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup));
