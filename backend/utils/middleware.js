// define middleware functions that are only called if no route handles the HTTP request.
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	console.log('=============== inside errorhandler', error);

	switch (error.name) {
		case 'CastError':
			return response.status(400).send({ error: 'malformatted id' });
		case 'ValidationError':
			return response.status(400).json({ error: error.message });
		case 'TypeError':
			return response.status(500).json({ error: error.message });
		case 'JsonWebTokenError':
			return response.status(401).json({ error: 'invalid token'});
		case 'TokenExpiredError':
			return response.status(401).json({ error: 'token expired'});
		default:
			next(error);
			break;
	}
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
	next();
}

module.exports = {
  unknownEndpoint,
  errorHandler,
	tokenExtractor
}
