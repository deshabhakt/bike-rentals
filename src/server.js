require('dotenv').config()

const express = require('express')
const app = express()

require('./database/mongodb')

const userRouter = require('./routers/user-router')
const adminRouter = require('./routers/admin-router')
const bikeRouter = require('./routers/Bike-routers/bike-router')
const bikeDocRouter = require('./routers/Bike-routers/bike-pdf-router')
const bikeImageRouter = require('./routers/Bike-routers/bike-image-router')
const bookingRouter = require('./routers/booking-router')
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin,Content-Type,Authorization,Accept,'
	)
	res.header("Access-Control-Allow-Credentials", "true");
	res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
	next()
})

app.use(express.json())
app.use(userRouter)
app.use(adminRouter)
app.use(bikeRouter)
app.use(bikeDocRouter)
app.use(bikeImageRouter)
app.use(bookingRouter)

app.get('/', (req, res) => {
	res.send('<h1>Backend for bike-rentals project</h1>')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log('Server started successfully')
})
