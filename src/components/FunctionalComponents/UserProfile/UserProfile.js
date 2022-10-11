import React from 'react'
import { useSelector } from 'react-redux'

import { FaUser } from 'react-icons/fa'

import styles from './userProfile.module.css'

const UserProfile = () => {
    const loggedInState = useSelector((state) => state.loggedInState)

    const {
        first_name: firstName,
        last_name: lastName,
        mobileNumber: mobileNumber,
        email,
        dateOfBirth:_dateOfBirth,
        createdAt,
        avatar,
        booking_history: bookingHistory,
    } = loggedInState.userData
    var userSince = 'Invalid Date'
    var dateOfBirth = 'Invalid Date'
    if (createdAt && createdAt.length !== 0) {
        userSince = new Date(createdAt)
    }
    if (_dateOfBirth && _dateOfBirth.toString().length !== 0) {
        dateOfBirth = new Date(_dateOfBirth)
    }

    return (
        <div className={styles['user-profile__user-info-container']}>
            {avatar ? (
                <img
                    className={
                        styles['user-profile__user-info-container__user-icon']
                    }
                    src={avatar}
                    alt={'user-icon'}
                />
            ) : (
                <FaUser
                    className={
                        styles['user-profile__user-info-container__user-icon']
                    }
                />
            )}
            <div
                className={
                    styles['user-profile__user-info-container__user-info']
                }
            >
                <AttributContainer
                    label={'First Name'}
                    data={firstName ? firstName : 'Not Available'}
                />
                <AttributContainer
                    label={'Last Name'}
                    data={lastName ? lastName : 'Not Available'}
                />
                <AttributContainer
                    label={'Email'}
                    data={email ? email : 'Not Available'}
                />
                <AttributContainer
                    label={'Mobile Number'}
                    data={mobileNumber ? mobileNumber : 'Not Available'}
                />
                <AttributContainer
                    label={'Date Of Birth'}
                    data={
                        dateOfBirth.toString() === 'Invalid Date'
                            ? 'Not Available'
                            : dateOfBirth.toLocaleString()
                    }
                />
                <AttributContainer
                    label={'User Since'}
                    data={
                        userSince.toString() !== 'Invalid Date'
                            ? userSince.toLocaleString()
                            : 'Not Available'
                    }
                />

                <AttributContainer
                    label={'Total Number of bookings'}
                    data={
                        bookingHistory ? bookingHistory.length : 'Not Available'
                    }
                />
            </div>
        </div>
    )
}

const AttributContainer = (props) => {
    return (
        <div className={styles['attribute-container']}>
            <h1 className={styles['attribute-container__label']}>
                {props.label}
            </h1>
            <h1 className={styles['attribute-container__data']}>
                {props.data}
            </h1>
        </div>
    )
}

export default UserProfile
