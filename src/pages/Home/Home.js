import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router'

import BikeCard from '../../components/FunctionalComponents/BikeCard/BikeCard'
import Carousel from '../../components/FunctionalComponents/Carousel/Carousel'
import Card from '../../components/UI/Card/Card'
import PageHolder from '../../components/UI/PageHolder/PageHolder'
import { getBannerImages } from '../../store/api-calls/banner-images/GET-banner-images'
import { getBikes } from '../../store/api-calls/bike/GET_bikes'

import styles from './home.module.css'
const Home = () => {

    const navigate = useNavigate()

    const [bannerImages, setBannerImages] = useState([])
    const [bikesData, setBikesData] = useState([])
    const [bikesCountAndSkip, setBikesCountAndSkip] = useState({
        count: 10,
        skip:0
    })
    useEffect(() => {
        getBannerImages(10).then((bannerImages) => {
            // console.log(bannerImages,'bannerimages')
            setBannerImages(bannerImages)
        }).catch((e) => {
            console.log(e)
        })

        getBikes(bikesCountAndSkip.count, bikesCountAndSkip.skip).then((bikesData) => {
            setBikesData((prev) => {
                return bikesData
            })
        }).catch((error) => {
            console.log(error,'bike fetch count skip')
        })
    },[])

    return (
        <PageHolder className={styles['home']}>
            <Carousel
                className={styles['home__carousel']}
                images={bannerImages}
            />
            <div className={styles['home__bikes-div']}>
                <Card className={styles['home__bikes-div__h1-card']}>
                    <h1>Select your ride from here</h1>
                </Card>
                {bikesData && bikesData.length === 0
                    ? [1, 2, 3, 4, 5].map(() => {
                          return (
                              <BikeCard
                                  className={
                                      styles['home__bikes-div__bike-card']
                                  }
                                  bookButtonClassName={
                                      styles[
                                          'home__bikes-div__bike-card__book-button'
                                      ]
                                  }
                                  key={Math.random()}
                                  disableButtons
                              />
                          )
                      })
                    : bikesData.map((bikeData, index) => {
                          return (
                              <BikeCard
                                  className={
                                      styles['home__bikes-div__bike-card']
                                  }
                                  bookButtonClassName={
                                      styles[
                                          'home__bikes-div__bike-card__book-button'
                                      ]
                                  }
                                  key={Math.random()}
                                  bike={bikeData}
                                  disableButtons
                              />
                          )
                      })}
                <div
                    className={styles['home__load-more-bikes-button']}
                    onClick={() => {
                          navigate('/bikes',{replace:true})
                      }}
                >
                    Load More <span>&#8680;</span>
                </div>
            </div>
        </PageHolder>
    )
}

export default Home
