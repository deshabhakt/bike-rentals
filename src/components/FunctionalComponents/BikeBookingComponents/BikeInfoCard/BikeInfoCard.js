import React from 'react'
import Carousel from '../../Carousel/Carousel'

import styles from './bikeInforCard.module.css'
const BikeInfoCard = () => {
    return (
        <div className={styles['bike-info-card']}>
            <Carousel className={styles['bike-info-card__carousel']} />
            <BikeInfoContainer />
        </div>
    )
}

const BikeInfoContainer = () => {
    return (
        <div className={styles['bike-info-container']}>
            <BikeAttributeContainer
                attributeName={'Bike Name'}
                attributeValue={'Pulser 220'}
            />
            <BikeAttributeContainer
                attributeName={'Engine Size'}
                attributeValue={'220cc'}
            />
            <BikeAttributeContainer
                attributeName={'Manufacturer'}
                attributeValue={'Bajaj'}
            />
            <BikeAttributeContainer
                attributeName={'Registration Number'}
                attributeValue={'MH 01 DP 0101'}
            />
            <BikeAttributeContainer
                attributeName={'Registration Date'}
                attributeValue={getDateInDDMMYYY()}
            />

            <BikeAttributeContainer
                attributeName={'Total Distance traveled'}
                attributeValue={'20000 km'}
            />
            <BikeAttributeContainer
                attributeName={'Condition'}
                attributeValue={'Well Maintained'}
            />
            <BikeAttributeContainer
                attributeName={'Per day charge'}
                attributeValue={'1000/-'}
            />
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
