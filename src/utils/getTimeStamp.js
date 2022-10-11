const getDateTimeStamp = () => {
	const date = new Date()
	return date.toLocaleDateString() + ' ' + formatAMPM(date)
}
function formatAMPM(date) {
	let hours = date.getHours()
	let minutes = date.getMinutes()
	let seconds = date.getSeconds()
	let ampm = hours >= 12 ? 'PM' : 'AM'
	hours = hours % 12
	hours = hours ? hours : 12 // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes
	const strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm
	return strTime
}

module.exports = getDateTimeStamp
