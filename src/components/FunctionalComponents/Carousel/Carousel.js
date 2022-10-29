import React, { useEffect,useState } from "react";
import { shuffleArray } from "../../../utils/helperFunctions";

import styles from './carousel.module.css'

const Carousel = (props) => {

    const [imageStyles, setImageStyles] = useState({
        image_0: {
            marginLeft: '-100%',
        },
        image_1: {},
        image_2: {
            marginRight: '-100%',
        },
    })

    const [imageIndex, setImageIndex] = useState({
        index_0: 2,
        index_1: 3,
        index_2:4
    })

    const imageChangeInterval = 6000

    const [imageAnimation, setImageAnimation] = useState(
        'carousel__image-animation'
    )
    
    let images = []
    try {
        if (props.images.length === 0) {
            throw 'Carousel: Empty images array'
        }
        for (let i = 0; i < props.images.length; i++) {
             images.push(
                  {
                    src:props.images[i].data,
                    alt:props.images[i].name
                }
             )
         }
        
    } catch (e) {
        // console.log(e)
        for (let i = 1; i <= 71; i++) {
            images.push(
                {
                    src:'/temp-bike-images/image' + i + '.jpg',
                    alt:`${'bike-image-' + i}`
                }
                
            )
        }
    }

    const leftButtonClickHandler = () => {
        // setImageAnimation(prev => 'carousel__image-animation')
        setImageIndex(prev => {

            return {
                index_0:
                    prev.index_0 - 1 < 0 ? images.length - 1 : prev.index_0 - 1,
                index_1:
                    prev.index_1 - 1 < 0 ? images.length - 1 : prev.index_1 - 1,
                index_2:
                    prev.index_2 - 1 < 0 ? images.length - 1 : prev.index_2 - 1,
            }
        })
    }

    const rightButtonClickHandler = () => {
        // setImageAnimation((prev) => 'carousel__image-animation')
       setImageIndex((prev) => {
           return {
               index_0:
                   prev.index_0 +1===images.length ? 0 : prev.index_0 + 1,
               index_1:
                   prev.index_1 +1===images.length ? 0 : prev.index_1 + 1,
               index_2:
                   prev.index_2 +1===images.length ? 0 : prev.index_2 + 1,
           }
       })
    }
    
    useEffect(() => {
        const timer = setTimeout(() => {
            rightButtonClickHandler()
        }, imageChangeInterval)

        return () => {
            clearTimeout(timer)
        }
    },[])

    return (
        <div
            className={`${styles['carousel']} ${props.className}`}
        >
            {!props.disableButtons && (
                <div
                    className={`${styles['carousel__left-btn']}`}
                    onClick={leftButtonClickHandler}
                >
                    {'<'}
                </div>
            )}
           
            <img
       
                className={`${styles['carousel__image']} ${styles[imageAnimation]}`}
                src={images[imageIndex.index_1].src}
                alt={images[imageIndex.index_1].alt}
            />

            {!props.disableButtons && (
                <div
                    className={`${styles['carousel__right-btn']}`}
                    onClick={rightButtonClickHandler}
                >
                    {'>'}
                </div>
            )}
        </div>
    )
}
export default Carousel;



/* utils */
