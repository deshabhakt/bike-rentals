const mongoose = require('mongoose')
const Bike = require('./bike-model')
const User = require('./user-model')

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bikeId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Bike",
    },
    bookingDateAndTime: {
      type: Date,
      default: Date.now(),
    },
    rentalStartDateAndTime: {
      type: Date,
      required: true,
    },
    rentalEndDateAndTime: {
      type: Date,
      required: true,
    },
    bikeTakenDateAndTime: {
      type: Date,
    },
    bikeReturnDateAndTime: {
      type: Date,
    },
    rentalStartKiloMeters: {
      type: Number,
    },
    rentalEndKiloMeters: {
      type: Number,
    },
    rentalTotalKiloMeters: {
      type: Number,
    },
    maximumPerDayKilometersAllowed: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    remainingAmount: {
      type: Number,
    },
    hasBookingDateReached: {
      type: Boolean,
      default: false,
    },
    didUserTakeBike: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.virtual('bikes', {
	ref: 'Bike',
	localField: '_id',
	foreignField: 'booking_history.bookingId',
})

bookingSchema.virtual('bikes', {
	ref: 'Bike',
	localField: '_id',
	foreignField: 'currentBookingId',
})

bookingSchema.virtual('users', {
	ref: 'User',
	localField: '_id',
	foreignField: 'booking_history.bookingId',
})

bookingSchema.pre('save', async function(next) {
	const booking = this
	booking.remainingAmount = booking.totalAmount - booking.paidAmount
	if (booking.bookingDate > booking.rentalStartDate) {
		throw 'Booking start date cannot be lesser than booking date'
	}
	if (booking.rentalStartDate > booking.rentalEndDate) {
		throw 'Invalid rental dates.'
	}
	next()
})


bookingSchema.pre('remove', async function (next) {
	const id = this._id
	const user = await User.findOne({ 'booking_history.bookingId': id })
	console.log("user ",user)

	user.booking_history = user.booking_history.filter((bid) => {
		return bid.bookingId !=id
	})
	await user.save()

	const bike = await Bike.findOne({ 'booking_history.bookingId': id })
	console.log("bike ",bike)


	bike.booking_history = bike.booking_history.filter((bid) => { return bid.bookingId != id })
	if (bike.currentBookingId === id) {
		bike.currentBookingId = ""
	}
	await bike.save()
	next()
})


const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
