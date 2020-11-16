import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const NavigationItem = React.memo((props) => {

	let finalAddress = null;
	if (props.link === 'resume') {
		finalAddress = <span onClick={() => props.openResume()}>RESUME</span>;
	}
	else if (props.link[1] === '#') {
		finalAddress = (
			<HashLink smooth to={`${props.link}`}>
				{props.children}
			</HashLink>
		);
	} else {
		finalAddress = (
			<NavLink to={`${props.link}`} exact={props.exact}>
				{props.children}
			</NavLink>
		);
	}
	return (
		<div>
			<li className={classes.NavigationItem}>{finalAddress}</li>
		</div>
	);
});


export default NavigationItem;
