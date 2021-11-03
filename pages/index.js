import HomeHeader from '../components/home';
const { MongoClient } = require('mongodb');

// must remove connection string
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// must get async data for table and chart
export async function getStaticProps() {
	await client.connect();
	const collection = client.db('sports').collection('climbing-routes');

	// invalid right now, switch to valid
	// query for routes
	// const query = { runtime: { $lt: 15 } };
	const query = {}; // returns all

	// can possibly optimize for query if needed
	const options = {
		// greatest to least
		sort: { pointValue: -1 },
		projection: { _id: 0 },
	};

	const cursor = collection.find(query, options);
	if ((await cursor.count()) === 0) {
		console.log('No data found.');
		return { props: {} };
	}
	const data = await cursor.toArray();
	await client.close();
	return { props: { mongo: data } };
}

function Home({ mongo }) {
	return <HomeHeader data={mongo}></HomeHeader>;
}

export default Home;
