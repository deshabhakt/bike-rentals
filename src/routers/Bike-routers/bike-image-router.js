const express = require('express')

const bikeImageRouter = express.Router()

const bikeDocMiddleware = require('../../middlewares/bikeDocumentMiddleware')

const adminAuthenticator = require('../../middlewares/adminAuthMiddleware')

const BikeDocument = require('../../database/models/bike-document-model')
const bikeValidationMiddleware = require('../../middlewares/bikeValidationMiddleware')

bikeImageRouter.post(
	'/bike/image/:bikeId',
	adminAuthenticator,
	bikeValidationMiddleware,
	bikeDocMiddleware.single('avatar'),
	async (req, res) => {
		try {
			if (req.fileFormatError) {
				throw req.fileFormatError
			}
			const { originalname, encoding, mimetype, buffer, size } = req.file

			const type = mimetype.split('/')[1]
			const uploadedDoc = BikeDocument({
				name: originalname,
				size,
				mimetype,
				data: buffer.toString('base64'),
				type,
				owner: req.admin._id,
				encoding,
				productId: req.params.bikeId,
				doctype: 'image',
			})
			await uploadedDoc.save()

			res.send({
				success: {
					message: 'Image uploaded successfully',
					data: uploadedDoc,
				},
			})
		} catch (e) {
			res.send({ error: { message: 'Something went wrong', e } })
		}
	},
	(req, res, next) => {
		res.send('Something went wrong')
		next()
	}
)
bikeImageRouter.delete(
	'/bike/image/:id',
	adminAuthenticator,
	async (req, res) => {
		try {
			if (req.fileFormatError) {
				throw req.fileFormatError
			}
			const data = await BikeDocument.findOneAndDelete({
				_id: req.params.id,
				owner: req.admin.id,
				doctype: 'image',
			})
			if (!data) {
				throw 'Image not found'
			}
			await data.remove()
			res.send({
				success: { data, message: 'Image deleted successfully' },
			})
		} catch (e) {
			res.send({
				success: undefined,
				error: {
					e,
					message: 'Something went wrong',
				},
			})
		}
	}
)
bikeImageRouter.patch(
	'/bike/image/:id',
	adminAuthenticator,
	bikeDocMiddleware.single('avatar'),
	async (req, res) => {
		try {
			if (req.fileFormatError) {
				throw req.fileFormatError
			}
			const image = await BikeDocument.findOne({
				_id: req.params.id,
				owner: req.admin.id,
				doctype: 'image',
			})

			if (!image) {
				throw 'Image not found'
			}
			const { originalname, encoding, mimetype, buffer, size } = req.file
			image.name = originalname
			image.size = size
			image.mimetype = mimetype
			image.data = buffer.toString('base64')
			image.type = mimetype.split('/')[1]
			image.encoding = encoding

			await image.save()
			// console.log(image)

			res.send({
				success: {
					data: image.toString(),
					message: 'Image updated successfully',
				},
			})
		} catch (e) {
			console.log(e)
			res.send({
				success: undefined,
				error: {
					e,
					message: 'Something went wrong',
				},
			})
		}
	},
	(req, res, next) => {
		res.send({
			success: undefined,
			error: {
				message: 'Something went wrong in middleware',
			},
		})
	}
)
bikeImageRouter.get('/bike/image/:id', async (req, res) => {
	try {
		const imageData = await BikeDocument.findOne({
			_id: req.params.id,
			doctype: 'image',
		})
		// console.log(imageData)
		// res.set('Content-Type', imageData.mimetype)
		res.send(imageData)
	} catch (e) {
		res.send({
			error: {
				message: 'Something went wrong',
				e,
			},
		})
	}
})

// get all images of a bike
bikeImageRouter.get(
	'/bike/image/all/:bikeId',
	bikeValidationMiddleware,
	async (req, res) => {
		try {
			const imageData = await BikeDocument.find({
				productId: req.params.bikeId,
				doctype: 'image',
			})
			if (!imageData || imageData.length == 0) {
				throw 'No images found'
			}
			res.send({
				success: {
					data: imageData,
					message: 'All image data fetched successfully.',
				},
			})
		} catch (e) {
			res.send({ error: { e, message: 'Something went wrong' } })
		}
	}
)

// dummy api call
bikeImageRouter.delete('/bike/all/image', async (req, res) => {
	await BikeDocument.deleteMany({ doctype: 'image' })
	res.send('All bike images are deleted')
})
bikeImageRouter.get('/bike/all/image', async (req, res) => {
	try {
		const allBikeImages = await BikeDocument.find({ doctype: 'image' })
		// console.log(allBikeImages, allBikeImages['mime-type'])
		// res.set('Content-Type', '')
		res.send({
			success: {
				data: allBikeImages,
				message: 'All bike images fetched successfully',
			},
		})
	} catch (e) {
		console.log(e)
		res.send({ error: { message: 'Something went wrong', e } })
	}
})

module.exports = bikeImageRouter
