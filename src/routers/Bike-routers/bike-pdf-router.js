const express = require('express')

const bikePdfRouter = express.Router()

const bikeDocMiddleware = require('../../middlewares/bikeDocumentMiddleware')
const bikeValidationMiddleware = require('../../middlewares/bikeValidationMiddleware')

const adminAuthenticator = require('../../middlewares/adminAuthMiddleware')

const BikeDocument = require('../../database/models/bike-document-model')

bikePdfRouter.post(
	'/bike/doc/:bikeId',
	adminAuthenticator,
	bikeDocMiddleware.single('document'),
	async (req, res) => {
		try {
			if (req.fileFormatError) {
				throw req.fileFormatError
			}
			console.log(req.file.mimetype)

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
				doctype: 'pdf',
			})
			await uploadedDoc.save()

			res.send({
				success: {
					message: 'Document uploaded successfully',
					data: uploadedDoc,
				},
			})
		} catch (e) {
			console.log(e)
			res.send({ error: { message: 'Something went wrong', e } })
		}
	},
	(req, res, next) => {
		console.log(error)
		res.send({ error: { message: 'Something went wrong' } })
		next()
	}
)

bikePdfRouter.delete('/bike/doc/:id', adminAuthenticator, async (req, res) => {
	try {
		const data = await BikeDocument.findOne({
			_id: req.params.id,
			owner: req.admin.id,
			doctype: 'pdf',
		})
		if (!data) {
			throw 'Document not found'
		}
		await data.remove()
		res.send({
			success: { data, message: 'Document deleted successfully' },
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
})

bikePdfRouter.patch(
	'/bike/doc/:id',
	adminAuthenticator,
	bikeDocMiddleware.single('document'),
	async (req, res) => {
		try {
			if (req.fileFormatError) {
				throw req.fileFormatError
			}
			const document = await BikeDocument.findOne({
				_id: req.params.id,
				owner: req.admin.id,
				doctype: 'pdf',
			})

			if (!document) {
				throw 'Document not found'
			}
			const { originalname, encoding, mimetype, buffer, size } = req.file

			document.name = originalname
			document.size = size
			document.mimetype = mimetype
			document.data = buffer.toString('base64')
			document.type = mimetype.split('/')[1]
			document.encoding = encoding

			await document.save()
			console.log('edited doc', document)

			res.send({
				success: {
					data: document,
					message: 'Document updated successfully',
				},
			})
		} catch (e) {
			console.log('error while editing doc', e)
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
bikePdfRouter.get('/bike/doc/:id', async (req, res) => {
	try {
		const bikeDoc = await BikeDocument.findOne({
			_id: req.params.id,
			doctype: 'pdf',
		})
		console.log(bikeDoc)
		// res.set('Content-Type', bikeDocs['mime-type'])
		res.send({
			success: {
				data: bikeDoc,
				message: 'Bike document fetched successfully',
			},
		})
	} catch (e) {
		res.send(e)
	}
})

//api call to get all Documents of a bike
bikePdfRouter.get(
	'/bike/all/doc/:bikeId',
	bikeValidationMiddleware,
	async (req, res) => {
		try {
			const allDocumentsOfBike = await BikeDocument.find({
				productsId: req.params.bikeId,
				doctype: 'pdf',
			})
			if (!allDocumentsOfBike || allDocumentsOfBike.length == 0) {
				throw 'No documents found for given bike'
			}
			res.send({
				success: {
					data: allDocumentsOfBike,
					message: 'All documents of given bike fetched successfully',
				},
			})
		} catch (e) {
			console.log('error while fetching all docs of bike by bikeId', e)
			res.send({
				error: {
					message: 'Something went wrong',
					e,
				},
			})
		}
	}
)

// temprory routes
bikePdfRouter.get('/bike/all/doc', async (req, res) => {
	try {
		const bikeDocs = await BikeDocument.find({
			doctype: 'pdf',
		})
		res.send(bikeDocs)
	} catch (e) {
		res.send(e)
	}
})

bikePdfRouter.delete('/bike/all/doc', async (req, res) => {
	await BikeDocument.deleteMany({
		doctype: 'pdf',
	})
	res.send('All bike documents are deleted')
})

module.exports = bikePdfRouter
