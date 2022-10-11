/* This file contains task-model configuration for mongodb database named task-manager-api*/

// importing mongoose
const mongoose = require('mongoose')

// importing validator for validating user input for various fields
const validator = require('validator')

// configuring task-schema for task-model
const bikeDocumentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		data: {
			type: String,
		},
		doctype: {
			type: String,
			enum: ['image', 'pdf'],
			required: true,
		},
		type: {
			type: String,
			trim: true,
		},
		size: {
			type: Number,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Admin',
			index: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Bike',
			index: true,
		},
		mimetype: {
			type: String,
			trim: true,
		},
		encoding: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)


// initializing tasks collection with task-schema
// here 'Task' is collection name. Mongodb converts it to plural for and lowercase. i.e. 'tasks'
const BikeDocument = mongoose.model('BikeDocument', bikeDocumentSchema)

// exporting task-model
module.exports = BikeDocument
