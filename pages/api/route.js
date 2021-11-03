const { MongoClient } = require('mongodb');

// must remove connection string
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function routeSubmit(req, res) {
	// this is where we insert into mongo
	if (req.method !== 'POST') {
		res.status(400).json({ message: 'Only POST request allowed.' });
		return;
	}
	await client.connect();
	const collection = client.db('sports').collection('climbing-routes');

	// perform actions on the collection object
	await collection.insertOne(req.body);
	client.close();
	res.status(201).json({ message: 'Successfully added a record to the database.' });
}

export default routeSubmit;
