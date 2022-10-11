import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL_DELETE_USER } from '../../utils/macros/entity-macros/userApiMacros'
import {
    KEY_USER_AUTH_TOKEN,
    KEY_USER_DATA,
    KEY_USER_LOGIN_STATE,
} from '../../utils/macros/generalMacros'

const initialState = {
    isLoggedIn: localStorage.getItem(KEY_USER_LOGIN_STATE),
    userAuthToken: localStorage.getItem(KEY_USER_AUTH_TOKEN),
    userData: localStorage.getItem(KEY_USER_DATA),
    Error: {
        isError: false,
    },
    isLoading: false,
}

export const deleteUserAccount = createAsyncThunk(
    'loginState/deleteUserAccount',
    async (authToken, thunkAPI) => {
        try {
            const resp = await axios.delete(URL_DELETE_USER, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })

            if (resp.data.error) {
                throw resp.data.error
            }
            return thunkAPI.fulfillWithValue(resp.data.success)
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const loggedInSlice = createSlice({
    name: 'loginState',
    initialState,
    reducers: {
        isLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        userAuthToken: (state, action) => {
            state.userAuthToken = action.payload
        },
        userData: (state, action) => {
            state.userData = action.payload
        },
        signOnHandler: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.userAuthToken = action.payload.userAuthToken
            state.userData = action.payload.userData
        },
        logOutHandler: (state) => {
            state.isLoggedIn = false
            state.userAuthToken = ''
            state.userData = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteUserAccount.fulfilled, (state, action) => {
            console.log(action, 'accepted')
            state.isLoading = false
            
            state.Error = { isError: false }
            
            state.isLoggedIn = false
            state.userAuthToken = ''
            state.userData={}
        })
        builder.addCase(deleteUserAccount.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteUserAccount.rejected, (state, action) => {
            console.log(action,'rejected')
            state.isLoading = false
            state.Error = {
                isError: true,
                ...action.payload,
            }
        })

    }
})


export const loggedInStateActions = loggedInSlice.actions

export default loggedInSlice.reducer