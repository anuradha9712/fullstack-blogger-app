const blogRouter = require('express').Router();
const blogModel = require('../models/record');
const logger = require('../utils/logger');

// Send JSON data in response
blogRouter.get('/', async (req, res) => {
	const blog = await blogModel.find({})
	res.json(blog);
});

// Send information for particular data entry
// We can define parameters for routes in express by using the colon syntax:
blogRouter.get('/:id', async (req, res, next) => {
	const id = Number(req.params.id);

	try {
		const result = await blogModel.findById(id)
		if (result) {
			res.json(result);
		} else {
			res.status(404).end();
		}
	} catch (exception) {
		next(exception)
	}
});

// ================= DELETE REQUESTS ====================
blogRouter.delete('/remove/:id', async (req, res, next) => {
	try {
		await blogModel.findByIdAndRemove(req.params.id);

		// 204 (No Content): The server has fulfilled the request but does not need to return an entity-body,
		res.status(204).end();

	} catch (exception) {
		next(exception);
	}
});

// ================= POST REQUESTS ====================
blogRouter.post('/add', async (req, res, next) => {
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

	try {
		const savedBlog = await record.save();
		res.status(201).json(savedBlog);
	} catch (exception) {
		next(exception)
	}
});

// ================== PUT REQUESTS ======================
blogRouter.put('/update/:id', async (req, res, next) => {
	const body = req.body;

	const record = {
		title: body.title,
		content: body.content,
	}

	try {
		// We added the optional { new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original.
		const result = await blogModel.findByIdAndUpdate(req.params.id, record, { new: true });
		res.json(result);
	} catch (exception) {
		next(exception);
	}
});

module.exports = blogRouter;
