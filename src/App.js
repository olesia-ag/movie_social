import React, { useEffect } from 'react';
import classes from './App.module.css';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import Layout from './containers/hoc/Layout/Layout';
import MoviesMain from './containers/MoviesMain/MoviesMain';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Dashboard from './containers/Dashboard/Dashboard';
import FriendsMain from './containers/FriendsMain/FriendsMain';
import { withFirebase } from './firebase/context';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const App = (props) => {
	const { onTryAutoSignIn, auth, fetchFavorites, firebase, userId } = props;

	useEffect(() => onTryAutoSignIn(), [onTryAutoSignIn]);

	useEffect(() => {
		fetchFavorites(userId, firebase);
	}, [userId]);

	// let routes = (
	// 	<Switch>
	// 		<Route path='/' exact component={MoviesMain} />
	// 		<Route path='/auth' render={(props) => <Auth />} />
	// 		<Redirect to='/' />
	// 	</Switch>
	// );

	// if (props.auth) {
	let routes = (
		<Switch>
			<Route path='/' exact render={(props) => <Dashboard {...props} />} />
			<Route path='/searchmovies' exact component={MoviesMain} />
			<Route path='/friends' exact component={FriendsMain} />
			<Route path='/logout' component={Logout} />
			<Route path='/auth' render={(props) => <Auth />} />
			<Redirect to='/' />
		</Switch>
	);
	// }

	return (
		<div className={classes.App}>
			<Layout>{routes}</Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: !!state.auth.idToken,
		userId: state.auth.userId
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignIn: () => dispatch(actions.authCheckState()),
		fetchFavorites: (userId, firebase) =>
			dispatch(actions.fetchFavorites(userId, firebase)),
	};
};

export default withRouter((connect(mapStateToProps, mapDispatchToProps))(withFirebase(App)));
