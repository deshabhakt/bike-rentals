import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import BikeInfoCard from '../../components/FunctionalComponents/BikeBookingComponents/BikeInfoCard/BikeInfoCard'
import BookingCard from '../../components/FunctionalComponents/BikeBookingComponents/BookingDateSelectionCard/BookingCard'
import PageHolder from '../../components/UI/PageHolder/PageHolder'
import { newBookingActions } from '../../store/features/newBookingSlice'

import styles from './bookBike.module.css'

const BookBike = ({ id }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(newBookingActions.resetState())
  },[])
  return (
      <PageHolder className={styles['book-bike']}>
      <BikeInfoCard />
      <BookingCard />
      </PageHolder>
  )
}

export default BookBike