import Head from 'next/head';
import Link from 'next/link';
import LeaderChart from './chart';
import Leaderboard from './table';

export default function HomeHeader(mongo) {
	if (!mongo) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen py-2">
				<Head>
					<title>Climbing Game</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
					<h1 className="text-6xl font-bold">Welcome to the climbing game</h1>
					<p className="mt-3 text-2xl">
						This game is meant for indoor climbing, but feel free to use it outdoors as well. Be
						sure to let me know how it goes! 😃
					</p>
					<div className="mt-5 text-2xl text-purple-600 border border-purple-500 px-5 rounded hover:text-white hover:bg-purple-600">
						<Link href="/game">PLAY</Link>
					</div>
					{/* want to add chart and leader board table here */}
				</main>

				<footer className="flex items-center justify-center w-full h-24 border-t">
					Copyright © 2021 Nick Anthony
				</footer>
			</div>
		);
	}
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Head>
				<title>The Climbing Game</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
				<h1 className="text-6xl font-bold">Welcome to The Climbing Game</h1>
				<p className="mt-3 text-2xl">
					This game is meant for indoor climbing, but feel free to use it outdoors as well. Be sure
					to let me know how it goes! 😃
				</p>
				<div className="mt-5 text-2xl text-purple-600 border border-purple-500 px-5 rounded hover:text-white hover:bg-purple-600">
					<Link href="/game">PLAY</Link>
				</div>
				{/*  these need to collapse on each other on md viewport */}
				<div className="mt-5 px-5 xs:w-11/12 lg:w-4/5">
					<LeaderChart data={mongo.data}></LeaderChart>
					<Leaderboard data={mongo.data}></Leaderboard>
				</div>
				{/* want to add chart and leader board table here */}
			</main>

			<footer className="flex items-center justify-center w-full h-24 border-t">
				Copyright © 2021 Nick Anthony
			</footer>
		</div>
	);
}
