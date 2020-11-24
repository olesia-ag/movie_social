import React, { useEffect, useState } from 'react';
import { withFirebase } from '../../firebase/context';
import classes from './FriendsMain.module.css';
import FindFriends from '../../components/FindFriends/FindFriends';
import DisplayFriends from '../../components/DisplayFriends/DisplayFriends';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const FriendsMain = (props) => {
	const [nameToFind, setNameToFind] = useState('');

	const submitHandler = (event) => {
		event.preventDefault();
	};

	const inputChangedHandler = (event) => {
		event.preventDefault();
		setNameToFind(event.target.value);
	};
console.log('friend')
	return (
		<div>
			<FindFriends
				findFriends={props.findFriends}
				submitHandler={submitHandler}
				inputChangedHandler={inputChangedHandler}
				nameToFind={nameToFind}
			/>
			<DisplayFriends error={props.error} loading={props.loading} friends={props.foundFriends} searchedFriend={nameToFind} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		foundFriends: state.user.foundFriends,
		error: state.user.error,
		loading: state.user.loading
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		findFriends: (name, firebase) =>
			dispatch(actions.findFriends(name, firebase)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withFirebase(FriendsMain));
