import { createSlice } from '@reduxjs/toolkit'
import { addDays } from 'date-fns'
import { getNumberOfDaysBetweenTwoDates } from '../../components/FunctionalComponents/BikeBookingComponents/BookingDateSelectionCard/Calendar/utils/helperFunctions'


const newBookingInitialState = {
    rentalStartDate: new Date().getTime(),
    rentalEndDate: addDays(new Date(), 3).getTime(),
    totalNumberOfDays: false,
    totalCost: 1000,
    bookingAmount: 100,
    Error: {
        isError: false,
        e: {
            message: '',
            name: '',
        },
    },
    isBikeSelected: false,
    selectedBike: {
        name: 'Hornet 160',
        manufacturer: 'Honda',
        registration_date: '01-01-2022',
        engine_size: '160cc',
        condition: 'Excellent',
        per_day_charge: 800,
        licence_plate_number: 'HU 41 KE 1977',
        color: 'black',
        total_distance_travelled: 1796,
        images: []
    },
}

const newBookingReducers = {
    addBooking: (state, action) => {
        state.Error.isError = false
        const { rentalStartDate, rentalEndDate, perDayPrice } = action.payload
        const totalNumberOfDays = parseInt(getNumberOfDaysBetweenTwoDates(
            rentalStartDate,
            rentalEndDate
        )+1)
        const totalCost = state.selectedBike.per_day_charge*totalNumberOfDays
        // console.log('new booking slice add booking totalnumber of days',
        //     totalNumberOfDays,
        //     'total cost',
        //     totalCost
        // )
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
    },
    resetState: (state, action) => {
        const selectedBikeData = { ...state.selectedBike }
        // console.log(selectedBikeData)
        state = { ...newBookingInitialState }
        state.selectedBike = {...selectedBikeData}
    },
    selectedBike: (state, action) => {
        state.isBikeSelected = true
        state.selectedBike = action.payload
    },
    resetSelectedBike: (state, action) => {
        state.isBikeSelected = false
        
    }
}

const newBookingSlice = createSlice({
    name: 'newBooking',
    initialState:newBookingInitialState,
    reducers: newBookingReducers,
}) 


export const newBookingActions = newBookingSlice.actions

export default newBookingSlice.reducer
