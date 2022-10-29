// need to set bike model as virtual for bike images

const mongoose = require('mongoose')
const getDuration = require('../../utils/getAgeFromDate')
const getDateTimeStamp = require('../../utils/getTimeStamp')
const BikeDocument = require('./bike-document-model')

const bikeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		manufacturer: {
			type: String,
			required: true,
			trim: true,
		},
		registration_date: {
			type: String,
			required: true,
			trim: true,
		},
		engine_size: {
			type: String,
			required: true,
			trim: true,
		},
		condition: {
			type: String,
			required: true,
			trim:true
		},
		per_day_charge: {
			type: Number,
			required:true
		},
		licence_plate_number: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		color: {
			type: String,
			required: true,
			trim:true
		},
		total_distance_travelled: {
			type: Number,
			required: true,
		},
		isBooked: {
			type: Boolean,
			default: false,
		},
		hasUserTakenTheBike: {
			type: Boolean,
			default: false,
		},
		currentBookingId: {
			type: String,
			default:""
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: 'Admin',
			index: true,
		},
		booking_history: [
			{
				bookingId: {
					type: mongoose.Types.ObjectId,
				},
			},
		],
	},
	{
		timestamps: true,
	}
)

bikeSchema.virtual('bike-documents', {
	ref: 'BikeDocument',
	localField: '_id',
	foreignField: 'productId',
})

bikeSchema.virtual('bookings', {
	ref: 'Booking',
	localField: '_id',
	foreignField: 'bikeId',
})


// // middleware for finding bike age when we add a new bike
// bikeSchema.pre('save', async function (next) {
// 	const bike = this
// 	try {
// 		const registrationDate = bike.registration_date

// 		bike.age = getDuration(this.registration_date).getYears()
// 	} catch (e) {
// 		throw 'no documents found'
// 	}
// 	next()
// })

bikeSchema.pre('save', async function(next){
	this.modifiedOn = Date.now()
	next()
})

// middleware for deleting tasks when a admin is deleted
bikeSchema.pre('remove', async function (next) {
	const bike = this
	try {
		await BikeDocument.deleteMany({ productId: bike._id })
	} catch (e) {
		throw 'no documents found'
	}
	next()
})

const Bike = mongoose.model('Bike', bikeSchema)

module.exports = Bike
