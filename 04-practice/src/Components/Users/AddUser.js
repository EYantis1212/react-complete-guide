import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Wrapper from '../Helpers/Wrapper';

import styles from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
	const nameInputRef = useRef();
	const ageInputRef = useRef();
	const [error, setError] = useState();

	const addUserHandler = (event) => {
		event.preventDefault();
		const enteredUserName = nameInputRef.current.value;
		const enteredUserAge = ageInputRef.current.value;

		if (
			enteredUserName.trim().length === 0 ||
			enteredUserAge.trim().length === 0
		) {
			setError({
				title: 'Invalid Input',
				message: 'Please enter a valid name and age (non-empty values)',
			});
			return;
		}
		if (+enteredUserAge < 1) {
			setError({
				title: 'Invalid Age',
				message: 'Please enter a valid age (Greater than zero)',
			});
			return;
		}
		props.onAddUser(enteredUserName, enteredUserAge);
		nameInputRef.current.value = '';
		ageInputRef.current.value = '';
	};

	const errorHandler = (event) => {
		setError(null);
	};

	return (
		<Wrapper>
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onConfirm={errorHandler}
				/>
			)}
			<Card className={styles.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input id="username" type="text" ref={nameInputRef} />
					<label htmlFor="age">Age (Years)</label>
					<input id="age" type="number" ref={ageInputRef} />
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</Wrapper>
	);
};

export default AddUser;
