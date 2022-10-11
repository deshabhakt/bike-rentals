import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'

import axios from 'axios'
import { URL_SIGN_IN_USER } from '../../utils/macros/entity-macros/userApiMacros'
import { emailValidator, mobileNumberValidator } from '../../utils/validators'
import { loggedInStateActions } from './loggedInStateSlice'

const initialState = {
    LOGIN_ID: {
        name: 'login_id',
        value: 'dgavali1@gmail.com',
        type: 'text',
        label: 'Login Id',
    },
    PASSWORD: {
        name: 'password',
        value: 'aA1@aA1@',
        type: 'password',
        label: 'Password',
    },
    isLoading: false,
    Error: {
        isError: false,
    }
}
export const signInUser = createAsyncThunk(
    'signIn/signInUser',
    async (payload, thunkAPI) => {
        try {

            const loginData = {}

            if (mobileNumberValidator(payload.LOGIN_ID.value)) {
                loginData['mobileNumber'] = payload.LOGIN_ID.value
            } else if(emailValidator(payload.LOGIN_ID.value)) {
                loginData['email'] = payload.LOGIN_ID.value
            } else {
                throw {
                    e: 'Invalid Login id',
                    message: 'Something went wrong',
                }
            }
            if (payload.PASSWORD.value.length === 0) {
                throw {
                    e: 'Enter Password',
                    message:'Something went wrong'
                }
            }
            loginData['password'] = payload.PASSWORD.value
            
            const resp = await axios.post(URL_SIGN_IN_USER, loginData)
            console.log('loginthunk try response status code',resp.status)
            if (resp.data.error) {
                throw resp.data.error
            }
            thunkAPI.dispatch(
                loggedInStateActions.signOnHandler({
                    isLoggedIn: true,
                    userAuthToken: resp.data.success.data.authToken,
                    userData: resp.data.success.data.userData,
                })
            )

            return resp.data
        } catch (error) {
            console.log('loginthunk catch',error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        loginId: (state, action) => {
            state.LOGIN_ID.value = action.payload
        },
        password: (state, action) => {
            state.PASSWORD.value = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.Error = { isError: false }
            state.isLoading = false
        })
        builder.addCase(signInUser.rejected, (state, action) => {
            state.isLoading = false
            state.Error = {
                isError: true,
                ...action.payload
            }
        })
    },
})

export const signInActions = signInSlice.actions

export default signInSlice.reducer
