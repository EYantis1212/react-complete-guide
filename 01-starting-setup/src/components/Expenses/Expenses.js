import React, { useState } from 'react';
import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import './Expenses.css';
import ExpensesFilter from './ExpensesFilter';

const Expenses = (props) => {
	console.log(props);
	const [filterYear, setFilterYear] = useState('2020');
	const filterChangeHandler = (selectedYear) => {
		setFilterYear(selectedYear);
	};

	const filteredExpenses = props.items.filter((expense) => {
		return expense.date.getFullYear().toString() === filterYear;
	});

	return (
		<div>
			<Card className="expenses">
				<ExpensesFilter
					selectedYear={filterYear}
					onFilterChange={filterChangeHandler}
				/>
				{expensesContent}
			</Card>
		</div>
	);
};

export default Expenses;
