import React, { useEffect } from 'react';
import classes from './App.module.css';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import Layout from './containers/hoc/Layout/Layout';
import MoviesMain from './containers/MoviesMain/MoviesMain';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Dashboard from './containers/Dashboard/Dashboard';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const App = (props) => {
	const { onTryAutoSignIn, auth, fetchFavorites } = props;
	useEffect(() => onTryAutoSignIn(), [onTryAutoSignIn]);

	useEffect(() => {
		fetchFavorites(auth);
	}, [auth, fetchFavorites]);

	let routes = (
		<Switch>
			<Route path='/' exact component={MoviesMain} />
			<Route path='/auth' render={(props) => <Auth />} />
			<Redirect to='/' />
		</Switch>
	);

	if (props.auth) {
		routes = (
			<Switch>
				<Route path='/' exact render={(props) => <Dashboard {...props} />} />
				<Route path='/searchmovies' exact component={MoviesMain} />
				<Route path='/logout' component={Logout} />
				<Route path='/auth' render={(props) => <Auth />} />
				<Redirect to='/' />
			</Switch>
		);
	}

	return (
		<div className={classes.App}>
			<Layout>{routes}</Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: !!state.auth.idToken,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignIn: () => dispatch(actions.authCheckState()),
		fetchFavorites: (auth) => dispatch(actions.fetchFavorites()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
