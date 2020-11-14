import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const NavigationItem = React.memo((props) => {
	let finalAddress = null;
	const link=props.link
	if (link === 'resume') {
		finalAddress = <span onClick={() => props.openResume()}>RESUME</span>;
	}
	else if (link[1] === '#') {
		finalAddress = (
			<HashLink smooth to={`${link}`}>
				{props.children}
			</HashLink>
		);
	} else {
		finalAddress = (
			<NavLink to={`${link}`} exact={props.exact}>
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
