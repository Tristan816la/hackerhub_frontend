import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import CustomButton from '../../utils/CustomButton';
import NewPost from '../post/NewPost';
import Notifications from './Notifications';
import ChatBot from '../Chatbot/ChatBot';
//Icons
import { Add as AddIcon, Home as HomeIcon } from '@material-ui/icons';

const NavToolbar = styled(Toolbar)`
	margin: auto;
	& svg {
		color : #ffffff;
	}
`;

const NavBar = (props) => {
	const { authenticated } = props;
	return (
		<AppBar>
			<NavToolbar>
				{authenticated ? (
					<Fragment>
						<NewPost />
						<Link to="/">
							<CustomButton tip="Home">
								<HomeIcon style={{ color: '#ffffff' }} />
							</CustomButton>
						</Link>
						<Notifications />
						<ChatBot />
					</Fragment>
				) : (
					<Fragment>
						<Button color="inherit" component={Link} to="/login">
							Login
						</Button>
						<Button color="inherit" component={Link} to="/">
							Home
						</Button>
						<Button color="inherit" component={Link} to="/signup">
							Sign up
						</Button>
						<ChatBot />
					</Fragment>
				)}
			</NavToolbar>
		</AppBar>
	);
};
NavBar.propTypes = {
	authenticated: PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated
});
export default connect(mapStateToProps)(NavBar);
