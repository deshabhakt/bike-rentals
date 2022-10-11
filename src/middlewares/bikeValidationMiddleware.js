const Bike = require('../database/models/bike-model')

const ObjectId = require('mongoose').Types.ObjectId

const bikeValidationMiddleware = async (req, res, next) => {
	try {
		if (!req.params.bikeId) {
			throw 'Please provide Bike id'
		}
		if (!ObjectId(req.params.bikeId)) {
			throw 'Invalid bike id'
		}
		const bike = await Bike.findById(req.params.bikeId)
		if (!bike) {
			throw 'Bike not found'
		}
		req.bike = bike
		next()
	} catch (e) {
		res.send({ error: { message: 'Something went wrong', e } })
	}
}

module.exports = bikeValidationMiddleware
