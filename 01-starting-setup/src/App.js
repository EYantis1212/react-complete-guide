import Expenses from './components/Expenses/Expenses';

const App = () => {
	const expenses = [
		{
			id: 'e1',
			title: 'Toilet Paper',
			amount: 12.12,
			date: new Date(2020, 7, 14),
		},
		{
			id: 'e2',
			title: 'New TV',
			amount: 1799.49,
			date: new Date(2021, 2, 12),
		},
		{
			id: 'e3',
			title: 'Car Insurance',
			amount: 94.67,
			date: new Date(2021, 2, 28),
		},
		{
			id: 'e4',
			title: 'New Desk (Wooden)',
			amount: 450.45,
			date: new Date(2021, 5, 12),
		},
	];
	return (
		<div>
			<Expenses item={expenses} />
		</div>
	);
};

export default App;
