// importing express and initializing router for task-model related api calls
const express = require('express')
const bcrypt = require("bcryptjs");

const userRouter = express.Router()

//importing sharp for handling image size (i.e. width and height)
// const sharp = require('sharp')

// importing users-model from ../models/user-model
const User = require('../database/models/user-model')
const UserDocument = require('../database/models/user-document-model')

const { validate } = require('../database/models/bike-document-model')
const authenticate = require('../middlewares/userAuthMiddleware')

const jwt = require("jsonwebtoken");
const { findById } = require('../database/models/booking-model');
const { passwordValidator } = require('../utils/validators');

userRouter.post('/user', async (req, res) => {
	console.log(req.body)
	try {
		// const exists = await User.find({ email: req.body.email })
		// if (exists && exists.length > 0) {
		// 	throw 'User already exists'
		// }

		// const {
		// 	email,password,mobileNumber,dateOfBirth
		// } = req.body

		// const isValidData = validateUser(email, password, mobileNumber, dateOfBirth)
		// if (isValidData.isError) {
		// 	throw {
		// 		error_name: isValidData.name,
		// 		error_message:isValidData.message
		// 	};
		// }

		const newUser = new User({
			...req.body,
		})
		const verificationToken = await newUser.generateAuthToken()

		// const verificationLink =
		// 	process.env.URL + `/verify?email=${newUser.email}&token=${token}`
		// const mail = verificationMail(newUser.name, verificationLink)

		newUser.verificationToken = verificationToken

		await newUser.save()

		const authToken = newUser.tokens[0].token

		
		console.log(newUser.toJSON())

		res.send({
			success: {
				data: {
					userData: newUser.toJSON(),
					authToken
				},
				message: 'User created successfully'
			},
			error: undefined,
		})
	} catch (e) {
		console.log('Creating user error', e)
		res.send({
			success: undefined,
			error: {
				message: 'Something went wrong',
				e,
			},
		})
	}
})

userRouter.post('/user/login', async (req, res) => {
	// console.log(req.body)
	try {
		var user = null
		if (req.body.email) {
			user = await User.findByCredentials({
				email: req.body.email,
				password: req.body.password,
			})
		} else if (req.body.mobileNumber) {
			user = await User.findByCredentials({
				mobileNumber: req.body.mobileNumber,
				password: req.body.password,
			})
		}

		const authToken = await user.generateAuthToken()
		if (!user.verified) {
			throw 'Account verification needed\nPlease check email and verify your account'
		}

		res.send({
			error: undefined,
			success: {
				data: {
					userData: user,
					authToken,
				},
				message: 'Login successfull'
			},
		})
	} catch (e) {
		console.log('User Login error', e)
		res.send({
			success: undefined,
			error: { message: 'Something went wrong', e },
		})
	}
})
userRouter.post('/user/me/avatar', authenticate, async (req, res) => {
	try {
		
	} catch (e) {
		console.log(e)
	}
})
userRouter.get('/user/me', authenticate, async (req, res) => {

	const avatar = await UserDocument.findOne({})

	res.send({
		success: {
			data: req.user,
			message: 'User data fetched successfully',
		},
		error: undefined,
	})
})

userRouter.patch('/user/me', authenticate, async (req, res) => {
	try {
		const updates = Object.keys(req.body)
		const allowedUpdates = [
			'first_name',
			'last_name',
			'password',
			'mobileNumber',
			'dateOfBirth',
		]

		const isValid = updates.every((update) =>
			allowedUpdates.includes(update)
		)
		if (!isValid) {
			throw 'Invalid Update'
		}
		updates.forEach((update) => {
			req.user[update] = req.body[update]
		})

		await req.user.save()

		res.send({
			error: undefined,
			success: { data: req.user, message: '' },
		})
	} catch (e) {
		console.log('user patch error', e)
		if (e.errors) {
			return res.send({
				error: { message: 'Something went wrong', e },
				success: undefined,
			})
		}
		res.send({
			error: e,
			success: undefined,
		})
	}
})

userRouter.patch('/user/me/change-password',authenticate, async (req, res) => {
	try {
		const user = await User.findById({ _id: req.user._id })
		console.log(user)
		const { oldPassword, newPassword1, newPassword2 } = req.body
		
		const isMatch = await bcrypt.compare(oldPassword, user.password)
		
		if (!isMatch) {
			throw 'Wrong old password'
		}
		if (!newPassword1 || !passwordValidator(newPassword1) || !newPassword2 || !passwordValidator(newPassword2)) {
			throw ERROR_PASSWORD_MESSAGE
		}
		if (newPassword1!==newPassword2) {
			throw 'New Passwords did not match'
		}

		const newHash = await bcrypt.compare(newPassword1, user.password)
		
		if (newHash) {
			throw 'Old password and new password cannot be same'
		}


		user.password = newPassword1
		await user.save()
		console.log(user)
		return res.send({
			success: {
				message: 'Password changed successfully',
			}
		})
		
	} catch (e) {
		console.log(e)
		res.send({
			error: { message: "Something went wrong", e },
		});
	}
})

userRouter.delete('/user/me', authenticate, async (req, res) => {
	try {
		await req.user.remove()
		res.send({
			success: { message: 'User deleted successfully' },
			error: undefined,
		})
	} catch (e) {
		res.send({
			error: { message: 'Something went wrong', e },
		})
	}

	// try {
	// 	const user = await User.findByIdAndDelete(req.user._id)
	// 	if (!user) {
	// 		throw { message: 'User does not exists' }
	// 	}

	// 	await user.remove()
	// 	res.send({
	// 		error: undefined,
	// 		success: { data: user, message: 'Account deleted successfully' },
	// 	})
	// } catch (e) {
	// 	res.send({
	// 		error: e,
	// 		success: undefined,
	// 	})
	// }
})

userRouter.get('/user/logout', authenticate, async (req, res) => {
	// console.log(req.body)
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return req.authToken !== token
		})
		await req.user.save()
		res.send({
			success: { messsage: 'User logged-out successfully' },
		})
	} catch (e) {
		console.log('User logout error', e)
		res.send({
			success: undefined,
			error: { message: 'Something went wrong', e },
		})
	}
})

userRouter.get('/user/logout-all', authenticate, async (req, res) => {
	// console.log(req.body)
	try {
		req.user.tokens = []
		await req.user.save()

		res.send({
			success: { messsage: 'Successfully logged out of all devices' },
		})
	} catch (e) {
		console.log('User Logout all error', e)
		res.send({
			success: undefined,
			error: e,
		})
	}
})

// generalized calls
// create dummy users
userRouter.post('/user/:count', async (req, res) => {
	const dummyUserData = []
	const numbers = '1234567890'
	const date = new Date(Date.parse('23-05-1997'))
	console.log(req.params.count)
	for (let i = 1; i < parseInt(req.params.count) + 1; i++) {
		const rand1 = parseInt(Math.random() * 9)
		const rand2 = parseInt(Math.random() * 9)

		const dummyUser = {
			first_name: 'Userf ' + i,
			last_name: 'Userl ' + i,
			email: `ab${rand1}c${rand2}@email${i}.com`,
			mobileNumber: `${rand2}23${numbers[rand1]}567${numbers[rand2]}9${
				i % 10
			}`,
			password: 'abc12345',
			dateOfBirth: date.toLocaleDateString(),
		}
		console.log(dummyUser)
		dummyUserData.push(dummyUser)
	}

	try {
		const userData = await User.insertMany(dummyUserData)
		res.send({
			success: {
				data: userData,
				message: 'Dummy user data added successfully',
			},
			error: undefined,
		})
	} catch (e) {
		res.send({
			success: undefined,
			error: e,
		})
	}
})
userRouter.get('/user/all', async (req, res) => {
	try {
		const userData = await User.find({})

		if (userData && userData.length === 0) {
			throw { message: 'Users not found' }
		}
		res.send({
			success: {
				data: userData,
				message: 'Users data fetched successfully',
			},
			error: undefined,
		})
	} catch (e) {
		console.log('fetching all users error', e)
		res.send({
			success: undefined,
			error: e,
		})
	}
})
userRouter.get('/user/:id', async (req, res) => {
	try {
		const userData = await User.find({ _id: req.params.id })

		if (userData && userData.length === 0) {
			throw { message: 'User not found' }
		}
		res.send({
			success: {
				data: userData[0],
				message: 'User data fetched successfully',
			},
			error: undefined,
		})
	} catch (e) {
		console.log('fetching user by id error', e)
		res.send({
			success: undefined,
			error: e,
		})
	}
})
userRouter.patch('/user/:id', async (req, res) => {
	try {
		const updates = Object.keys(req.body)
		const allowedUpdates = [
			'first_name',
			'last_name',
			'password',
			'mobileNumber',
			'dateOfBirth',
		]

		const isValid = updates.every((update) =>
			allowedUpdates.includes(update)
		)
		if (!isValid) {
			throw { message: 'Invalid Update' }
		}

		const userData = await User.findOne({ _id: req.params.id })

		updates.forEach((update) => {
			userData[update] = req.body[update]
		})
		console.log(userData)
		await userData.save()

		res.send({
			error: undefined,
			success: { data: userData, message: '' },
		})
	} catch (e) {
		console.log('user patch error', e)
		if (e.errors) {
			return res.send({
				error: { message: e.message },
				success: undefined,
			})
		}
		res.send({
			error: e,
			success: undefined,
		})
	}
})
userRouter.delete('/user/all', async (req, res) => {
	console.log(req.body)
	try {
		const deleteResult = await User.deleteMany()
		if (!deleteResult || deleteResult.deletedCount == 0) {
			throw { message: 'No user exists' }
		}
		res.send({
			error: undefined,
			success: {
				data: deleteResult,
				message: 'All user accounts deleted successfully',
			},
		})
	} catch (e) {
		console.log(e)
		res.send({
			error: e,
			success: undefined,
		})
	}
})
userRouter.delete('/user/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)
		if (!user) {
			throw { message: 'User does not exists' }
		}

		await user.remove()
		res.send({
			error: undefined,
			success: { data: user, message: 'Account deleted successfully' },
		})
	} catch (e) {
		res.send({
			error: e,
			success: undefined,
		})
	}
})

module.exports = userRouter
