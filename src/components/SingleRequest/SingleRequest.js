import React from 'react';
import Button from '../UI/Button/Button';
import classes from './SingleRequest.module.css';

const SingleRequest = ({
	name,
	friendId,
	userId,
	incoming,
	confirmRequest,
	declineRequest,
	cancelRequest,
}) => {
	return (
		<div className={classes.SingleRequestContainer}>
			<span className={classes.SingleRequest}>{name}</span>
			<span className={classes.Button}>
				{incoming ? (
					<>
						<Button clicked={confirmRequest}>confirm</Button>
						<Button clicked={declineRequest}>decline</Button>
					</>
				) : (
					<Button clicked={cancelRequest}>cancel</Button>
				)}
			</span>
		</div>
	);
};

export default SingleRequest;
