const blogRouter = require('express').Router();
const blogModel = require('../models/record');
const logger = require('../utils/logger');

// Send JSON data in response
blogRouter.get('/', (req, res) => {
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
	logger.info('body', body);
	if (!body.title) {
		return res.status(400).json({  // Status code 400:- Bad Request
			error: 'title missing'
		})
	}

	const record = new blogModel({
		title: body.title,
		content: body.content,
		tags: body.tag
	});

	record.save()
		.then(result => {
			logger.info('result saved in DB', result);
			res.json(result)
		})
		.catch(error => next(error))
});

// ================== PUT REQUESTS ======================
blogRouter.put('/update/:id', (req, res, next) => {
	const body = req.body

	const record = {
		title: body.title,
		content: body.content,
	}

	// We added the optional { new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original.
	blogModel.findByIdAndUpdate(req.params.id, record, { new: true })
		.then(updatedRecord => {
			res.json(updatedRecord)
		})
		.catch(error => next(error))
});

module.exports = blogRouter;
