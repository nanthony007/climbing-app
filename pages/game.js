import Head from 'next/head';
import GameForm from '../components/gameForm';

export default function GamePage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Head>
				<title>Climbing Game</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
				<div className="divide-y-2 divide-black">
					<h1 className="text-6xl font-bold text-purple-500">Game Time</h1>
					<GameForm></GameForm>
				</div>
			</main>

			<footer className="flex items-center justify-center w-full h-24 border-t">
				Copyright © 2021 Nick Anthony
			</footer>
		</div>
	);
}
