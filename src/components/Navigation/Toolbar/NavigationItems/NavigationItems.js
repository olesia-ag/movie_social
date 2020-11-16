import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { pure } from 'recompose';

const NavigationItems = (props) => {
	console.log('props', props);
	return (
		<div className={classes.NavigationContainer}>
			<ul className={classes.NavigationList}>
				<NavigationItem link='#'>MENU ITEM 1</NavigationItem>

				{props.isAuthenticated ? (
					<NavigationItem link='/logout'>Logout</NavigationItem>
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
