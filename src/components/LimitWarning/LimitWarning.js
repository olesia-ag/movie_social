import React from 'react';
import { Link } from 'react-router-dom';

const LimitWarning = () => (
	<span>
		<h5>
			Thank you. You can add the maximum of 3 favorite movies. Need
			more? <Link to="/auth">Sign up!</Link>
		</h5>
	</span>
);

export default LimitWarning;
