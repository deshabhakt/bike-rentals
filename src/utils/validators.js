const {
  ERROR_dateOfBirth_MESSAGE,
  ERROR_dateOfBirth_NAME,
  ERROR_EMAIL_MESSAGE,
  ERROR_EMAIL_NAME,
  ERROR_mobileNumber_MESSAGE,
  ERROR_mobileNumber_NAME,
  ERROR_PASSWORD_MESSAGE,
  ERROR_PASSWORD_NAME,
} = require("./macros/errorMacros");
const { MINIMUM_AGE_OF_USER } = require("./macros/otherMacros");

const emailValidator = (email) => {
  const array = email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  if (!array || array.length == 0) {
    return false;
  }
  return true;
};

const passwordValidator = (password) => {
  const array = password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
  if (!array || array.length == 0) {
    return false;
  }
  return true;
};

const mobileNumberValidator = (mobileNumber) => {
  const array = mobileNumber.match(/[0-9]{10,10}/);
  if (!array || array.length == 0) {
    return false;
  }
  return true;
};

const dateOfBirthValidator = (date, minAge = MINIMUM_AGE_OF_USER) => {
  const today = new Date();
  const birthDate = new Date(date);
  if (isNaN(birthDate.getTime())) {
    throw "Invalid date";
  }
  var age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age > minAge;
};

const validateUser = (email, password, mobileNumber, dateOfBirth) => {
  if (!emailValidator(email)) {
    return {
      isError: true,
      message: ERROR_EMAIL_MESSAGE,
      name: ERROR_EMAIL_NAME,
    };
  }
  if (!mobileNumberValidator(mobileNumber)) {
    return {
      isError: true,
      message: ERROR_mobileNumber_MESSAGE,
      name: ERROR_mobileNumber_NAME,
    };
  }
  if (!dateOfBirthValidator(dateOfBirth)) {
    return {
      isError: true,
      message: ERROR_dateOfBirth_MESSAGE,
      name: ERROR_dateOfBirth_NAME,
    };
  }
  if (!passwordValidator(password)) {
    return {
      isError: true,
      message: ERROR_PASSWORD_MESSAGE,
      name: ERROR_PASSWORD_NAME,
    };
  }
  return {
    isError: false,
  };
};

module.exports = {
    emailValidator,
    mobileNumberValidator,
    dateOfBirthValidator,
    passwordValidator,
    validateUser
}