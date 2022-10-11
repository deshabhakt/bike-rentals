import React,{ useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const Calendar = ({ range }) => {
    // console.log(startDate,endDate)
    // // date state
    // const [range, setRange] = useState([
    //     {
    //         startDate: new Date(),
    //         endDate: addDays(new Date(), 5),
    //         key: 'selection',
    //         // startDate: new Date(),
    //         // endDate: addDays(new Date(), 5),
    //     },
    // ])
    return (
        <DateRange
            onChange={()=>{}}
            moveRangeOnFirstSelection={false}
            ranges={[range]}
            months={1}
            direction="horizontal"
            className="calendarElement"
        />
    )
}

export default Calendar
