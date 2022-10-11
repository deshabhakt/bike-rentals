import {
    ERROR_EMAIL_MESSAGE,
    ERROR_EMAIL_NAME,
    ERROR_dateOfBirth_MESSAGE,
    ERROR_dateOfBirth_NAME,
    ERROR_PASSWORD_MESSAGE,
    ERROR_PASSWORD_NAME,
    ERROR_mobileNumber_MESSAGE,
    ERROR_mobileNumber_NAME
} from './macros/entity-macros/userFormMacros'
import { MINIMUM_AGE_OF_USER } from "./macros/generalMacros"

export const emailValidator = (email) => {
    const array = email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    if (!array || array.length===0) {
        return false;
    }
    return true;
}

export const passwordValidator = (password) => {
    const array = password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    if (!array || array.length===0) {
        return false
    }
    return true
}
    

export const mobileNumberValidator = (mobileNumber) => {
    const array = mobileNumber.match(/[0-9]{10,10}/)
    if (!array || array.length===0) {
        return false
    }
    return true
}

export const dateOfBirthValidator = (date, minAge = MINIMUM_AGE_OF_USER) => {
    const today = new Date()
    const birthDate = new Date(date)
    if (isNaN(birthDate.getTime())) {
        throw 'Invalid date'
    }
    var age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age>minAge
}

// export const dateDifference = (d1, d2=new Date()) =>{
//     const date1 = new Date(d1)
//     const date2 = new Date(d2)
//     if (isNaN(date1.getTime())) {
//         throw 'Invalid date'
//     }
//     var y = date2.getFullYear() - date1.getFullYear()
//     const m = date2.getMonth() - date1.getMonth()
//     const d = date2.getDay() - date1.getDay()
   
//     return {
//         year:y,month:m,date:d
//     }
// }


export const validateFormData = (signUpData,signUpActions,dispatch) => {
    if (!emailValidator(signUpData.EMAIL.value)) {
        return dispatch(
            signUpActions.error({
                isError: true,
                message: ERROR_EMAIL_MESSAGE,
                name: ERROR_EMAIL_NAME,
            })
        )
    }
    if (!mobileNumberValidator(signUpData.mobileNumber.value)) {
        return dispatch(
            signUpActions.error({
                isError: true,
                message: ERROR_mobileNumber_MESSAGE,
                name: ERROR_mobileNumber_NAME,
            })
        )
    }
    if (!dateOfBirthValidator(signUpData.dateOfBirth.value)) {
        return dispatch(
            signUpActions.error({
                isError: true,
                message: ERROR_dateOfBirth_MESSAGE,
                name: ERROR_dateOfBirth_NAME,
            })
        )
    }
    if (!passwordValidator(signUpData.PASSWORD.value)) {
        return dispatch(
            signUpActions.error({
                isError: true,
                message: ERROR_PASSWORD_MESSAGE,
                name: ERROR_PASSWORD_NAME,
            })
        )
    } else {
        return dispatch(
            signUpActions.error({
                isError: false,
                message: '',
                name: '',
            })
        )
    }
}