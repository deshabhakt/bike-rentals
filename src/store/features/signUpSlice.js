import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_SIGN_UP_USER } from "../../utils/macros/entity-macros/userApiMacros";

import { loggedInStateActions } from './loggedInStateSlice'

const initialState = {
    FIRST_NAME: {
        name: 'first_name',
        value: 'Deshabhakt',
        type: 'text',
        label: 'First Name',
    },
    LAST_NAME: {
        name: 'last_name',
        value: 'Gavali',
        type: 'text',
        label: 'Last Name',
    },
    dateOfBirth: {
        name: 'dateOfBirth',
        value: '23/05/1997',
        type: 'date',
        label: 'Date Of Birth',
    },
    mobileNumber: {
        name: 'mobileNumber',
        value: '9503638276',
        type: 'Number',
        label: 'Mobile Number',
        length: 10,
    },
    EMAIL: {
        name: 'email',
        value: 'dgavali1@gmail.com',
        type: 'email',
        label: 'Email',
    },
    PASSWORD: {
        name: 'password',
        value: 'aA1@aA1@',
        type: 'password',
        label: 'Password',
    },

    Error: {
        isError: false,
    },
    isLoading: false,
}

export const createUser = createAsyncThunk(
    'signUp/createUser',
    async (data,thunkAPI) => {
        try {
            const userData = {
                first_name: data.FIRST_NAME.value,
                last_name: data.LAST_NAME.value,
                email: data.EMAIL.value,
                mobileNumber: data.mobileNumber.value,
                dateOfBirth: data.dateOfBirth.value,
                password: data.PASSWORD.value
            }
            const resp = await axios.post(URL_SIGN_UP_USER, userData)
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
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong while signing-up')
        }
    }
)

const signUpReducer = {
    firstName: (state, action) => {
        state.FIRST_NAME.value = action.payload
    },
    lastName: (state, action) => {
        state.LAST_NAME.value = action.payload
    },
    dateOfBirth: (state, action) => {
        state.dateOfBirth.value = action.payload
    },
    mobileNumber: (state, action) => {
        state.mobileNumber.value = action.payload
    },
    email: (state, action) => {
        state.EMAIL.value = action.payload
    },
    password: (state, action) => {
        state.PASSWORD.value = action.payload
    },
    error: (state, action) => {
        state.ERROR = { ...action.payload }
    },
    loading: (state, action) => {
        state.isLoading = action.payload 
    }
}

const extraReducers = (builder) => {
    builder.addCase(createUser.pending, (state) => {
            state.isLoading = true        
    })

    builder.addCase(createUser.rejected, (state, action) => {
        state.isLoading = false
        state.Error = {
            isError: true,
            ...action.payload,
        }
    })

    builder.addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.Error = {isError: false}
    })

}

const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: signUpReducer,
    extraReducers
})


export const signUpActions = signUpSlice.actions

export default signUpSlice.reducer