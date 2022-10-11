import { configureStore } from '@reduxjs/toolkit';

import signUpReducer from './features/signUpSlice'
import signInReducer from './features/signInSlice'
import loggedInStateReducer from './features/loggedInStateSlice'
import newBookingReducers from './features/newBookingSlice';
import { getNumberOfDaysBetweenTwoDates } from '../components/FunctionalComponents/BikeBookingComponents/BookingDateSelectionCard/Calendar/utils/helperFunctions';
import { KEY_USER_AUTH_TOKEN, KEY_USER_DATA, KEY_USER_LOGIN_STATE } from '../utils/macros/generalMacros';

const store = configureStore({
    reducer: {
        signUp: signUpReducer,
        signIn: signInReducer,
        loggedInState: loggedInStateReducer,
        newBooking:newBookingReducers
    },
})

store.subscribe(() => {
    const state = store.getState()
    localStorage.setItem(KEY_USER_LOGIN_STATE, state.loggedInState.isLoggedIn)
    localStorage.setItem(KEY_USER_AUTH_TOKEN, state.loggedInState.userAuthToken)
    localStorage.setItem(KEY_USER_DATA, JSON.stringify(state.loggedInState.userData))
    // try {
    //     state.newBooking.totalNumberOfDays = getNumberOfDaysBetweenTwoDates(
    //         state.newBooking.rentalEndDate,
    //         state.newBooking.rentalStartDate
    //     )
    // } catch (e) {
    //     console.log(e)
    // }
    
})

export default store;