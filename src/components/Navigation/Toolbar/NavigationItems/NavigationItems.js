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
						<NavigationItem link='/'>Welcome, {props.name} </NavigationItem>
						<NavigationItem link='/friends'>Find Friends</NavigationItem>
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
