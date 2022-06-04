const blogRouter = require('express').Router();
const blogModel = require('../models/record');
const UserModel = require('../models/user');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

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
		const blogID = req.params.id;
		const blog = await blogModel.findById(blogID);

		const decodedToken = jwt.verify(req.token, process.env.SECRET);
		if (!decodedToken || !decodedToken.id) {
			return res.status(401).json({ error: 'token missing or invalid' })
		} else if (blog.user.toString() !== decodedToken.id.toString()) {
			return res.status(401).json({ error: 'You don\'t have enough permission to perform this action' })
		}

		await blogModel.findByIdAndRemove(blogID);

		// 204 (No Content): The server has fulfilled the request but does not need to return an entity-body,
		res.status(204).end();

	} catch (exception) {
		next(exception);
	}
});

// const getTokenFrom = request => {
//   const authorization = request.get('authorization');
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7);
//   }
//   return null;
// }

// ================= POST REQUESTS ====================
blogRouter.post('/add', async (req, res, next) => {
	const body = req.body;
	logger.info('body', body);
	if (!body.title) {
		return res.status(400).json({  // Status code 400:- Bad Request
			error: 'title missing'
		})
	}

	if (!req.token) {
		return res.status(401).json({ error: 'Not authorized to perform this operation' });
	}

	// const token = getTokenFrom(req);
	const decodedToken = jwt.verify(req.token, process.env.SECRET);
	if (!decodedToken || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' });
	}
	const user = await UserModel.findById(decodedToken.id);

	// const user = await UserModel.findById(body.userId);

	const record = new blogModel({
		title: body.title,
		content: body.content,
		tags: body.tag,
		user: user._id
	});

	try {
		const savedBlog = await record.save();

		// Save the blog ID inside User Model
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save();

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
