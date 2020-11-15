import React, { useState } from 'react';
import { checkValidity, checkMatch } from '../../shared/utility';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';


const Auth = (props) => {
  console.log('props', props)
  const [signIn, setSignIn] = useState(false);
  const [authError, setAuthError] = useState(null);
	const [name, setName] = useState({
		placeholder: 'your name',
		value: '',
		validation: {
			required: true,
			alphabeticOnly: true,
		},
		valid: false,
		touched: false,
	});
	const [email, setEmail] = useState({
		placeholder: 'your email',
		value: '',
		validation: {
			required: true,
			isEmail: true,
		},
		valid: false,
		touched: false,
	});
	const [password, setPassword] = useState({
		value: '',
		placeholder: 'password',
		validation: {
			required: true,
			minLength: 6,
		},
		valid: true,
		touched: false,
	});

	const [repeatPassword, setRepeatPassword] = useState({
		value: '',
		placeholder: 'repeat password',
		validation: {
			required: true,
		},
		valid: true,
		touched: false,
	});
	const [formInvalid, setFormInvalid] = useState(false);
	const [errorMessages, setErrorMessages] = useState({
		nameError: '',
		emailError: '',
		passwordError: '',
		repeatPasswordError: '',
	});

	const inputChangedHandler = (event) => {
		const property = event.target.name;
		const value = event.target.value;
		switch (property) {
			case 'name':
				setName((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
			case 'email':
				setEmail((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
			case 'password':
				setPassword((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
			case 'repeatPassword':
				setRepeatPassword((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
			default:
				console.warn('unhandled input name!');
				break;
		}
	};

	const checkValidFields = () => {
		let errors = 0;
		if (!checkValidity(name.value, name.validation)) {
			errors++;
			setErrorMessages((prev) => {
				return { ...prev, nameError: 'Enter your name' };
			});
		}
		if (!checkValidity(email.value, email.validation)) {
			errors++;
			setErrorMessages((prev) => {
				return { ...prev, emailError: 'Enter a valid email address' };
			});
		}
		if (!checkValidity(password.value, password.validation)) {
			errors++;
			setErrorMessages((prev) => {
				return {
					...prev,
					passwordError: 'Passwords must be at least 6 characters',
				};
			});
		}
		if (!checkMatch(repeatPassword.value, password.value)) {
			errors++;
			setErrorMessages((prev) => {
				return { ...prev, repeatPasswordError: 'Passwords must match' };
			});
		}
		if (errors) return false;
		else return true;
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (checkValidFields()) {
      props.onAuth(email.value, password.value, true, props.firebase)
			console.log(
				name.value,
				' ',
				email.value,
				' ',
				password.value,
				' ',
				repeatPassword.value
			);
		} else {
			setFormInvalid(true);
		}
	};

	let displayError = null;

	if (formInvalid) {
		const arrayOfErrors = [];
		for (const property in errorMessages) {
			arrayOfErrors.push(errorMessages[property]);
		}
		displayError = (
			<div>
				<h5>There was a problem</h5>
				<ul>
					{arrayOfErrors.map((msg) => {
						if (msg.length) {
							return <li key={msg}>{msg}</li>;
						}
					})}
				</ul>
			</div>
		);
	}

	let form = (
		<div>
			{formInvalid ? displayError : null}
			<form onSubmit={submitHandler}>
				<h3>Create account</h3>
				<label htmlFor='name'>Your name</label>
				<input
					type='text'
					name='name'
					value={name.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					name='email'
					value={email.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					value={password.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<label htmlFor='repeatPassword'>Re-enter password</label>
				<input
					type='password'
					name='repeatPassword'
					value={repeatPassword.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);

	if (signIn) {
		form = (
			<div>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					name='email'
					value={email.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					value={password.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
			</div>
		);
	}
	return <>{form}
  {props.error ? props.error.message : null }</>;
};

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: !!state.auth.idToken,
		authRedirect: state.auth.authRedirectPath,
		//also should be some state of favorite movies added already
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup, firebase) =>
			dispatch(actions.auth(email, password, isSignup, firebase)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect('/')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
