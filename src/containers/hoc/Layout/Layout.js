import React, { useState } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../../components/Navigation/Toolbar/SideDrawer/SideDrawer';
import Footer from '../../../components/Navigation/Footer/Footer';
import Modal from '../../../components/UI/Modal/Modal';
import { connect } from 'react-redux';

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
				isAuth={props.auth}
				name={props.name}
			/>
			<SideDrawer
				closed={sideDrawerClosedHandler}
				open={showSideDrawer}
				isAuth={props.auth}
			/>
			<Modal />
			<main className={classes.Content}>{props.children}</main>
			<Footer />
		</div>
	);
};

// Layout.whyDidYouRender = true;

const mapStateToProps = (state) => {
	return {
		auth: !!state.auth.idToken,
		name: state.auth.name,
	};
};

export default connect(mapStateToProps)(Layout);
