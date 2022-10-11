import React from 'react'

import styles from './bikeCard.module.css'

import Carousel from '../Carousel/Carousel'
import Button from '../../UI/Button/Button'
import Card from '../../UI/Card/Card'
import { useNavigate } from 'react-router'
import { REACT_PATH_BOOK_BIKE } from '../../../utils/macros/react-macros/reactBikeBookingMacros'

function BikeCard(props) {
  const navigate = useNavigate()
  return (
    <Card className={`${styles['bike-card']} ${props.className?props.className:''}` }>
      <Carousel disableButton />
      <div className={styles['bike-card__bike-info']}>
        <div className={styles['bike-card__bike-info__price-and-name']}>
          <h1 className={styles['bike-card__bike-name']}>{props.bikeName ? props.bikeName : 'Pulser 220'}</h1>
          <h1 className={styles['bike-card__bike-per-day-price']}>Price: <span>{props.perDayCharge ? props.perDayCharge : 1000}/day</span></h1>
        </div>
        <Button
          className={`${styles['bike-card__bike-book-button']} ${props.bookButtonClassName?props.bookButtonClassName:''}`}
          onClick={() => {
            navigate(REACT_PATH_BOOK_BIKE)
          }}
        >Book Now</Button>
      </div>
    </Card>
  )
}

export default BikeCard