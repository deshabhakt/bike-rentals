const mongoose = require('mongoose')

const dbURL = process.env.DB_BASE_URL + process.env.DB_NAME

console.log(dbURL)

const connection = mongoose.connect(dbURL, {
	useNewUrlParser: true,
})

connection.then((res) => {
	if (res) {
		console.log('database connected successfully.')
	} else {
		console.log('something went wrong while connecting to database')
	}
}).catch(e => {
	console.log(e)
})
