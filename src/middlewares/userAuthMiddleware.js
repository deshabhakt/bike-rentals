const User = require('../database/models/user-model')
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
	try {
		// const token = req.header('authorization')
		// now this token contains 'Bearer {authToken}'
		// to remove bearer we do following
		console.log(req.header('Authorization'))

		const token = req.header('Authorization').split(' ')[1]

		// console.log('logging token from authenticator token', token)
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

		const user = await User.findOne({
			_id: decodedToken._id,
			'tokens.token': token,
		})

		if (!user) {
			throw { message: 'user not found' }
		}

		req.user = user
		req.authToken = token
		// console.log(
		// 	'logging from authenticator multiple ',
		// 	req.method,
		// 	req.path,
		// 	req.user,
		// 	req.authToken
		// )
		next()
	} catch (e) {
		console.log('user middleware error', e)
		res.status(401).send({
			success: undefined,
			error: 'Authentication failed',
		})
	}
}

module.exports = authenticate
