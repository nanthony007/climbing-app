import Link from 'next/link';

function GameResult(props) {
	return (
		<div>
			<p className="mt-3 pt-5 text-2xl">
				Congratulations, that problem was worth
				<span className="text-purple-500 text-bold"> {props.pointValue} </span>points!
			</p>
			<div className="mt-5 text-2xl text-purple-600 border border-purple-500 px-5 rounded hover:text-white hover:bg-purple-600">
				<Link href="/">Play again</Link>
			</div>
		</div>
	);
}

export default GameResult;
