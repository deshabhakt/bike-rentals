/* This file contains task-model configuration for mongodb database named task-manager-api*/

// importing mongoose
const mongoose = require('mongoose')

// importing validator for validating user input for various fields
const validator = require('validator')
const getDateTimeStamp = require('../../utils/getTimeStamp')

// configuring task-schema for task-model
const userDocumentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		data: {
			type: Buffer,
			required: true,
		},
		type: {
			type: String,
			trim: true,
			required: true,
		},
		mimetype: {
			type: String,
			trim: true,
			required: true,
		},
		size: {
			type: Number,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

// initializing tasks collection with task-schema
// here 'Task' is collection name. Mongodb converts it to plural for and lowercase. i.e. 'tasks'
const UserDocument = mongoose.model('UserDocument', userDocumentSchema)

// exporting task-model
module.exports = UserDocument
