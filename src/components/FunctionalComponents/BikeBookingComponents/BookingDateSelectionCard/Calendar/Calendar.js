import React, { useEffect, useState } from 'react'

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
import { monthYearActionTypes } from '../BookingCard'
import styles from './calendar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { newBookingActions } from '../../../../../store/features/newBookingSlice'
import { BOOKING_OVER_LAP_ERROR } from '../../../../../utils/macros/react-macros/reactBikeBookingMacros'

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
        const rentalStartDate = parseDateForComparison(
            bookings[j].rentalStartDate
        )
        const rentalEndDate = parseDateForComparison(bookings[j].rentalEndDate)

        if (
            proposedRentalDate >= rentalStartDate &&
            proposedRentalDate < rentalEndDate
        ) {
            return true
        }
    }
}

const isOverlap = (propsedRentalDates, bookings) => {
    for (let i = 0; i < propsedRentalDates.length; i++) {
        const proposedRentalDate = parseDateForComparison(propsedRentalDates[i])
        for (let j = 0; j < bookings.length; j++) {
            const rentalStartDate = parseDateForComparison(
                bookings[j].rentalStartDate
            )
            const rentalEndDate = parseDateForComparison(
                bookings[j].rentalEndDate
            )

            if (
                proposedRentalDate >= rentalStartDate &&
                proposedRentalDate < rentalEndDate
            ) {
                return true
            }
        }
    }
}

const Calendar = ({ className, monthYear, monthYearDispatcher }) => {
    const [selectedDateRange, setSelectedDateRange] = useState([])

    const newBookingData = useSelector((state) => state.newBooking)
    const newBookingDipatcher = useDispatch()

    useEffect(() => {
        try {
            let flag = false
            let datesArr = new Array()
            let currentDate = parseDate(newBookingData.rentalStartDate)
            let lastDate = parseDate(newBookingData.rentalEndDate)
            // console.log('current date',currentDate,lastDate)
            while (!compareDates(currentDate, lastDate)) {
                if (isOverlap([currentDate], dummyBookingDatesOfBike)) {
                    newBookingDipatcher(
                        newBookingActions.Error(BOOKING_OVER_LAP_ERROR)
                    )
                    flag = true
                    break
                }
                datesArr.push(currentDate)
                currentDate = parseDate(addDays(new Date(currentDate), 1))
            }
            if (!flag) {
                if (isOverlap([currentDate], dummyBookingDatesOfBike)) {
                    newBookingDipatcher(
                        newBookingActions.Error(BOOKING_OVER_LAP_ERROR)
                    )
                }
                datesArr.push(currentDate)
                setSelectedDateRange(datesArr)
                newBookingDipatcher(
                    newBookingActions.addBooking({
                        rentalStartDate: newBookingData.rentalStartDate,
                        rentalEndDate: newBookingData.rentalEndDate,
                        perDayPrice: 1000,
                    })
                )
            }
        } catch (e) {
            console.log(e)
        }
    }, [newBookingData.rentalStartDate, newBookingData.rentalEndDate])

    const monthYearButtonClickHandler = (event) => {
        monthYearDispatcher({ type: event.target.name })
    }

    return (
        <div
            className={`${styles['calendar-container']} ${
                className ? className : ''
            }`}
        >
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
                        monthYear.year,
                        selectedDateRange
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

function getMonthsCalendarAsTableRows(month, year, selectedDateRange) {
    var numberOfDaysInCurrentMonth
    if (leapYearCheck(year) && month === MONTH_FEBRUARY) {
        numberOfDaysInCurrentMonth = 29
    } else {
        numberOfDaysInCurrentMonth = getNumberOfDaysInMonthOfNormalYear(month)
    }
    const startDay = getDayFromDate(1, month, year)
    const endDay = getDayFromDate(numberOfDaysInCurrentMonth, month, year)

    const previousMonth = getMonthFromSerialNumber(
        getSerialNumberOfMonth(month) - 1
    )
    var numberOfDaysInPreviousMonth =
        getNumberOfDaysInMonthOfNormalYear(previousMonth)
    if (leapYearCheck(year) && previousMonth === MONTH_FEBRUARY) {
        numberOfDaysInPreviousMonth += 1
    }
    const addOnDaysAtStart = getAddonDaysAtStart(startDay)
    const addOnDaysAtEnd = getAddonDaysAtEnd(endDay)

    let counter = 1
    let dayCounter = numberOfDaysInPreviousMonth - addOnDaysAtStart + 1
    
    let parsedDate
    let currentDateElement
    let daysInAWeekArr = new Array()
    let weeksInAMonthArr = new Array()

    while (dayCounter <= numberOfDaysInPreviousMonth) {
        parsedDate = parseDateFromDateMonthYear(
            dayCounter,
            getMonthFromSerialNumber(getSerialNumberOfMonth(month) - 1),
            year
        )
        if (selectedDateRange.includes(parsedDate)) {
            currentDateElement = (
                <td
                    key={Math.random()}
                    className={`${styles['selected-inactive-days']} ${styles['calendar-table-body-tr-td']}`}
                >
                    {dayCounter++}
                </td>
            )
        } else {
            currentDateElement = (
                <td
                    key={Math.random()}
                    className={`${styles['inactive-days']} ${styles['calendar-table-body-tr-td']}`}
                >
                    {dayCounter++}
                </td>
            )
        }
        daysInAWeekArr.push(currentDateElement)
        // dayCounter++
        counter++
    }

    // while (dayCounter <= numberOfDaysInPreviousMonth) {
    //     daysInAWeekArr.push(
    //         <td className={styles['inactive-days']} key={Math.random()}>
    //             {dayCounter++}
    //         </td>
    //     )
    //     counter++
    // }
    dayCounter = 1

    while (dayCounter <= numberOfDaysInCurrentMonth) {
        parsedDate = parseDateFromDateMonthYear(dayCounter, month, year)
        if (isBookedDate(parsedDate, dummyBookingDatesOfBike)) {
            currentDateElement = (
                <td
                    key={Math.random()}
                    className={`${styles['booked-days']} ${styles['calendar-table-body-tr-td']}`}
                >
                    {dayCounter}
                </td>
            )
        } else if (selectedDateRange.includes(parsedDate)) {
            currentDateElement = (
                <td
                    key={Math.random()}
                    className={`${styles['selected-days']} ${styles['calendar-table-body-tr-td']}`}
                >
                    {dayCounter}
                </td>
            )
        } else if (compareDates(new Date(), parsedDate)) {
            currentDateElement = (
                <td key={Math.random()} className={`${styles['today']} ${styles['calendar-table-body-tr-td']}`}>
                    {dayCounter}
                </td>
            )
        } else {
            currentDateElement = (
                <td
                    key={Math.random()}
                    className={`${styles['active-days']} ${styles['calendar-table-body-tr-td']}`}
                >
                    {dayCounter}
                </td>
            )
        }

        daysInAWeekArr.push(currentDateElement)
        if (counter % 7 === 0) {
            weeksInAMonthArr.push(daysInAWeekArr)
            daysInAWeekArr = new Array()
        }
        dayCounter++
        counter++
    }
    dayCounter = 1

    for (; dayCounter <= addOnDaysAtEnd; dayCounter++) {
        parsedDate = parseDateFromDateMonthYear(
            dayCounter,
            getMonthFromSerialNumber(getSerialNumberOfMonth(month) + 1),
            year
        )
        if (selectedDateRange.includes(parsedDate)) {
            currentDateElement = (
                <td
                    key={Math.random()}
                    className={`${styles['selected-days']} ${styles['calendar-table-body-tr-td']}`}
                >
                    {dayCounter}
                </td>
            )
        } else {
            currentDateElement = (
                <td
                    key={Math.random()}
                    className={`${styles['inactive-days']} ${styles['calendar-table-body-tr-td']}`}
                >
                    {dayCounter}
                </td>
            )
        }
        daysInAWeekArr.push(currentDateElement)
        counter++
    }
    if (daysInAWeekArr.length !== 0) {
        weeksInAMonthArr.push(daysInAWeekArr)
        daysInAWeekArr = new Array()
    }

    while (weeksInAMonthArr.length !== 7) {
        if (daysInAWeekArr.length === 7) {
            weeksInAMonthArr.push(daysInAWeekArr)
            daysInAWeekArr = new Array()
        }
        parsedDate = parseDateFromDateMonthYear(
            dayCounter,
            getMonthFromSerialNumber(getSerialNumberOfMonth(month) + 1),
            year
        )
        if (selectedDateRange.includes(parsedDate)) {
            currentDateElement = (
                <td
                    key={Math.random()}
                    className={`${styles['selected-inactive-days']} ${styles['calendar-table-body-tr-td']}`}
                >
                    {dayCounter++}
                </td>
            )
        } else {
            currentDateElement = (
                <td
                    key={Math.random()}
                    className={`${styles['inactive-days']} ${styles['calendar-table-body-tr-td']}`}
                >
                    {dayCounter++}
                </td>
            )
        }

        daysInAWeekArr.push(currentDateElement)
        counter++
    }

    return weeksInAMonthArr
}
