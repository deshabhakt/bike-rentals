const { MINIMUM_AGE_OF_USER } = require("./otherMacros")

exports.ERROR_EMAIL_NAME = 'INVALID EMAIL ADDRESS'
exports.ERROR_EMAIL_MESSAGE = 'Entered email address is invalid'

exports.ERROR_PASSWORD_NAME = 'INVALID PASSWORD'
exports.ERROR_PASSWORD_MESSAGE = 'Password should contain atleast 1 upper-case letter, 1 lower-case letter, 1 digit and 1 character and it should be atleast 8 characters long'

exports.ERROR_mobileNumber_NAME = 'INVALID MOBILE NUMBER'
exports.ERROR_mobileNumber_MESSAGE = 'Entered mobile number is invalid'

exports.ERROR_dateOfBirth_NAME = 'INVALID AGE'
exports.ERROR_dateOfBirth_MESSAGE = `Age must be more than ${MINIMUM_AGE_OF_USER} years`;