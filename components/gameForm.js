import { Component } from 'react';
import DBError from './dbError';
import GameResult from './gameResult';

var grades = {
	VB: 1,
	V0: 2,
	V1: 3,
	V2: 4,
	V3: 5,
	V4: 6,
	V5: 7,
	V6: 8,
	V7: 9,
	V8: 10,
	V9: 11,
	'V10+': 12,
};

function calculatePoints(event) {
	const data = {
		vGrade: event.target.vGrade.value,
		attempts: event.target.attempts.value,
		holds: event.target.holds.value,
		holdsUsed: event.target.holdsUsed.value,
	};
	// FORMULA section
	const gradeValue = grades[data.vGrade];
	const routeValue = gradeValue * 100;
	// this simulates experienced difficulty
	// is a fractional number derived from route value based on % holds used/unused
	const holdMultiplier = (1 - data.holdsUsed / data.holds) * routeValue;
	// considers setter intended difficulty
	const setterDifficulty = (routeValue + holdMultiplier) * (1 / data.holds);
	// reduces based on attempts
	const finalPoints = setterDifficulty / data.attempts;
	return Math.round(finalPoints * 100) / 100; // rounding to 2 decimals
}

class GameForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			routePointValue: 0,
			errored: false,
		};
	}

	submitRoute = async (event) => {
		event.preventDefault();

		const gameData = {
			routeName: event.target.routeName.value.toLowerCase(),
			userName: event.target.userName.value,
			vGrade: event.target.vGrade.value,
			attempts: event.target.attempts.value,
			holds: event.target.holds.value,
			holdsUsed: event.target.holdsUsed.value,
			pointValue: calculatePoints(event),
		};
		console.log(gameData);

		// this will be replaced by mongo api code
		const resp = await fetch('/api/route', {
			body: JSON.stringify({
				routeName: event.target.routeName.value.toLowerCase(),
				userName: event.target.userName.value,
				vGrade: event.target.vGrade.value,
				attempts: parseInt(event.target.attempts.value),
				holds: parseInt(event.target.holds.value),
				holdsUsed: parseInt(event.target.holdsUsed.value),
				pointValue: calculatePoints(event),
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		if (resp.status !== 201) {
			this.setState({ errored: true });
		}
		event.target.reset();
		this.setState({ submitted: true, routePointValue: gameData.pointValue });
	};

	render() {
		if (this.errored) {
			return <DBError></DBError>;
		}
		if (this.state.submitted) {
			return <GameResult pointValue={this.state.routePointValue}></GameResult>;
		} else {
			// TODO: fix this horrible formatting
			return (
				<form onSubmit={this.submitRoute} className="grid grid-cols-2 gap-2">
					<label htmlFor="routeName">Route Name:</label>
					<input
						id="routeName"
						name="routeName"
						type="text"
						className="rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						required
					></input>

					<label htmlFor="userName">User Name:</label>
					<input
						id="userName"
						name="userName"
						type="text"
						className="rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						required
					></input>

					<label htmlFor="vGrade">V-Scale Grade:</label>
					<select
						id="vGrade"
						name="vGrade"
						type="text"
						className="rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						required
						defaultValue="VB"
					>
						<option>VB</option>
						<option>V0</option>
						<option>V1</option>
						<option>V2</option>
						<option>V3</option>
						<option>V4</option>
						<option>V5</option>
						<option>V6</option>
						<option>V7</option>
						<option>V8</option>
						<option>V9</option>
						<option>V10</option>
						<option>V11</option>
						<option>V12</option>
						<option>V13</option>
						<option>V14</option>
					</select>

					<label htmlFor="attempts"># of Attempts:</label>
					<input
						id="attempts"
						name="attempts"
						type="number"
						className="rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						required
					></input>

					<label htmlFor="holds"># of Holds:</label>
					<input
						id="holds"
						name="holds"
						type="number"
						className="rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						required
					></input>

					<label htmlFor="holdsUsed"># of Holds Used:</label>
					<input
						id="holdsUsed"
						name="holdsUsed"
						type="number"
						className="rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
						required
					></input>

					<button
						type="submit"
						className="p-5 col-span-2 text-purple-500 hover:bg-purple-500 hover:text-white rounded-lg border border-purple-500"
					>
						Submit
					</button>
				</form>
			);
		}
	}
}

export default GameForm;
