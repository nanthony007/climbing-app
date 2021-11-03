import DataTable from 'react-data-table-component';

function Leaderboard(data) {
	// this is hard coded for now
	const columns = [
		{
			name: 'Points',
			selector: (row) => row.pointValue,
			sortable: true,
		},
		{
			name: 'V Grade',
			selector: (row) => row.vGrade,
			sortable: true,
		},
		{
			name: 'Attempts',
			selector: (row) => row.attempts,
			sortable: true,
		},
		{
			name: 'Route',
			selector: (row) => row.routeName,
			sortable: true,
		},
		{
			name: 'User',
			selector: (row) => row.userName,
			sortable: true,
		},
		{
			name: 'Holds',
			selector: (row) => row.holds,
			sortable: true,
		},
		{
			name: 'Used',
			selector: (row) => row.holdsUsed,
			sortable: true,
		},
	];

	return (
		<DataTable
			direction="auto"
			fixedHeader
			fixedHeaderScrollHeight="300px"
			highlightOnHover
			responsive
			striped
			pagination
			data={data.data}
			columns={columns}
		/>
	);
}

export default Leaderboard;
