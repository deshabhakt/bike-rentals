const Admin = require('../database/models/admin-model')
const jwt = require('jsonwebtoken')

const adminAuthenticator = async (req, res, next) => {
	try {
		// const token = req.header('authorization')
		// now this token contains 'Bearer {authToken}'
		// to remove bearer we do following
		// console.log(req.header('Authorization'))

		const token = req.header('Authorization').split(' ')[1]

		// console.log('logging token from authenticator token', token)
		const decodedToken = jwt.verify(token, process.env.JWT_ADMIN_SECRET)

		const admin = await Admin.findOne({
			_id: decodedToken._id,
			'tokens.token': token,
		})

		if (!admin) {
			throw { message: 'Admin not found' }
		}

		req.admin = admin
		req.authToken = token
		next()
	} catch (e) {
		console.log('admin middleware error', e)
		res.status(401).send({
			success: undefined,
			error: { message: 'Authentication failed' },
		})
	}
}

module.exports = adminAuthenticator
