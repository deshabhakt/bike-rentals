/* This file contains task-model configuration for mongodb database named task-manager-api*/

// importing mongoose
const mongoose = require('mongoose')

// importing validator for validating user input for various fields
const validator = require('validator')
const { DOC_TYPE_BANNER_IMAGE, DOC_TYPE_BIKE_IMAGE, DOC_TYPE_BIKE_INSURANCE_CERTIFICATE, DOC_TYPE_BIKE_PUC, DOC_TYPE_BIKE_RC } = require('../../utils/macros/bikeDocumentMacros')

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
			enum: ['image', 'pdf','banner-image'],
			required: true,
		},
		type: {
			type: String,
			trim: true,
			enum:[DOC_TYPE_BANNER_IMAGE,DOC_TYPE_BIKE_IMAGE,DOC_TYPE_BIKE_INSURANCE_CERTIFICATE,DOC_TYPE_BIKE_PUC,DOC_TYPE_BIKE_RC]
		},
		size: {
			type: Number,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: 'Admin',
			index: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
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
