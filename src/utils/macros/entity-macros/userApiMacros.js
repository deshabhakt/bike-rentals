export const SERVER_URL = 'http://192.168.0.178:5000'

export const URL_SIGN_UP_USER = `${SERVER_URL}/user`
export const URL_SIGN_IN_USER = `${SERVER_URL}/user/login`
export const URL_EDIT_USER = `${SERVER_URL}/user/me`
export const URL_DELETE_USER = `${SERVER_URL}/user/me`
export const URL_CHANGE_USER_PASSWORD = `${SERVER_URL}/user/me/change-password`

export const URL_DELETE_USER_BY_ID = (id) => `${SERVER_URL}/user/${id}`
