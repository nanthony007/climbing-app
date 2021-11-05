import React from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
	indexAxis: 'y',
	// Elements options apply to all of the options unless overridden in a dataset
	// In this case, we are setting the border of each horizontal bar to be 2px wide
	elements: {
		bar: {
			borderWidth: 2,
		},
	},
	responsive: true,
	plugins: {
		legend: {
			position: null,
		},
	},
	parsing: {
		xAxisKey: 'pointValue',
		yAxisKey: 'routeName',
	},
};

function LeaderChart(data) {
	return (
		<div>
			<p className="my-3 font-bold text-3xl text-purple-500">Leaderboard</p>
			<Bar
				data={{
					datasets: [
						{ data: data.data.slice(0, 10), backgroundColor: '#EDE9FE', borderColor: '#C4B5FD' },
					],
				}}
				options={options}
				className="w-screen"
			/>
		</div>
	);
}

export default LeaderChart;
