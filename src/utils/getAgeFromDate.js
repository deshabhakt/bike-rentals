// export const getAge = (dateOfBirth) => {}
// d1 = new Date(Date.parse('2007-05-02T10:45'))
// d2 = new Date(Date.parse('2017-05-02T12:45'))
// d2 = new Date()
// console.log(d2)
var getDuration = function (d, d2 = new Date()) {
	const [day, month, year] = d.split('/')
	const d1 = new Date(+year, month - 1, +day)
	d3 = new Date(d2 - d1)
	d0 = new Date(0)
	return {
		getYears: function () {
			const years = Math.abs(d3.getFullYear() - d0.getFullYear())
			console.log('User is ', years, 'years old')
			return years
		},
		getMonths: function () {
			return Math.abs(d3.getMonth() - d0.getMonth())
		},
		getDays: function () {
			return Math.abs(d3.getDay() - d0.getDay())
		},
		getHours: function () {
			return Math.abs(d3.getHours() - d0.getHours())
		},
		getMinutes: function () {
			return Math.abs(d3.getMinutes() - d0.getMinutes())
		},
		getMilliseconds: function () {
			return Math.abs(d3.getMilliseconds() - d0.getMilliseconds())
		},
		toString: function () {
			return (
				this.getYears() +
				':' +
				this.getMonths() +
				':' +
				this.getDays() +
				':' +
				this.getHours() +
				':' +
				this.getMinutes() +
				':' +
				this.getMilliseconds()
			)
		},
	}
}

module.exports = getDuration

// diff = getDuration(d1, d2)
// console.log(diff.toString())
