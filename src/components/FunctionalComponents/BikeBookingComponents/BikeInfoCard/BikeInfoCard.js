import React from 'react'
import { useSelector } from 'react-redux'
// import Card from '../../../UI/Card/Card'
import Carousel from '../../Carousel/Carousel'

import styles from './bikeInforCard.module.css'
const BikeInfoCard = () => {
    const selectedBikeData = useSelector((state) => state.newBooking.selectedBike)
    return (
        <div className={styles['bike-info-card']}>
            <Carousel
                className={styles['bike-info-card__carousel']}
                images = {selectedBikeData.images}
                disableButtons
            />
            <BikeInfoContainer
                selectedBikeData={selectedBikeData}
            />
        </div>
    )
}

const BikeInfoContainer = ({selectedBikeData}) => {
    return (
        <div className={styles['bike-info-container']}>
            <BikeAttributeContainer
                attributeName={'Name'}
                attributeValue={selectedBikeData.name}
            />
            <BikeAttributeContainer
                attributeName={'Color'}
                attributeValue={selectedBikeData.color}
            />
            <BikeAttributeContainer
                attributeName={'Engine Size'}
                attributeValue={selectedBikeData.engine_size}
            />

            <BikeAttributeContainer
                attributeName={'Registration Date'}
                attributeValue={selectedBikeData.registration_date}
            />
            <BikeAttributeContainer
                attributeName={'Registration Number'}
                attributeValue={selectedBikeData.licence_plate_number}
            />

            <BikeAttributeContainer
                attributeName={'Total Distance traveled'}
                attributeValue={`${selectedBikeData.total_distance_travelled} km`}
            />
            <BikeAttributeContainer
                attributeName={'Condition'}
                attributeValue={selectedBikeData.condition}
            />
            <BikeAttributeContainer
                attributeName={'Manufacturer'}
                attributeValue={selectedBikeData.manufacturer}
            />
            <div className={styles['price-div']}>
                <BikeAttributeContainer
                    attributeName={'Per day charge'}
                    attributeValue={`${selectedBikeData.per_day_charge}/-`}
                />
            </div>
        </div>
    )
}

const BikeAttributeContainer = ({ attributeName, attributeValue }) => {
  return (
    <div className={styles['bike-attribute-container']}>
      <label>{attributeName}</label>
      <h1>{ attributeValue}</h1>
    </div>
  )
}

const getDateInDDMMYYY = (date = Date.now()) => {
  const typeCastedDate = new Date(date)

  var day = typeCastedDate.getDate()
  day = day.toString().length === 1 ? `0${day}` : day
  
  var month = typeCastedDate.getMonth()
  month = month.toString().length === 1 ? `0${month}` : month

  var year = typeCastedDate.getFullYear()
  
  return day+'/'+month+'/'+year
}

export default BikeInfoCard
