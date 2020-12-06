import React from 'react';
import classes from './DisplayRequests.module.css';
import SingleRequest from '../SingleRequest/SingleRequest';

const DisplayRequests = ({
	loading,
	error,
	requests,
	user,
	...rest
}) => {
	let displayRequests;
	if (loading) {
		displayRequests = <p>loading...</p>;
	} else if (error) {
    displayRequests = <p> error loading </p>;
  }else if (requests.length){
    displayRequests = (
				<div>
					<h5>requests:</h5>
					<ul>
            {requests.map((request) => {
              console.log('request:', request)
              return null
            }
            // (
						// 	<li key={request.id}>
						// 		<SingleRequest remove={() => {}} isFriend />
						// 	</li>
            // )
            )}
					</ul>
				</div>
			);
  }




	return (
		<div className={classes.DisplayFriendsContainer}>{displayRequests}</div>
	);
};

export default DisplayRequests;
