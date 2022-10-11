const multer = require('multer')
const path = require('path')

const uploadFilesSavePath = path.join(__dirname, '../../public/bike-documents')
console.log(uploadFilesSavePath)

const fileStorage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, uploadFilesSavePath)
	},
	filename: function (req, file, callback) {
		callback(null, file.originalname)
	},
})

const bikeDocMiddleware = multer({
	limits: {
		fileSize: 1000000,
	},
	// dest: uploadFilesSavePath,
	// storage: fileStorage,
	fileFilter(req, file, cb) {
		if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(undefined, 'image')
		} else if (file.originalname.match(/\.pdf$/)) {
			return cb(undefined, 'pdf')
		}
		req.fileFormatError = 'Invalid input file format'
		return cb(null, false)
	},
})

module.exports = bikeDocMiddleware
