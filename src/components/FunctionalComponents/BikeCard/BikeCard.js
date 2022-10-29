import React,{useEffect,useState} from 'react'

import styles from './bikeCard.module.css'

import Carousel from '../Carousel/Carousel'
import Button from '../../UI/Button/Button'
import Card from '../../UI/Card/Card'
import { useNavigate } from 'react-router'
import { REACT_PATH_BOOK_BIKE } from '../../../utils/macros/react-macros/reactBikeBookingMacros'
import { getBikeImagesWithId } from '../../../store/api-calls/bike-images/GET_bikeImages'
import { useDispatch } from 'react-redux'
import { newBookingActions } from '../../../store/features/newBookingSlice'
import { shuffleArray } from '../../../utils/helperFunctions'

function BikeCard(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [bikeImages, setBikeImages] = useState([])

  let bike = {
    name: 'Hornet 160R',
    per_day_charge: '1000',
    hasUserTakenTheBike:false
  }
  

  if (props.bike) {
      bike = {...props.bike}
  }

  useEffect(() => {
      if (!props.bike) {
          return
      }
      getBikeImagesWithId(props.bike._id)
        .then((bikeImages) => {
              shuffleArray(bikeImages)
              setBikeImages(bikeImages)
          })
          .catch((e) => {
              console.log(
                  props.bike,
                  e,
                  'error in fetching images for this bike'
              )
          })
  }, [])
  return (
      <Card
          className={`${styles['bike-card']} ${
              props.className ? props.className : ''
          }`}
      >
          <Carousel
              // className={styles['bike-card__carousel']}
              images={bikeImages}
              disableButtons
          />
          <div className={styles['bike-card__bike-info']}>
              <div className={styles['bike-card__bike-info__price-and-name']}>
                  <h1 className={styles['bike-card__bike-name']}>
                      {bike.name}
                  </h1>
                  <h1 className={styles['bike-card__bike-per-day-price']}>
                      Price: <span>{bike.per_day_charge}/day</span>
                  </h1>
              </div>
              <Button
                  className={`${styles['bike-card__bike-book-button']} ${
                      props.bookButtonClassName ? props.bookButtonClassName : ''
                  }`}
                  onClick={async () => {
                      if (props.bike) {
                          dispatch(
                              newBookingActions.selectedBike({
                                  ...bike,
                                  images: bikeImages,
                              })
                          )
                          navigate(REACT_PATH_BOOK_BIKE)
                      }
                  }}
              >
                  Book Now
              </Button>
          </div>
      </Card>
  )
}

export default BikeCard