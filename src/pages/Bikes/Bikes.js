import React,{useEffect,useRef,useState} from 'react'

import BikeCard from '../../components/FunctionalComponents/BikeCard/BikeCard'
import PageHolder from '../../components/UI/PageHolder/PageHolder'
import { getBikes } from '../../store/api-calls/bike/GET_bikes'
import { shuffleArray } from '../../utils/helperFunctions'

import styles from './bikes.module.css'
const Bikes = (props) => {
    const [bikesData, setBikesData] = useState([])
    // const [bikesCountAndSkip, setBikesCountAndSkip] = useState({
    //     count: 9,
    //     skip: 0,
    // })
    const count = 9
    const skipRef = useRef(0) 

    const getMoreBikes = () => {
        skipRef.current = skipRef.current + count

        getBikes(count, skipRef.current)
            .then((bikesData) => {
                // console.log(skipRef)
                shuffleArray(bikesData)
                setBikesData((prev) => {
                    return [...prev, ...bikesData]
                })
            })
            .catch((error) => {
                console.log(error, 'bike fetch count skip')
            })
    }

    useEffect(() => {
        // skipRef.current = 0

        getBikes(count, skipRef.current)
            .then((bikesData) => {
                shuffleArray(bikesData)
                console.log(bikesData.length, 'bikesdatalength')
                setBikesData((prev) => {
                    return bikesData
                })
            })
            .catch((error) => {
                console.log(error, 'bike fetch count skip')
            })
        
        // return () => {
        //     skipRef.current=0
        // }
    }, [])
  return (
      <PageHolder className={styles['bikes']}>
          <div className={styles['bikes__bike-card-holder']}>
              {bikesData && bikesData.length === 0
                  ? [1, 2, 3, 4, 5].map(() => {
                        return <BikeCard key={Math.random()} disableButtons />
                    })
                  : bikesData.map((bikeData, index) => {
                        return (
                            <BikeCard
                                key={Math.random()}
                                className={styles['bikes__bike-card']}
                                bookButtonClassName={
                                    styles['bikes__bike-card__button']
                                }
                                bike={bikeData}
                                disableButtons
                            />
                        )
                    })}
          </div>
          <div
              className={styles['bikes__get-more-bikes-button']}
              onClick={getMoreBikes}
          >
              <span>Load More</span> <span>&#8681;</span>
          </div>
          <h1>Total bikes fetched:{bikesData.length}</h1>
      </PageHolder>
  )
}

export default Bikes