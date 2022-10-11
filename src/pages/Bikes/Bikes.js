import React from 'react'

import BikeCard from '../../components/FunctionalComponents/BikeCard/BikeCard'
import PageHolder from '../../components/UI/PageHolder/PageHolder'

import styles from './bikes.module.css'
const Bikes = (props) => {
  return (
      <PageHolder className={styles['bikes']}>
          <BikeCard
              className={styles['bikes__bike-card']}
              bookButtonClassName={styles['bikes__bike-card__button']}
          />
          <BikeCard
              className={styles['bikes__bike-card']}
              bookButtonClassName={styles['bikes__bike-card__button']}
          />
          <BikeCard
              className={styles['bikes__bike-card']}
              bookButtonClassName={styles['bikes__bike-card__button']}
          />
          <BikeCard
              className={styles['bikes__bike-card']}
              bookButtonClassName={styles['bikes__bike-card__button']}
          />
          <BikeCard
              className={styles['bikes__bike-card']}
              bookButtonClassName={styles['bikes__bike-card__button']}
          />
          <BikeCard
              className={styles['bikes__bike-card']}
              bookButtonClassName={styles['bikes__bike-card__button']}
          />
      </PageHolder>
  )
}

export default Bikes