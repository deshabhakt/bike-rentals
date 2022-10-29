import React, { useEffect, useReducer, useState } from 'react'

import { addDays } from 'date-fns'

import {
    compareDates,
    getAddonDaysAtEnd,
    getAddonDaysAtStart,
    getDayFromDate,
    getMonthFromSerialNumber,
    getNumberOfDaysInMonthOfNormalYear,
    getSerialNumberOfMonth,
    leapYearCheck,
    orderOfWeekDays,
    parseDate,
    parseDateForComparison,
    parseDateFromDateMonthYear,
} from './utils/helperFunctions'

import { MONTH_FEBRUARY } from './utils/calendarMacros'

import styles from './calendar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { newBookingActions } from '../../../../../store/features/newBookingSlice'

const monthYearActionTypes = {
    INCREMENT_MONTH: 'INCREMENT_MONTH',
    DECREMENT_MONTH: 'DECREMENT_MONTH',
    INCREMENT_YEAR: 'INCREMENT_YEAR',
    DECREMENT_YEAR: 'DECREMENT_YEAR',
}

const monthYearReducer = (state, action) => {
    let month
    switch (action.type) {
        case monthYearActionTypes.INCREMENT_MONTH:
            month = getMonthFromSerialNumber(
                getSerialNumberOfMonth(state.month) + 1
            )
            return {
                ...state,
                month,
            }
        case monthYearActionTypes.DECREMENT_MONTH:
            month = getMonthFromSerialNumber(
                getSerialNumberOfMonth(state.month) - 1
            )
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
        default:
            return console.log('Invalid action type for monthYearReducer')
    }
}

const dummyBookingDatesOfBike = [
    {
        rentalStartDate: new Date('2022-10-10'),
        rentalEndDate: new Date('2022-10-14'),
    },
    {
        rentalStartDate: new Date('2022-10-18'),
        rentalEndDate: new Date('2022-10-22'),
    },
    // {
    //     rentalStartDate: new Date('2022-11-5'),
    //     rentalEndDate: new Date('2022-11-9'),
    // },
    // {
    //     rentalStartDate: new Date('2022-11-18'),
    //     rentalEndDate: new Date('2022-11-22'),
    // },
]
// console.log(dummyBookingDatesOfBike)

const isBookedDate = (propsedRentalDate, bookings) => {
    const proposedRentalDate = parseDateForComparison(propsedRentalDate)
    for (let j = 0; j < bookings.length; j++) {
        const rentalStartDate = parseDateForComparison(bookings[j].rentalStartDate)
        const rentalEndDate = parseDateForComparison(bookings[j].rentalEndDate)

        if (
            proposedRentalDate >= rentalStartDate &&
            proposedRentalDate < rentalEndDate
        ) {
            return true;
        }
    }
}

const isOverlap = (propsedRentalDates,bookings) => {

    for (let i = 0; i < propsedRentalDates.length; i++){
        const proposedRentalDate = parseDateForComparison(propsedRentalDates[i])
        for (let j = 0; j < bookings.length; j++){
            const rentalStartDate = parseDateForComparison(bookings[j].rentalStartDate)
            const rentalEndDate = parseDateForComparison(bookings[j].rentalEndDate)
            
            if (proposedRentalDate >= rentalStartDate && proposedRentalDate < rentalEndDate) {
                return true
            }
        }
    }

}

const Calendar = (props) => {
    // console.log(startDate,endDate)
    const [monthYear, monthYearDispatcher] = useReducer(monthYearReducer, {
        month: getMonthFromSerialNumber(new Date().getMonth() + 1),
        year: new Date().getFullYear(),
    })
    const [selectedDateRange, setSelectedDateRange] = useState([])

    const newBookingData = useSelector((state) => state.newBooking)
    const newBookingDipatcher = useDispatch()

    useEffect(() => {
        try {
            let datesArr = new Array([])
            let currentDate = parseDate(newBookingData.rentalStartDate)
            let lastDate = parseDate(newBookingData.rentalEndDate)

            // if (parseDateForComparison(currentDate) >= parseDateForComparison(lastDate)) {
            //     newBookingDipatcher(
            //         newBookingActions.Error(
            //             'Start date should be lesser than Last date'
            //         )
            //     )
            //     return console.log('Start date should be lesser than Last date')
            // }

            while (!compareDates(currentDate, lastDate)) {
                if (isOverlap([currentDate], dummyBookingDatesOfBike)) {
                    newBookingDipatcher(
                        newBookingActions.Error('Overlap in dates is found')
                    )
                    return console.log('overlap in dates is found')
                }
                datesArr.push(currentDate)
                currentDate = parseDate(addDays(new Date(currentDate), 1))
            }
            if (isOverlap([currentDate], dummyBookingDatesOfBike)) {
                newBookingDipatcher(
                    newBookingActions.Error('Overlap in dates is found')
                )
                return console.log('overlap in dates is found')
            }
            datesArr.push(currentDate)
            setSelectedDateRange(datesArr)
            newBookingDipatcher(newBookingActions.addBooking({
                rentalStartDate: newBookingData.rentalStartDate,
                rentalEndDate: newBookingData.rentalEndDate,
                perDayPrice:1000
                
            }))
        } catch (e) {
            console.log(e)
        }
    }, [newBookingData.rentalStartDate,newBookingData.rentalEndDate])

    const monthYearButtonClickHandler = event => {
        monthYearDispatcher({ type: event.target.name })
    }

    const getMonthsCalendarAsTableRows = (month, year) => {
        var numberOfDaysInCurrentMonth
        if (leapYearCheck(year) && month === MONTH_FEBRUARY) {
            numberOfDaysInCurrentMonth = 29
        } else {
            numberOfDaysInCurrentMonth = getNumberOfDaysInMonthOfNormalYear(
                month
            )
        }
        const startDay = getDayFromDate(1, month, year)
        const endDay = getDayFromDate(numberOfDaysInCurrentMonth, month, year)

        const previousMonth = getMonthFromSerialNumber(
            getSerialNumberOfMonth(month) - 1
        )
        var numberOfDaysInPreviousMonth = getNumberOfDaysInMonthOfNormalYear(
            previousMonth
        )
        if (leapYearCheck(year) && previousMonth === MONTH_FEBRUARY) {
            numberOfDaysInPreviousMonth += 1
        }
        const addOnDaysAtStart = getAddonDaysAtStart(startDay)
        const addOnDaysAtEnd = getAddonDaysAtEnd(endDay)

        let counter = 1
        let dayCounter = numberOfDaysInPreviousMonth - addOnDaysAtStart + 1

        var daysInAWeekArr = new Array([])
        var weeksInAMonthArr = new Array([])

        while (dayCounter <= numberOfDaysInPreviousMonth) {
            daysInAWeekArr.push(
                <td className={styles['inactive-days']} key={Math.random()}>
                    {dayCounter++}
                </td>
            )
            counter++
        }
        dayCounter = 1
        let currentDateElement
        let parsedDate
        while (dayCounter <= numberOfDaysInCurrentMonth) {
            parsedDate = parseDateFromDateMonthYear(
                dayCounter,
                monthYear.month,
                year
            )
            if (isBookedDate(parsedDate,dummyBookingDatesOfBike)) {
                currentDateElement = (
                    <td key={Math.random()} className={styles['booked-days']}>
                        {dayCounter}
                    </td>
                )
            }
            else if (selectedDateRange.includes(parsedDate)) {
                currentDateElement = (
                    <td key={Math.random()} className={styles['selected-days']}>
                        {dayCounter}
                    </td>
                )
            } else if (compareDates(new Date(), parsedDate)) {
                console.log('its a match')
                currentDateElement = (
                    <td key={Math.random()} className={styles['today']}>
                        {dayCounter}
                    </td>
                )
            } else {
                currentDateElement = (
                    <td key={Math.random()} className={styles['active-days']}>
                        {dayCounter}
                    </td>
                )
            }

            daysInAWeekArr.push(currentDateElement)
            if (counter % 7 === 0) {
                weeksInAMonthArr.push(daysInAWeekArr)
                daysInAWeekArr = new Array([])
            }
            dayCounter++
            counter++
        }
        dayCounter = 1

        for (dayCounter = 1; dayCounter <= addOnDaysAtEnd; dayCounter++) {
            daysInAWeekArr.push(
                <td key={Math.random()} className={styles['inactive-days']}>
                    {dayCounter}
                </td>
            )
            counter++
        }
        if (daysInAWeekArr.length !== 0) {
            weeksInAMonthArr.push(daysInAWeekArr)
        }

        if (weeksInAMonthArr.length <= 5) {
            while (true) {
                daysInAWeekArr = new Array([])
                while (dayCounter) {
                    if (daysInAWeekArr.length === 7) {
                        break
                    }
                    daysInAWeekArr.push(
                        <td
                            key={Math.random()}
                            className={styles['inactive-days']}
                        >
                            {dayCounter++}
                        </td>
                    )
                }
                weeksInAMonthArr.push(daysInAWeekArr)
                if (weeksInAMonthArr.length <= 6) {
                    break
                }
            }
        }
        return weeksInAMonthArr
    }


    return (
        <div className={`${styles['calendar-container']} ${props.className?props.className:''}`}>
            <div className={styles['month-year-change-buttons-div']}>
                <MonthChanger
                    month={monthYear.month}
                    onClick={monthYearButtonClickHandler}
                />
                <YearChanger
                    year={monthYear.year}
                    onClick={monthYearButtonClickHandler}
                />
            </div>
            <table className={styles['calendar-table']}>
                <thead className={styles['calendar-table-head']}>
                    <tr>
                        {orderOfWeekDays.map((ele, index) => {
                            return <th key={index + 1}>{ele}</th>
                        })}
                    </tr>
                </thead>
                <tbody className={styles['calendar-table-body']}>
                    {getMonthsCalendarAsTableRows(
                        monthYear.month,
                        monthYear.year
                    ).map((week, weekIndex) => {
                        return <tr key={weekIndex + 1}>{week}</tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

const MonthChanger = ({ month, onClick }) => {
    return (
        <div className={styles['month-changer-div']}>
            <Button
                label="<"
                name={monthYearActionTypes.DECREMENT_MONTH}
                onClick={onClick}
            />
            <span>{month}</span>
            <Button
                label=">"
                name={monthYearActionTypes.INCREMENT_MONTH}
                onClick={onClick}
            />
        </div>
    )
}

const YearChanger = ({ year, onClick }) => {
    return (
        <div className={styles['year-changer-div']}>
            <Button
                label="<"
                name={monthYearActionTypes.DECREMENT_YEAR}
                onClick={onClick}
            />
            <span>{year}</span>
            <Button
                label=">"
                name={monthYearActionTypes.INCREMENT_YEAR}
                onClick={onClick}
            />
        </div>
    )
}

const Button = ({ name, onClick, label }) => {
    return (
        <button
            className={styles['changer-buttons']}
            name={name}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default Calendar

