// importing mongoose
const mongoose = require('mongoose')

// importing validator for validating user input for various fields
const validator = require('validator')

// importing bcrypt from bcryptjs to hash passwords
const bcrypt = require('bcryptjs')

// importing jwt from jsonwebtoke for generating authentication tokens
const jwt = require('jsonwebtoken')

const getDateTimeStamp = require('../../utils/getTimeStamp')

const Bike = require('../models/bike-model')
const BikeDocument = require('./bike-document-model')

// schema for user model

const adminSchema = new mongoose.Schema(
	{
		first_name: {
			type: String,
			required: true,
			trim: true,
		},
		last_name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate(value) {
				const valid_mails = ['root@gmail.com']
				if (!validator.isEmail(value)) {
					throw 'Invalid Email'
				}
				if (valid_mails.includes(value) == false) {
					throw "You don't have admin access"
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			validate(value) {
				if (value.includes('password') == true) {
					throw 'Very generic password! Try something new :)'
				}
				if (value.length <= 7) {
					throw 'Password should be longer than 7 characters'
				}
			},
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		avatar: {
			type: Buffer,
		},
	},
	{
		timestamps: true,
	}
)

adminSchema.virtual('bike-documents', {
	ref: 'BikeDocument',
	localField: '_id',
	foreignField: 'owner',
})

adminSchema.virtual('bikes', {
	ref: 'Bike',
	localField: '_id',
	foreignField:'owner'
})

// defining custom function on objects of admin-schema for generating authentication tokens
adminSchema.methods.generateAuthToken = async function () {
	const admin = this
	const token = jwt.sign(
		{ _id: admin._id.toString() },
		process.env.JWT_ADMIN_SECRET
	)

	admin.tokens = admin.tokens.concat({ token })
	await admin.save()
	return token
}

// defining custom function on admin-schema for checking admin credentials
adminSchema.statics.findByCredentials = async ({ email, password }) => {
	// console.log(password, email, mobileNumber)
	var admin = await Admin.findOne({ email })
	if (!admin) {
		throw { message: 'Admin not found' }
	}

	const isMatch = await bcrypt.compare(password, admin.password)

	if (!isMatch) {
		throw { message: 'Wrong credentials' }
	}

	return admin
}

// do not use arrow function after 'save'
adminSchema.pre('save', async function (next) {
	const admin = this

	// password will be modified when the admin is created and when the admin updates their password
	if (admin.isModified('password')) {
		// console.log('password modified so re-hashing')
		admin.password = await bcrypt.hash(admin.password, 8)
	}

	next()
})

// middleware for deleting tasks when a admin is deleted
adminSchema.pre('remove', async function (next) {
	const admin = this
	try {
		await Bike.deleteMany({ owner: admin._id })
	} catch (e) {
		throw { message: 'no documents found' }
	}
	next()
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
