import React, { useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Calendar from './Calendar/Calendar.js'

import { newBookingActions } from '../../../../store/features/newBookingSlice'

import {
    getMonthFromSerialNumber,
    getSerialNumberOfMonth,
    parseDateForComparison,
    parseDateForHTMLInput,
} from './Calendar/utils/helperFunctions'

import Card from '../../../UI/Card/Card'

import styles from './bookingCard.module.css'
import Error from '../../../UI/Error/Error.js'
import {
    MONTH_DECEMBER,
    MONTH_JANUARY,
} from './Calendar/utils/calendarMacros.js'

export const monthYearActionTypes = {
    INCREMENT_MONTH: 'INCREMENT_MONTH',
    DECREMENT_MONTH: 'DECREMENT_MONTH',
    INCREMENT_YEAR: 'INCREMENT_YEAR',
    DECREMENT_YEAR: 'DECREMENT_YEAR',
    SET_MONTH: 'SET_MONTH',
    SET_YEAR: 'SET_YEAR',
    SET_MONTH_AND_YEAR: 'SET_MONTH_AND_YEAR',
}

const BookingCard = (props) => {
    const newBookingData = useSelector((state) => state.newBooking)
    const newBookingDispatcher = useDispatch()

    const [monthYear, monthYearDispatcher] = useReducer(monthYearReducer, {
        month: getMonthFromSerialNumber(new Date().getMonth() + 1),
        year: new Date().getFullYear(),
    })

    const onDateChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        let newStartDate = undefined
        let newEndDate = undefined
        try {
            if (new Date(value) < new Date()) {
                return
            }
        } catch (e) {
            return console.log(
                'onDate change handler error for',
                name,
                '\nerror is ',
                e
            )
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
                newBookingDispatcher(
                    newBookingActions.rentalStartDate(newStartDate.getTime())
                )
                monthYearDispatcher({
                    type: monthYearActionTypes.SET_MONTH_AND_YEAR,
                    payload: {
                        month: getMonthFromSerialNumber(
                            newStartDate.getMonth() + 1
                        ),
                        year: newStartDate.getFullYear(),
                    },
                })
                return
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

                newBookingDispatcher(
                    newBookingActions.rentalEndDate(newEndDate.getTime())
                )
                monthYearDispatcher({
                    type: monthYearActionTypes.SET_MONTH_AND_YEAR,
                    payload: {
                        month: getMonthFromSerialNumber(
                            newEndDate.getMonth() + 1
                        ),
                        year: newEndDate.getFullYear(),
                    },
                })
                return
            default:
                return
        }
    }

    return (
        <div className={styles['booking-card-main-container']}>
            <Card
                className={`${styles['booking-card']} ${
                    props.className ? props.className : ''
                }`}
            >
                <div className={styles['booking-card__data-container']}>
                    <h1
                        className={
                            styles['booking-card__data-container__heading']
                        }
                    >
                        Book bike now
                    </h1>
                    <div
                        className={
                            styles['booking-card__data-conatainer__date-input']
                        }
                    >
                        <div className={styles['error-div']}></div>
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
                    {newBookingData.Error.isError && (
                        <div className={styles['error-div']}>

                        <Error
                            messageStyles={styles['error-message']}
                            error={newBookingData.Error.e.name}
                            message={newBookingData.Error.e.message}
                            />
                        </div>
                    )}
                    {!newBookingData.Error.isError && (
                        <div
                            className={
                                styles[
                                    'booking-card__data-container__generated-data'
                                ]
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
                    )}
                </div>
            </Card>
            <Card className={styles['calendar-card']}>
                <h1>Booking Dates</h1>
                <Calendar
                    className={styles['calendar']}
                    monthYear={monthYear}
                    monthYearDispatcher={monthYearDispatcher}
                />
            </Card>
        </div>
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
                onChange={(event) => onChangeHandler(event)}
            />
        </div>
    )
}

export default BookingCard

function monthYearReducer(state, action) {
    let month
    switch (action.type) {
        case monthYearActionTypes.INCREMENT_MONTH:
            month = getMonthFromSerialNumber(
                getSerialNumberOfMonth(state.month) + 1
            )
            if (month === MONTH_JANUARY) {
                return {
                    month,
                    year: state.year + 1,
                }
            }
            return {
                ...state,
                month,
            }
        case monthYearActionTypes.DECREMENT_MONTH:
            month = getMonthFromSerialNumber(
                getSerialNumberOfMonth(state.month) - 1
            )
            if (month === MONTH_DECEMBER) {
                return {
                    month,
                    year: state.year - 1,
                }
            }
            return {
                ...state,
                month,
            }
        case monthYearActionTypes.INCREMENT_YEAR:
            return {
                ...state,
                year: state.year + 1,
            }
        case monthYearActionTypes.DECREMENT_YEAR:
            return {
                ...state,
                year: state.year - 1,
            }
        case monthYearActionTypes.SET_MONTH:
            return {
                ...state,
                month: action.payload,
            }
        case monthYearActionTypes.SET_YEAR:
            return {
                ...state,
                year: action.payload,
            }
        case monthYearActionTypes.SET_MONTH_AND_YEAR:
            return {
                month: action.payload.month,
                year: action.payload.year,
            }
        default:
            return console.log('Invalid action type for monthYearReducer')
    }
}
