import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { pure } from 'recompose';

const NavigationItems = (props) => {
	return (
		<div className={classes.NavigationContainer}>
			<ul className={classes.NavigationList}>
				<NavigationItem link='#'>MENU ITEM 1</NavigationItem>
				<NavigationItem link='#' exact>
					MENU ITEM 2
				</NavigationItem>
				<NavigationItem link='#' exact>
					MENU ITEM 3
				</NavigationItem>
			</ul>
		</div>
	);
};

export default pure(NavigationItems);
