import { createSlice } from '@reduxjs/toolkit'
import { addDays } from 'date-fns'
import { getNumberOfDaysBetweenTwoDates } from '../../components/FunctionalComponents/BikeBookingComponents/BookingDateSelectionCard/Calendar/utils/helperFunctions'


const initialState = {
    rentalStartDate: new Date().getTime(),
    rentalEndDate: addDays(new Date(), 3).getTime(),
    totalNumberOfDays: false, // will be handled as store-subscription
    totalCost:1000,
    bookingAmount: 100,
    Error: {
        isError: false,
        e:{}
    }
}

const newBookingReducers = {
    addBooking: (state, action) => {
        // console.log(action.payload)
        state.Error.isError = false
        const { rentalStartDate, rentalEndDate, perDayPrice } = action.payload
        const totalNumberOfDays = getNumberOfDaysBetweenTwoDates(
            rentalStartDate,
            rentalEndDate
        )+1
        const totalCost = perDayPrice*totalNumberOfDays
        console.log('new booking slice add booking totalnumber of days',
            totalNumberOfDays,
            'total cost',
            totalCost
        )
        state.rentalStartDate = rentalStartDate
        state.rentalEndDate = rentalEndDate
        state.totalNumberOfDays = totalNumberOfDays
        state.totalCost = totalCost 
    },
    rentalStartDate: (state, action) => {
        state.Error.isError = false
        state.rentalStartDate = action.payload
    },
    rentalEndDate: (state, action) => {
        state.Error.isError = false
        state.rentalEndDate = action.payload
    },
    totalNumberOfDays: (state, action) => {
        state.Error.isError = false
        state.totalNumberOfDays = action.payload
    },
    Error: (state, action) => {
        state.Error.isError = true
        state.totalNumberOfDays = false
        state.Error.e = action.payload
    }
}

const newBookingSlice = createSlice({
    name:'newBooking',
    initialState,
    reducers: newBookingReducers
}) 


export const newBookingActions = newBookingSlice.actions

export default newBookingSlice.reducer