const express = require('express')
const Bike = require('../database/models/bike-model')
const Booking = require('../database/models/booking-model')
const User = require('../database/models/user-model')
const bikeValidationMiddleware = require('../middlewares/bikeValidationMiddleware')

const userAuthMiddleware = require('../middlewares/userAuthMiddleware')

const bookingRouter = express.Router()


// general calls

bookingRouter.get('/booking/all', async (req, res) => {
	try {
		const data = await Booking.find({})
		if (!data || data.length === 0) {
			throw 'No bookings found'
		}
		return res.send({
			success: {
				messagae: "Bookings fetched successfully",
				data
			}
		})
	} catch (e) {
		res.send({
			error: {
				messagae: 'Something went wrong',
				e
			}
		})
	}
})


bookingRouter.delete('/booking/all', async (req, res) => {
	try {
		const data = await Booking.deleteMany()

		if (!data || data.deleteCount === 0) {
			throw 'No bookings found'
		}
		return res.send({
			success: {
				messagae: "Bookings fetched successfully",
				data
			}
		})
	} catch (e) {
		res.send({
			error: {
				messagae: 'Something went wrong',
				e
			}
		})
	}
})

/* Specific calls */

bookingRouter.get('/booking/user', userAuthMiddleware, async (req, res) => {
	try {
		const bookings = await Booking.find({ userId: req.user._id })
		if (!bookings || bookings.length == 0) {
			throw 'No bookings found'
		}
		return res.send({
			success: { data:bookings, message: 'Booking found successfully' },
		})
	} catch (e) {
		console.log('error while booking get/booking/user', e)
		res.send({
			error: {
				message: 'Something went wrong',
				e,
			},
		})
	}
})

bookingRouter.get(
	'/booking/bike/:bikeId',
	bikeValidationMiddleware,
	async (req, res) => {
		try {
			const bookings = await Booking.find({ bikeId: req.bike._id })
			if (!bookings || bookings.length == 0) {
				throw 'No bookings found'
			}
			return res.send({
				success: { data: bookings, message: 'Booking found successfully' },
			})
		} catch (e) {
			console.log('error while booking get/booking/bike', e)
			res.send({
				error: {
					message: 'Something went wrong',
					e,
				},
			})
		}
	}
)
bookingRouter.get('/booking/:bookingId', userAuthMiddleware, async (req, res) => {
	try {

		const booking = await Booking.findOne({
			_id: req.params.bookingId,
			userId:req.user._id
		})

		if (!booking) {
			throw "Booking not found"
		}

		res.send({
			success: {
				message: "Booking found successfully",
				data:booking
			}
		})

		
	} catch (e) {
		res.send({
			error: {
				message: "Something went wrong",
				e
			}
		})
	}
})

bookingRouter.post(
	'/booking/:bikeId',
	userAuthMiddleware,
	bikeValidationMiddleware,
	async (req, res) => {
		try {
			const booking = new Booking({
				userId: req.user._id,
				bikeId: req.bike._id,
				bookingDateAndTime: req.body.bookingDateAndTime,
				rentalStartDateAndTime: req.body.rentalStartDateAndTime,
				rentalEndDateAndTime: req.body.rentalEndDateAndTime,
			})

			const bookingData = await booking.save()

			const user = await User.findById(req.user._id)
			user.booking_history.unshift({ bookingId: bookingData._id })
			
			const userData = await user.save()

			const bike = await Bike.findById(req.params.bikeId)
			bike.booking_history.unshift({ bookingId: bookingData._id })

			const bikeData = await bike.save()

			res.send({
				success: {
					message: "Booking successfull",
					data: {
						bookingData,
						userData,
						bikeData
					}
				}
			})
		} catch (e) {
			console.log('error while booking post/booking/user', e)
			res.send({
				error: {
					message: 'Something went wrong',
					e,
				},
			})
		}
	}
)

bookingRouter.patch(
	'/booking/:bookingId',
	userAuthMiddleware,
	async (req, res) => {
		try {
			const updates = Object.keys(req.body)

			const allowedUpdates = [
				'rentalStartDateAndTime','rentalEndDateAndTime'
			]

			const isValid = updates.every((update) => allowedUpdates.includes(update))

			if (!isValid) {
				throw "Invalid update"
			}
			const booking = await Booking.findOne({
				_id: req.params.bookingId,
				userId:req.user._id
			})

			if (!booking) {
				throw 'Booking not found'
			}
			
			updates.forEach((update) => {
				booking[update] = req.body[update]
			})

			await booking.save()
			console.log(booking)

			res.send({
				success: {
					messagae: "Booking updated successfully",
					data:booking
				}
			})

		} catch (e) {
			console.log('error while booking post/booking/user', e)
			res.send({
				error: {
					message: 'Something went wrong',
					e,
				},
			})
		}
	}
)

bookingRouter.delete('/booking/:bookingId', userAuthMiddleware, async (req, res) => {
	try {
		const booking = await Booking.findOne({
			_id: req.params.bookingId,
			userId:req.user._id
		})
		if(!booking) {
			throw "Booking not found"
		}
		await booking.remove()
		return res.send({
			success: {
				message: "Booking delete successfully",
				data:booking
			}
		})
	} catch (e) {
		console.log(e)
		res.send({
			error: {
				message: "Something went wrong",
				e
			}
		})
	}

})




module.exports = bookingRouter