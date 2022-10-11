import React from 'react'

import BikeCard from '../../components/FunctionalComponents/BikeCard/BikeCard'
import Carousel from '../../components/FunctionalComponents/Carousel/Carousel'
import Card from '../../components/UI/Card/Card'
import PageHolder from '../../components/UI/PageHolder/PageHolder'

import styles from './home.module.css'
const Home = () => {


  return (
      <PageHolder className={styles['home']}>
          <Carousel
              className={styles['home__carousel']}
              imageChangeInterval={8000}
          />
          <div className={styles['home__bikes-div']}>
              <Card className={styles['home__bikes-div__h1-card']}>
                  <h1>Select your ride from here</h1>
              </Card>
              <BikeCard
                  className={styles['home__bikes-div__bike-card']}
                  bookButtonClassName={
                      styles['home__bikes-div__bike-card__book-button']
                  }
              />
              <BikeCard
                  className={styles['home__bikes-div__bike-card']}
                  bookButtonClassName={
                      styles['home__bikes-div__bike-card__book-button']
                  }
              />
              <BikeCard
                  className={styles['home__bikes-div__bike-card']}
                  bookButtonClassName={
                      styles['home__bikes-div__bike-card__book-button']
                  }
              />
              <BikeCard
                  className={styles['home__bikes-div__bike-card']}
                  bookButtonClassName={
                      styles['home__bikes-div__bike-card__book-button']
                  }
              />
              <BikeCard
                  className={styles['home__bikes-div__bike-card']}
                  bookButtonClassName={
                      styles['home__bikes-div__bike-card__book-button']
                  }
              />
              <BikeCard
                  className={styles['home__bikes-div__bike-card']}
                  bookButtonClassName={
                      styles['home__bikes-div__bike-card__book-button']
                  }
              />
              <BikeCard
                  className={styles['home__bikes-div__bike-card']}
                  bookButtonClassName={
                      styles['home__bikes-div__bike-card__book-button']
                  }
              /><BikeCard
                  className={styles['home__bikes-div__bike-card']}
                  bookButtonClassName={
                      styles['home__bikes-div__bike-card__book-button']
                  }
              />
          </div>
      </PageHolder>
  )
}

export default Home