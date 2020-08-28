import React from 'react';
// MUI
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Pages & Components
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import NavBar from './components/layout/NavBar';
import user from './pages/user';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

//Utility
import jwtDecode from 'jwt-decode';
import styled from 'styled-components';
import themeFile from './utils/theme';
import AuthRoute from './utils/AuthRoute';
import axios from 'axios';

axios.defaults.baseURL = 'https://us-central1-hackerhub-420f2.cloudfunctions.net/api';

const AppStyle = styled.div`
	margin: 80px auto 0 auto;
	max-width: 1200px;
`;
const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

const App = () => {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<Router>
					<NavBar />
					<AppStyle>
						<Switch>
							<Route exact path="/" component={Home} />
							<AuthRoute exact path="/login" component={Login} />
							<AuthRoute exact path="/signup" component={Signup} />
							<Route exact path="/users/:handle" component={user} />
							<Route exact path="/users/:handle/post/:postId" component={user} />
						</Switch>
					</AppStyle>
				</Router>
			</Provider>
		</MuiThemeProvider>
	);
};

export default App;
