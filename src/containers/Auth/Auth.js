import React, { useEffect, useState } from 'react';
import { checkValidity, checkMatch } from '../../shared/utility';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import classes from './Auth.module.css';
import { Redirect } from 'react-router-dom';

const Auth = (props) => {
	const [signIn, setSignIn] = useState(false);
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

	useEffect(() => {
		if (props.signIn) {
			setSignIn(true);
		}
	}, []);

	const inputChangedHandler = (event) => {
		const property = event.target.name;
		const value = event.target.value;
		switch (property) {
			case 'name':
				setErrorMessages((prev) => {
					return { ...prev, nameError: '' };
				});
				setName((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
			case 'email':
				setErrorMessages((prev) => {
					return { ...prev, emailError: '' };
				});
				setEmail((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
			case 'password':
				setErrorMessages((prev) => {
					return {
						...prev,
						passwordError: '',
					};
				});
				setPassword((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
			case 'repeatPassword':
				setErrorMessages((prev) => {
					return {
						...prev,
						repeatPasswordError: '',
					};
				});
				setRepeatPassword((prev) => {
					return { ...prev, value, touched: true };
				});
				break;
			default:
				console.warn('unhandled input name!');
				break;
		}
	};

	const checkValidFields = (isSignUp) => {
		console.log('went to checkValidFields', isSignUp);
		let errors = 0;
		if (!checkValidity(name.value, name.validation) && isSignUp) {
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
		if (!checkValidity(password.value, password.validation) && isSignUp) {
			errors++;
			setErrorMessages((prev) => {
				return {
					...prev,
					passwordError: 'Passwords must be at least 6 characters',
				};
			});
		}
		if (!checkMatch(repeatPassword.value, password.value) && isSignUp) {
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
		console.log('went to submit handler');
		if (signIn) {
			if (checkValidFields(false)) {
				console.log('got to if');
				props.onAuth(email.value, password.value, false, props.firebase);
			} else {
				setFormInvalid(true);
			}
		} else {
			if (checkValidFields(true)) {
				console.log('got to else if');
				props.onAuth(email.value, password.value, true, props.firebase);
			} else {
				setFormInvalid(true);
			}
		}
	};

	const handleSwitchToSignIn = (e) => {
		e.preventDefault();
		props.authClear();
		setSignIn(true);
	};

	const handleSwitchToSignUp = (e) => {
		e.preventDefault();
		props.authClear();
		setSignIn(false);
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

	useEffect(() => {
		if (
			!errorMessages.nameError.length &&
			!errorMessages.emailError.length &&
			!errorMessages.passwordError.length &&
			!errorMessages.repeatPasswordError.length
		) {
			console.log('no errors');
			setFormInvalid(false);
		}
	}, [errorMessages]);

	let form = (
		<div className={classes.FormContainer}>
			{formInvalid ? displayError : null}
			<form className={classes.AuthForm} onSubmit={submitHandler}>
				<strong>Create account</strong>
				<h5>
					<a href='#' onClick={handleSwitchToSignIn}>
						{' '}
						Already a movie lover?{' '}
					</a>
				</h5>
				<label className={classes.AuthLabel} htmlFor='name'>
					Your name
				</label>
				<input
					type='text'
					name='name'
					value={name.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<label className={classes.AuthLabel} htmlFor='email'>
					Email
				</label>
				<input
					type='email'
					name='email'
					value={email.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<label className={classes.AuthLabel} htmlFor='password'>
					Password
				</label>
				<input
					type='password'
					name='password'
					value={password.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<label className={classes.AuthLabel} htmlFor='repeatPassword'>
					Re-enter password
				</label>
				<input
					type='password'
					name='repeatPassword'
					value={repeatPassword.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<button className={classes.AuthButton} type='submit'>
					Submit
				</button>
			</form>
		</div>
	);

	//need to refactor? - change css display for form elements based on props.signIn
	if (signIn) {
		form = (
			<div className={classes.FormContainer}>
				{formInvalid ? displayError : null}
				<form className={classes.AuthForm} onSubmit={submitHandler}>
					<strong>Sign in</strong>
					<h5>
						<a href='#' onClick={handleSwitchToSignUp}>
							{' '}
							or become a movie lover{' '}
						</a>
					</h5>
					<label className={classes.AuthLabel} htmlFor='email'>
						Email
					</label>
					<input
						type='email'
						name='email'
						value={email.value}
						onChange={(e) => inputChangedHandler(e)}
					/>
					<label className={classes.AuthLabel} htmlFor='password'>
						Password
					</label>
					<input
						type='password'
						name='password'
						value={password.value}
						onChange={(e) => inputChangedHandler(e)}
					/>
					<button className={classes.AuthButton} type='submit'>
						Submit
					</button>
				</form>
			</div>
		);
	}

	let authError = null;
	if (props.error) {
		if (props.error.code === 'auth/email-already-in-use') {
			authError = (
				<span className={classes.AuthError}>
					{props.error.message}
					<a href='#' onClick={handleSwitchToSignIn}>
						{' '}
						Login instead{' '}
					</a>
				</span>
			);
		} else {
			authError = (
				<span className={classes.AuthError}>
					Sorry, it went wrong. {props.error.message}{' '}
				</span>
			);
		}
	}

	let authRedirect = null;
	console.log('isAuthenticated', props.isAuthenticated)
	if (props.isAuthenticated) {
		authRedirect = <Redirect to={props.authRedirect} />;
	}
	return (
		<>
			{authRedirect}
			{form}
			{authError}
		</>
	);
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
		authClear: () => dispatch(actions.authClear()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
