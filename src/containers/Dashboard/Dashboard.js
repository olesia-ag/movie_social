import React from 'react';
import MoviesMain from '../MoviesMain/MoviesMain';
import classes from './Dashboard.module.css';

const Dashboard = (props) => {
	return (
		<div className={classes.Dashboard}>
			<div className={classes.MoviesContainer}>
			{/* display favorite movies here */}
			</div>
			<div className={classes.SocialContainer}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida ut
				dui vitae tincidunt. Aliquam tempus augue vel elit tincidunt
				consequat viverra urna non pretium. Nunc pellentesque augue ut justo
				condimentum dapibus. Aliquam venenatis molestie tempor. Proin ligula
				enim, tincidunt et est eu, sollicitudin cursus neque. Vivamus magna
				velit, grarta dolor enim, vel vulputate urna
				tincidunt non. Pellentesque vitae consequat est.
			</div>
		</div>
	);
};

export default Dashboard;
