import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Calendar from './Calendar/Calendar.js'

import { newBookingActions } from '../../../../store/features/newBookingSlice'

import {
    parseDateForComparison,
    parseDateForHTMLInput,
} from './Calendar/utils/helperFunctions'

import Card from '../../../UI/Card/Card'

import styles from './bookingCard.module.css'
import Error from '../../../UI/Error/Error.js'
import { addDays } from 'date-fns/esm'
const BookingCard = props => {
    // const [newBookingData, setBookingDates] = useState({
    //     rentalStartDate: new Date(),
    //     rentalEndDate: addDays(new Date(), 5),
    // })

    const newBookingData = useSelector(state => state.newBooking)
    const newBookingDispatcher = useDispatch()

    const onDateChangeHandler = event => {
        const name = event.target.name
        const value = event.target.value
        let newStartDate = undefined
        let newEndDate = undefined
        try {
            if (new Date(value) < new Date()) {

                return;
            }
            
        } catch (e) {
            return console.log('onDate change handler error for' ,name ,'\nerror is ',e)
        }

        if (name === 'rentalStartDate') {
            try {
                newStartDate = new Date(value)
                if (newStartDate.toString() === 'Invalid Date') {
                    throw new Error('Invalid date')
                }
            } catch (e) {
                newStartDate = new Date()
            }
            newEndDate = newBookingData.rentalEndDate
        } else if (name === 'rentalEndDate') {
            try {
                newEndDate = new Date(value)
                if (newEndDate.toString() === 'Invalid Date') {
                    throw new Error('Invalid date')
                }
            } catch (e) {
                newEndDate = new Date()
            }
            newStartDate = newBookingData.rentalStartDate
        }
        switch (event.target.name) {
            case 'rentalStartDate':
                if (
                    parseDateForComparison(newStartDate) >
                    parseDateForComparison(newEndDate)
                ) {
                    newEndDate = new Date(newStartDate)
                    newBookingDispatcher(
                        newBookingActions.rentalEndDate(newEndDate.getTime())
                    )
                }
                return newBookingDispatcher(
                    newBookingActions.rentalStartDate(newStartDate.getTime())
                )
            case 'rentalEndDate':
                
                if (
                    parseDateForComparison(newStartDate) >
                    parseDateForComparison(newEndDate)
                ) {
                    newStartDate = new Date(newEndDate)
                    newBookingDispatcher(
                        newBookingActions.rentalStartDate(
                            newStartDate.getTime()
                        )
                    )
                }
                return newBookingDispatcher(
                    newBookingActions.rentalEndDate(newEndDate.getTime())
                )
            default:
                return
        }
    }

    return (
        <Card
            className={`${styles['booking-card']} ${
                props.className ? props.className : ''
            }`}
        >
            <div className={styles['booking-card__data-container']}>
                <h1 className={styles['booking-card__data-container__heading']}>
                    Book bike now
                </h1>
                <div
                    className={
                        styles['booking-card__data-conatainer__date-input']
                    }
                >
                    <div className={styles['error-div']}>
                        {newBookingData.Error.isError && (
                            <Error error={newBookingData.Error.e} />
                        )}
                    </div>
                    <BookingDateInputTemplate
                        label={'Start Date'}
                        name={'rentalStartDate'}
                        value={parseDateForHTMLInput(
                            newBookingData.rentalStartDate
                        )}
                        onChangeHandler={onDateChangeHandler}
                    />
                    <BookingDateInputTemplate
                        label={'End Date'}
                        name={'rentalEndDate'}
                        value={parseDateForHTMLInput(
                            newBookingData.rentalEndDate
                        )}
                        onChangeHandler={onDateChangeHandler}
                    />
                </div>
                <div
                    className={
                        styles['booking-card__data-container__generated-data']
                    }
                >
                    <label>
                        Total Days:{' '}
                        {!newBookingData.Error.isError &&
                            newBookingData.totalNumberOfDays}
                    </label>
                    <label className={styles['booking-labels']}>
                        Total Price:{' '}
                        {!newBookingData.Error.isError &&
                            newBookingData.totalCost + '/-'}
                    </label>
                </div>
            </div>
            <div className={styles['calendar']}>
                <Calendar />
            </div>
        </Card>
    )
}

const BookingDateInputTemplate = ({ label, name, value, onChangeHandler }) => {
    return (
        <div className={styles['date-input-div']}>
            <label>{label}</label>
            <input
                type="date"
                name={name}
                value={value}
                onChange={event => onChangeHandler(event)}
            />
        </div>
    )
}

export default BookingCard
