import React from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from './NavigationItems/NavigationItems';
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggler';
import { pure } from 'recompose';

const Toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<DrawerToggle
				className={classes.mobileOnly}
				clicked={props.drawerToggleClicked}
				opened={props.sideDrawerOpen}
			/>
			<nav className={classes.DesktopOnly}>
				<NavigationItems />
			</nav>
		</header>
	);
};

export default pure(Toolbar);
