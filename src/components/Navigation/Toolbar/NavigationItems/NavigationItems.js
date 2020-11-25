import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { pure } from 'recompose';

const NavigationItems = (props) => {
	return (
		<div className={classes.NavigationContainer}>
			<ul className={classes.NavigationList}>
				{props.isAuthenticated ? (
					<>
						<span>Welcome back, {props.name} </span>
						<NavigationItem link='/main'>Dashboard</NavigationItem>
						<NavigationItem link='/searchmovies'>Search Movies</NavigationItem>
						<NavigationItem link='/logout'>Logout</NavigationItem>
					</>
				) : (
					<>
						<NavigationItem link='/auth'>Sign up/Login</NavigationItem>
					</>
				)}
			</ul>
		</div>
	);
};

export default pure(NavigationItems);
