import React from 'react'
import BikeInfoCard from '../../components/FunctionalComponents/BikeBookingComponents/BikeInfoCard/BikeInfoCard'
import BookingCard from '../../components/FunctionalComponents/BikeBookingComponents/BookingDateSelectionCard/BookingCard'
import PageHolder from '../../components/UI/PageHolder/PageHolder'

import styles from './bookBike.module.css'

const BookBike = ({ id }) => {
    
  return (
      <PageHolder className={styles['book-bike']}>
      {/* <BikeInfoCard /> */}
      <BookingCard className={styles['booking-card'] } />
      </PageHolder>
  )
}

export default BookBike