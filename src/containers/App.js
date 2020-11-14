import React from 'react';
import classes from './App.module.css';
import { Switch, Redirect, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Main from './Main';



function App() {
	let routes = (
		<Switch>
			<Route path='/' exact component={Main} />
			<Redirect to='/' />
		</Switch>
	);
	return (
		<div className={classes.App}>
			<Layout>{routes}</Layout>
		</div>
	);
}

export default App;
