import { MINIMUM_AGE_OF_USER } from "../generalMacros"

export const ERROR_EMAIL_NAME = 'INVALID EMAIL ADDRESS'
export const ERROR_EMAIL_MESSAGE = 'Entered email address is invalid'

export const ERROR_PASSWORD_NAME = 'INVALID PASSWORD'
export const ERROR_PASSWORD_MESSAGE = 'Password should contain atleast 1 upper-case letter, 1 lower-case letter, 1 digit and 1 character and it should be atleast 8 characters long'

export const ERROR_mobileNumber_NAME = 'INVALID MOBILE NUMBER'
export const ERROR_mobileNumber_MESSAGE = 'Entered mobile number is invalid'

export const ERROR_dateOfBirth_NAME = 'INVALID AGE'
export const ERROR_dateOfBirth_MESSAGE = `Age must be more than ${MINIMUM_AGE_OF_USER} years`