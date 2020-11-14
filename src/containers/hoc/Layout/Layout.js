import React, { useState } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../../components/Navigation/Toolbar/SideDrawer/SideDrawer';
import Footer from '../../../components/Navigation/Footer/Footer';
import Modal from '../../../components/UI/Modal/Modal'

const Layout = (props) => {
	const [showSideDrawer, switchShowSideDrawer] = useState(false);

	const sideDrawerClosedHandler = () => {
		switchShowSideDrawer(false);
	};

	const sideDrawerToggleHandler = () => {
		switchShowSideDrawer(!showSideDrawer);
	};

	return (
		<div className={classes.Layout}>
			<Toolbar
				drawerToggleClicked={sideDrawerToggleHandler}
				sideDrawerOpen={showSideDrawer}
			/>
			<SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
			<Modal />
			<main className={classes.Content}>{props.children}</main>
			<Footer />
		</div>
	);
};

Layout.whyDidYouRender = true;

export default Layout;
