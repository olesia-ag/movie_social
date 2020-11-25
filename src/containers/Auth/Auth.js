import React, { useEffect, useState } from 'react';
import { checkValidity, checkMatch } from '../../shared/utility';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import { withFirebase } from '../../firebase/context';
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
	}, [props.signIn]);

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
		if (signIn) {
			if (checkValidFields(false)) {
				props.onAuth(
					{ email: email.value, password: password.value },
					false,
					props.firebase
				);
			} else {
				setFormInvalid(true);
			}
		} else {
			if (checkValidFields(true)) {
				props.onAuth(
					{ email: email.value, password: password.value, name: name.value },
					true,
					props.firebase
				);
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
						} else return null;
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
					className={classes.AuthInput}
					type='text'
					name='name'
					value={name.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<label className={classes.AuthLabel} htmlFor='email'>
					Email
				</label>
				<input
					className={classes.AuthInput}
					type='email'
					name='email'
					value={email.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<label className={classes.AuthLabel} htmlFor='password'>
					Password
				</label>
				<input
					className={classes.AuthInput}
					type='password'
					name='password'
					value={password.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<label className={classes.AuthLabel} htmlFor='repeatPassword'>
					Re-enter password
				</label>
				<input
					className={classes.AuthInput}
					type='password'
					name='repeatPassword'
					value={repeatPassword.value}
					onChange={(e) => inputChangedHandler(e)}
				/>
				<Button>Submit</Button>
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
						className={classes.AuthInput}
						type='email'
						name='email'
						value={email.value}
						onChange={(e) => inputChangedHandler(e)}
					/>
					<label className={classes.AuthLabel} htmlFor='password'>
						Password
					</label>
					<input
						className={classes.AuthInput}
						type='password'
						name='password'
						value={password.value}
						onChange={(e) => inputChangedHandler(e)}
					/>
					<Button>Submit</Button>
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
	//look into Redirect 'flashing' behavior
	let authRedirect = null;
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
		onAuth: (userData, isSignup, firebase) =>
			dispatch(actions.auth(userData, isSignup, firebase)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirect('/')),
		authClear: () => dispatch(actions.authClear()),
	};
};

// Auth.whyDidYouRender = true;

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(Auth));
