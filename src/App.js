import React from 'react';
import classes from './App.module.css';
import { Switch, Redirect, Route } from 'react-router-dom';
import PrivateRoute from './containers/hoc/PrivateRoute';
import Layout from './containers/hoc/Layout/Layout';
import MoviesMain from './containers/MoviesMain/MoviesMain';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Dashboard from './containers/Dashboard/Dashboard';
import FriendsMain from './containers/FriendsMain/FriendsMain';


const App = () => {

	let routes = (
		<Switch>
			<PrivateRoute path='/searchmovies' component={MoviesMain} />
			<PrivateRoute path='/friends' component={FriendsMain} />
			<PrivateRoute path='/logout' component={Logout} />
			<PrivateRoute path='/main' component={Dashboard} />
			<Route path='/auth' component={Auth} />
			<Route path='/' exact component={MoviesMain} />
			<Redirect to='/' />
		</Switch>
	);

	return (
		<div className={classes.App}>
			<Layout>{routes}</Layout>
		</div>
	);
};



export default App;
