const blogRouter = require('express').Router();
const blogModel = require('../models/record');

// Send JSON data in response
blogRouter.get('/person', (req, res) => {
	blogModel.find({}).then(result => {
		res.json(result);
	});
});

// Send information for particular data entry
// We can define parameters for routes in express by using the colon syntax:
blogRouter.get('/:id', (req, res, next) => {
	const id = Number(req.params.id);
	blogModel.findById(id)
		.then(result => res.json(result))
		.catch(error => next(error));
});

// ================= DELETE REQUESTS ====================
blogRouter.delete('/remove/:id', (req, res, next) => {
	blogModel.findByIdAndRemove(req.params.id)
		.then(result => {
			// 204 (No Content): The server has fulfilled the request but does not need to return an entity-body,
			res.status(204).end()
		})
		.catch(error => next(error))
});

// ================= POST REQUESTS ====================
blogRouter.post('/add', (req, res, next) => {
	const body = req.body;
	console.log('body', body);
	if (!body.name) {
		return res.status(400).json({  // Status code 400:- Bad Request
			error: 'name missing'
		})
	}

	const record = new blogModel({
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
blogRouter.put('/update/:id', (req, res, next) => {
	const body = req.body

	const record = {
		name: body.name,
		number: body.number,
	}

	// We added the optional { new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original.
	blogModel.findByIdAndUpdate(req.params.id, record, { new: true })
		.then(updatedRecord => {
			res.json(updatedRecord)
		})
		.catch(error => next(error))
});

module.exports = blogRouter;
