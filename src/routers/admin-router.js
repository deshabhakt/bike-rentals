// importing express and initializing router for task-model related api calls
const express = require('express')
const adminRouter = express.Router()

//importing sharp for handling image size (i.e. width and height)
// const sharp = require('sharp')

// importing users-model from ../models/user-model
const Admin = require('../database/models/admin-model')
const User = require('../database/models/user-model')

const userRouter = require('./user-router')

const adminAuthenticator = require('../middlewares/adminAuthMiddleware')

adminRouter.post('/admin', async (req, res) => {
	console.log(req.body)
	try {
		const exists = await Admin.find({ email: req.body.email })
		if (exists && exists.length > 0) {
			throw 'Admin already exists'
		}
		const newAdmin = new Admin({
			...req.body,
		})
		const authToken = await newAdmin.generateAuthToken()

		await newAdmin.save()

		res.send({
			success: {
				data: newAdmin,
				authToken,
				message: 'Admin created successfully',
			},
			error: undefined,
		})
	} catch (e) {
		console.log('Creating Admin error', e)
		res.send({
			success: undefined,
			error: e,
		})
	}
})
adminRouter.post('/admin/login', async (req, res) => {
	// console.log(req.body)
	try {
		var admin = null
		if (req.body.email) {
			admin = await Admin.findByCredentials({
				email: req.body.email,
				password: req.body.password,
			})
		} else if (req.body.mobileNumber) {
			admin = await Admin.findByCredentials({
				mobileNumber: req.body.mobileNumber,
				password: req.body.password,
			})
		}
		if (!admin) {
			throw 'Invalid admin account'
		}
		const authToken = await admin.generateAuthToken()

		res.send({
			error: undefined,
			success: {
				data: admin,
				authToken,
				message: 'Login successfull',
			},
		})
	} catch (e) {
		console.log('Admin Login error', e)
		res.send({
			success: undefined,
			error: e,
		})
	}
})
adminRouter.get('/admin/me', adminAuthenticator, async (req, res) => {
	res.send({
		success: {
			data: req.admin,
			message: 'Admin data fetched successfully',
		},
		error: undefined,
	})
})
adminRouter.patch('/admin/me', adminAuthenticator, async (req, res) => {
	try {
		const updates = Object.keys(req.body)
		const allowedUpdates = ['first_name', 'last_name', 'password']

		const isValid = updates.every((update) =>
			allowedUpdates.includes(update)
		)
		if (!isValid) {
			throw 'Invalid Update'
		}

		updates.forEach((update) => {
			req.admin[update] = req.body[update]
		})

		await req.admin.save()

		res.send({
			error: undefined,
			success: { data: req.admin, message: '' },
		})
	} catch (e) {
		console.log('Admin patch error', e)
		if (e.errors) {
			return res.send({
				error: { message: e.message },
				success: undefined,
			})
		}
		res.send({
			error: { message: 'Something went wrong', e },
			success: undefined,
		})
	}
})
adminRouter.delete('/admin/me', adminAuthenticator, async (req, res) => {
	try {
		const admin = await Admin.findByIdAndDelete(req.admin._id)
		if (!admin) {
			throw 'Admin does not exists'
		}
		res.send({
			error: undefined,
			success: { data: admin, message: 'Account deleted successfully' },
		})
	} catch (e) {
		// console.log(e)
		res.send({
			error: { message: 'Something went wrong', e },
			success: undefined,
		})
	}
})
adminRouter.get('/admin/logout', adminAuthenticator, async (req, res) => {
	console.log(req.body)
	try {
		req.admin.tokens = req.admin.tokens.filter((token) => {
			return req.authToken !== token
		})
		await req.admin.save()
		res.send({
			success: { messsage: 'Admin logged-out successfully' },
		})
	} catch (e) {
		console.log('Admin logout error', e)
		res.send({
			success: undefined,
			error: { message: 'Something went wrong', e },
		})
	}
})
adminRouter.get('/admin/logout-all', adminAuthenticator, async (req, res) => {
	// console.log(req.body)
	try {
		req.admin.tokens = []
		await req.admin.save()

		res.send({
			success: { messsage: 'Successfully logged out of all devices' },
		})
	} catch (e) {
		console.log('Admin Logout all error', e)
		res.send({
			success: undefined,
			error: { message: 'Something went wrong', e },
		})
	}
})

// temporary calls
adminRouter.get('/admin/all', async (req, res) => {
	res.send(await Admin.find({}))
})

adminRouter.get('/admin/:id', async (req, res) => {
	res.send(await Admin.findOne({ _id: req.params.id }))
})

adminRouter.delete('/admin/all', async (req, res) => {
	res.send(await Admin.deleteMany({}))
})
adminRouter.delete('/admin/:id', async (req, res) => {
	res.send(await Admin.deleteOne({ _id: req.params.id }))
})

// user related administrative operations
userRouter.get('/admin/user/all', adminAuthenticator, async (req, res) => {
	try {
		const userData = await User.find({})

		if (userData && userData.length === 0) {
			throw 'Users not found'
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
			error: { message: 'Something went wrong', e },
		})
	}
})
userRouter.delete('/admin/user/all', adminAuthenticator, async (req, res) => {
	try {
		const data = await User.deleteMany({})
		if (!data || data.deletedCount == 0) {
			throw 'No users found'
		}
		res.send({
			success: {
				message: 'All users deleted successfully',
				data: data,
			},
			error: undefined,
		})
	} catch (e) {
		res.send({
			success: undefined,
			error: { message: 'something went wrong', e },
		})
	}
})
userRouter.get('/admin/user/:id', adminAuthenticator, async (req, res) => {
	try {
		const userData = await User.find({ _id: req.params.id })
		if (!userData || userData.length === 0) {
			throw 'User not found'
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
			error: { message: 'Something went wrong', e },
		})
	}
})
userRouter.patch('/admin/user/:id', adminAuthenticator, async (req, res) => {
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

		const userData = await User.findOne({ _id: req.params.id })

		updates.forEach((update) => {
			userData[update] = req.body[update]
		})

		await userData.save()

		res.send({
			error: undefined,
			success: { data: userData, message: 'User updated successfully' },
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
			error: { message: 'Something went wrong', e },
			success: undefined,
		})
	}
})
userRouter.delete('/admin/user/:id', adminAuthenticator, async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)
		if (!user) {
			throw 'User not found'
		}

		await user.remove()
		res.send({
			error: undefined,
			success: {
				data: user,
				message: 'User Account deleted successfully',
			},
		})
	} catch (e) {
		res.send({
			error: { message: 'Something went wrong', e },
			success: undefined,
		})
	}
})

module.exports = adminRouter
