import React, {
	useState,
	useReducer,
	useEffect,
	useContext,
	useRef,
} from 'react';
import AuthContext from '../../store/auth-context';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const Login = (props) => {
	const [formIsValid, setFormIsValid] = useState(false);

	const emailReducer = (state, action) => {
		if (action.type === 'USER_INPUT') {
			return { value: action.val, isValid: action.val.includes('@') };
		}
		if (action.type === 'INPUT_BLUR') {
			return { value: state.value, isValid: state.value.includes('@') };
		}

		return { value: '', isValid: false };
	};

	const passwordReducer = (state, action) => {
		if (action.type === 'USER_INPUT') {
			return { value: action.val, isValid: action.val.length > 6 };
		}
		if (action.type === 'INPUT_BLUR') {
			return {
				value: state.value,
				isValid: state.value.length > 6,
			};
		}
		return { value: '', isValid: false };
	};

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});
	const ctx = useContext(AuthContext);
	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	useEffect(() => {
		const timerId = setTimeout(() => {
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		return () => {
			clearTimeout(timerId);
		};
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
	};
	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
	};
	const validateEmailHandler = () => {
		dispatchEmail({
			type: 'INPUT_BLUR',
		});
	};

	const validatePasswordHandler = () => {
		dispatchPassword({
			type: 'INPUT_BLUR',
		});
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			ctx.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsValid) {
			emailInputRef.current.activate();
		} else {
			passwordInputRef.current.activate();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					id="email"
					label="E-Mail"
					type="email"
					isValid={emailIsValid}
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<Input
					ref={passwordInputRef}
					id="password"
					label="Password"
					type="password"
					isValid={passwordIsValid}
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				<Button type="submit" className={classes.btn}>
					Login
				</Button>
			</form>
		</Card>
	);
};

export default Login;
