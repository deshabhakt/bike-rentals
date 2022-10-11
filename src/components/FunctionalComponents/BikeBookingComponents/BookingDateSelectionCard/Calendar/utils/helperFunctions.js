import {
    DAY_FRIDAY,
    DAY_MONDAY,
    DAY_SATURDAY,
    DAY_SUNDAY,
    DAY_THURSDAY,
    DAY_TUESDAY,
    DAY_WEDNESDAY,
    MONTH_APRIL,
    MONTH_AUGUST,
    MONTH_DECEMBER,
    MONTH_FEBRUARY,
    MONTH_JANUARY,
    MONTH_JULY,
    MONTH_JUNE,
    MONTH_MARCH,
    MONTH_MAY,
    MONTH_NOVEMBER,
    MONTH_OCTOBER,
    MONTH_SEPTEMBER,
} from './calendarMacros'

export const orderOfWeekDays = [
    DAY_SATURDAY,
    DAY_SUNDAY,
    DAY_MONDAY,
    DAY_TUESDAY,
    DAY_WEDNESDAY,
    DAY_THURSDAY,
    DAY_FRIDAY,
]

export const getNumberOfDaysBetweenTwoDates = (date1,date2) => {
    const parsedDate1 = new Date(date1)
    const parsedDate2 = new Date(date2)
    console.log('date1',date1,'date2',date2)
    const diffInTime = parsedDate2.getTime() - parsedDate1.getTime()
    const diffInDays = diffInTime / (1000 * 3600 * 24)
    return diffInDays 
}

export const getDayFromDate = (date, month, year) => {
    const dateString = `${date}/${month}/${year}`
    // console.log('get day',date,month,year,dateString)
    const d = new Date(dateString)
    // console.log('getDayFromdate day',d)
    switch (d.getDay()) {
        case 0:
            return DAY_SUNDAY
        case 1:
            return DAY_MONDAY
        case 2:
            return DAY_TUESDAY
        case 3:
            return DAY_WEDNESDAY
        case 4:
            return DAY_THURSDAY
        case 5:
            return DAY_FRIDAY
        case 6:
            return DAY_SATURDAY
        default:
            return 0
    }
}

export const getSerialNumberOfMonth = (month = MONTH_FEBRUARY) => {
    switch (month) {
        case MONTH_JANUARY:
            return 1
        case MONTH_FEBRUARY:
            return 2
        case MONTH_MARCH:
            return 3
        case MONTH_APRIL:
            return 4
        case MONTH_MAY:
            return 5
        case MONTH_JUNE:
            return 6
        case MONTH_JULY:
            return 7
        case MONTH_AUGUST:
            return 8
        case MONTH_SEPTEMBER:
            return 9
        case MONTH_OCTOBER:
            return 10
        case MONTH_NOVEMBER:
            return 11
        case MONTH_DECEMBER:
            return 12
        default:
            return -1
    }
}

export const getMonthFromSerialNumber = monthSerialNumber => {
    const parsedMonthNumber =
        monthSerialNumber === 0
            ? 12
            : monthSerialNumber === 13
            ? 1
            : monthSerialNumber
    switch (parsedMonthNumber) {
        case 1:
            return MONTH_JANUARY
        case 2:
            return MONTH_FEBRUARY
        case 3:
            return MONTH_MARCH
        case 4:
            return MONTH_APRIL
        case 5:
            return MONTH_MAY
        case 6:
            return MONTH_JUNE
        case 7:
            return MONTH_JULY
        case 8:
            return MONTH_AUGUST
        case 9:
            return MONTH_SEPTEMBER
        case 10:
            return MONTH_OCTOBER
        case 11:
            return MONTH_NOVEMBER
        case 12:
            return MONTH_DECEMBER
        default:
            return 0
    }
}

export const leapYearCheck = year => {
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true
    }
    return false
}

export const getNumberOfDaysInMonthOfNormalYear = (
    monthName = MONTH_JANUARY
) => {
    switch (monthName) {
        case MONTH_JANUARY:
            return 31
        case MONTH_FEBRUARY:
            return 28
        case MONTH_MARCH:
            return 31
        case MONTH_APRIL:
            return 30
        case MONTH_MAY:
            return 31
        case MONTH_JUNE:
            return 30
        case MONTH_JULY:
            return 31
        case MONTH_AUGUST:
            return 31
        case MONTH_SEPTEMBER:
            return 30
        case MONTH_OCTOBER:
            return 31
        case MONTH_NOVEMBER:
            return 30
        case MONTH_DECEMBER:
            return 31
        default:
            return 0
    }
}

export const getAddonDaysAtStart = (startDay = DAY_MONDAY) => {
    return orderOfWeekDays.indexOf(startDay)
}

export const getAddonDaysAtEnd = (endDay = DAY_MONDAY) => {
    return orderOfWeekDays.length - orderOfWeekDays.indexOf(endDay) - 1
}
export const parseDate = (date) => {
    const parsedDate = new Date(date).toDateString()
    return  parsedDate
}
export const parseDateFromDateMonthYear = (date, month, year) => {
    return new Date(`${date}/${month}/${year}`).toDateString()
}

export const parseDateForHTMLInput = (date) => {
    let parsedDate = new Date(date)
    parsedDate = parsedDate.getFullYear() +
        '-' +
        (parsedDate.getMonth() + 1) +
        '-' +
        parsedDate.getDate() 
    return parsedDate
    // return parsedDate.toISOString().split('T')[0] //// [YYYY-MM-DD]
}

export const compareDates = (date1, date2) => {
    const parsedDate1 = new Date(date1)
    const parsedDate2 = new Date(date2)

    return (parsedDate1.toISOString().split('T')[0]===parsedDate2.toISOString().split('T')[0])
}
export const parseDateForComparison = (date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0)
    return d
}
/* driver code */
export const getMonthsCalendarAsTableRows = (month, year) => {
    var numberOfDays
    if (leapYearCheck(year) && month === MONTH_FEBRUARY) {
        numberOfDays = 29
    } else {
        numberOfDays = getNumberOfDaysInMonthOfNormalYear(month)
    }
    // console.log('numberofdays',numberOfDays)
    const startDay = getDayFromDate(1, month, year)
    // console.log('startDay',startDay)
    const endDay = getDayFromDate(numberOfDays, month, year)
    // console.log('endDay', endDay)

    const previousMonth = getMonthFromSerialNumber(
        getSerialNumberOfMonth(month) - 1
    )
    var numberOfDaysInPreviousMonth = getNumberOfDaysInMonthOfNormalYear(
        previousMonth
    )
    if (leapYearCheck(year) && previousMonth === MONTH_FEBRUARY) {
        numberOfDaysInPreviousMonth += 1
    }

    // console.log('previous month', previousMonth)
    // console.log('numberofdaysinpreviousmonth', numberOfDaysInPreviousMonth)

    const addOnDaysAtStart = getAddonDaysAtStart(startDay)
    // console.log('addonstartday',addOnDaysAtStart)

    const addOnDaysAtEnd = getAddonDaysAtEnd(endDay)
    // console.log('addonendday', addOnDaysAtEnd)

    let counter = 1
    let dayCounter = numberOfDaysInPreviousMonth - addOnDaysAtStart + 1
    // console.log('daycounter --1',dayCounter)
    var daysInAWeekArr = new Array([])
    var weeksInAMonthArr = new Array([])

    while (dayCounter <= numberOfDaysInPreviousMonth) {
        // console.log('starting padding counter', counter, 'date ',`${dayCounter}-${month}-${year}`)
        // daysInAWeekArr.push(new Date(`${counter}-${month}-${year}`))
        daysInAWeekArr.push(dayCounter++)
        counter++
    }
    dayCounter = 1

    while (dayCounter <= numberOfDays) {
        // console.log('counter', counter, 'date ', `${counter}-${month}-${year}`)
        daysInAWeekArr.push(dayCounter++)
        // daysInAWeekArr.push(new Date(`${counter}-${month}-${year}`))
        if (counter % 7 === 0) {
            weeksInAMonthArr.push(daysInAWeekArr)
            daysInAWeekArr = new Array([])
        }
        counter++
    }
    dayCounter = 1

    for (dayCounter = 1; dayCounter <= addOnDaysAtEnd; dayCounter++) {
        // console.log(
        //     'ending padding counter',
        //     counter,
        //     'date ',
        //     `${counter}-${month}-${year}`
        // )
        daysInAWeekArr.push(dayCounter)
        // daysInAWeekArr.push(new Date(`${counter}-${month}-${year}`))
    }
    weeksInAMonthArr.push(daysInAWeekArr)

    // console.log('month array',weeksInAMonthArr)
    return weeksInAMonthArr
}
