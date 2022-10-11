import React, { useEffect,useState } from "react";

import styles from './carousel.module.css'

const Carousel = (props) => {

    const imageChangeInterval = 6000
    
    // const imageChangeInterval = props.imageChangeInterval
    //     ? props.imageChangeInterval
    //     : parseInt(Math.random() * (10000 - 6000) + 6000)

    // const keyframesCarouselImageAnimationKey = keyframes`
    //     0% {opacity: 0;}
    //     3% {opacity: 0.25;}
    //     5% {opacity: 0.5;}
    //     7% {opacity: 0.75;}
    //     9% {opacity: 1;}
    // `
    // const carouselImageAnimation = ()=>css`${keyframesCarouselImageAnimationKey} ${imageChangeInterval} linear infinite ease-in-out;`

    const [imageAnimation, setImageAnimation] = useState(
        'carousel__image-animation'
    )

    const images = []
    for (let i = 1; i <= 71; i++){
        images.push(
            <img
                className={`${styles['carousel__image']} ${styles[imageAnimation]}`}
                src={'/temp-bike-images/image' + i + '.jpg'}
                alt={`${'bike-image-' + i}`}
            />
        )
    }

    shuffle(images)

    const [imageIndex, setImageIndex] = useState(4);

    const leftButtonClickHandler = () => {
        setImageAnimation(prev=>'carousel__image-animation')
        setImageIndex(prevIndex => {
            if (prevIndex === 0) {
                return images.length - 1;
            }
            return prevIndex - 1;
        })
    }

    const rightButtonClickHandler = () => {
        setImageAnimation((prev) => 'carousel__image-animation')
        setImageIndex(prevIndex => {
            return (prevIndex+1)%images.length
        })
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            rightButtonClickHandler()
        },imageChangeInterval)
        
        return () => {
            clearTimeout(timer)
        }
    })    

    return (
        <div
            className={`${styles['carousel']} ${props.className}`}
        >
            {!props.disableButton && (
                <div
                    className={`${styles['carousel__left-btn']}`}
                    onClick={leftButtonClickHandler}
                >
                    {'<'}
                </div>
            )}

            {images[imageIndex]}
            {!props.disableButton && (
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
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
