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
app.get('/info/:id', (req, res, next) => {
	const id = Number(req.params.id);
	mongoInstance.findById(id)
		.then(result => res.json(result))
		.catch(error => next(error));
});

// ================= DELETE REQUESTS ====================
app.delete('/info/remove/:id', (req, res, next) => {
	const id = Number(req.params.id);

	mongoInstance.findByIdAndRemove(req.params.id)
		.then(result => {
			// 204 (No Content): The server has fulfilled the request but does not need to return an entity-body,
			res.status(204).end()
		})
		.catch(error => next(error))
});

// ================= POST REQUESTS ======================

// it takes the JSON data of a request, transforms it into a JavaScript object 
// and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json());

app.post('/info/add', (req, res, next) => {
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

	record.save()
		.then(result => {
			res.json(result)
		})
		.catch(error => next(error))
});

// ================== PUT REQUESTS ======================
app.put('/info/update/:id', (req, res, next) => {
	const body = req.body

	const record = {
		name: body.name,
		number: body.number,
	}

	// We added the optional { new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original.
	mongoInstance.findByIdAndUpdate(req.params.id, record, { new: true })
		.then(updatedRecord => {
			res.json(updatedRecord)
		})
		.catch(error => next(error))
})

// define middleware functions that are only called if no route handles the HTTP request.
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error);
}

// this has to be the last loaded middleware.
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`server is running at port ${PORT}`);
});
