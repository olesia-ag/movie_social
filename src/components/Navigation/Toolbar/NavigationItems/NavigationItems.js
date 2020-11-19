import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { pure } from 'recompose';

const NavigationItems = (props) => {
	let navigationBar = (
		<>
			<NavigationItem link='/auth'>Sign up/Login</NavigationItem>
		</>
	);

	if (props.name && !props.isAuthenticated) {
		navigationBar = (
			<>
				Welcome back, {props.name}, , please{' '}
				<NavigationItem link='/auth'>Login</NavigationItem>
			</>
		);
	}

	if (props.isAuthenticated) {
		navigationBar = (
			<>
				<NavigationItem link='/'>Dashboard</NavigationItem>
				<NavigationItem link='/searchmovies'>Search Movies</NavigationItem>
				<NavigationItem link='/logout'>Logout</NavigationItem>
			</>
		);
	}

	return (
		<div className={classes.NavigationContainer}>
			<ul className={classes.NavigationList}>{navigationBar}</ul>
		</div>
	);
};

export default pure(NavigationItems);
