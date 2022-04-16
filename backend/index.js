require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const mongoInstance = require('./models/record');

const data = [
	{
		"id": 1,
		"name": "ABC",
		"number": "1111111"
	},
	{
		"id": 2,
		"name": "DEF",
		"number": "22222222"
	},
	{
		"id": 3,
		"name": "GHI",
		"number": "33333333"
	},
	{
		"id": 4,
		"name": "JKL",
		"number": "444444444"
	}
];

// ============= GET REQUESTS ==================

app.get('/', (req, res) => {
	res.send('Welcome back!!!!');
});

// Send JSON data in response
app.get('/info/person', (req, res) => {
	mongoInstance.find({}).then(result => {
		res.json(result);
	});
});

// Send html in response
app.get('/info', (req, res) => {
	res.send(`
		<div>
			<p>Phonebook has info for ${data.length} people</p>
			<p>${Date()}</p>
		</div>
	`)
});

// Send information for particular data entry
// We can define parameters for routes in express by using the colon syntax:
app.get('/info/:id', (req, res) => {
	const id = Number(req.params.id);
	mongoInstance.findById(id).then(result=> res.json(result));
});

// ================= DELETE REQUESTS ====================
app.delete('/info/remove/:id', (req, res) => {
	const id = Number(req.params.id);
	const list = data.filter(item => item.id !== id);
	console.log('list', list);
	// 204 (No Content): The server has fulfilled the request but does not need to return an entity-body,
	res.status(204).end();
});

// ================= POST REQUESTS ======================

// it takes the JSON data of a request, transforms it into a JavaScript object 
// and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json());

app.post('/info/add', (req, res) => {
	const body = req.body;
	console.log('body', body);
	if (!body.name) {
		return res.status(400).json({  // Status code 400:- Bad Request
			error: 'name missing'
		})
	}

	const record = new mongoInstance({
    name: body.name,
    number: body.number
  });

  record.save().then(result => {
    res.json(result);
  });
});

// define middleware functions that are only called if no route handles the HTTP request.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

app.listen(PORT, () => {
	console.log(`server is running at port ${PORT}`);
});
