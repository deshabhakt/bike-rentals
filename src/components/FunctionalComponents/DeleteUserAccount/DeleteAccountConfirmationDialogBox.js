import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { deleteUserAccount } from '../../../store/features/loggedInStateSlice'

import { REACT_PATH_USER_SIGN_OUT } from '../../../utils/macros/react-macros/reactUserPathMacros'

import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button'

import styles from './deleteUserAccount.module.css'
import Error from '../../UI/Error/Error'

const DeleteAccountConfirmationDialogbox = ({ showConfirmationDialog }) => {
    const loggedInState = useSelector((state) => state.loggedInState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { email, mobileNumber: mobileNumber } = loggedInState.userData

    const [inputState, setInputState] = useState({
        // email: '',
        // mobileNumber: '',
        email: email,
        mobileNumber: mobileNumber,
    })

    const [error, setError] = useState(false)

    const onInputChangeHandler = (event) => {
        setError(false)
        setInputState((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    return (
        <Card className={styles['delete-confirmation-dialogbox']}>
            <h1 className={styles['delete-confirmation-dialogbox__title']}>
                Final Confirmation
            </h1>
            <hr
                className={
                    styles['delete-confirmation-dialogbox__title-separator']
                }
            />
            <h2>To confirm account deletion</h2>
            {email && (
                <div>
                    <h3
                        className={
                            styles['delete-confirmation-dialogbox__label']
                        }
                    >
                        Your email id:
                        <span>{email}</span>
                    </h3>
                    <input
                        className={
                            styles['delete-confirmation-dialogbox__input']
                        }
                        name={'email'}
                        value={inputState.email}
                        placeholder={'Enter your email id here'}
                        onChange={onInputChangeHandler}
                    />
                </div>
            )}
            {mobileNumber && (
                <div>
                    <h3
                        className={
                            styles['delete-confirmation-dialogbox__label']
                        }
                    >
                        Your mobile number:
                        <span>{mobileNumber}</span>
                    </h3>
                    <input
                        className={
                            styles['delete-confirmation-dialogbox__input']
                        }
                        name={'mobileNumber'}
                        value={inputState.mobileNumber}
                        placeholder={'Enter your mobile number here'}
                        onChange={onInputChangeHandler}
                    />
                </div>
            )}
            <div
                className={styles['delete-confirmation-dialogbox__buttons-div']}
            >
                <Button
                    className={
                        styles['delete-confirmation-dialogbox__cancel-btn']
                    }
                    onClick={() => {
                        showConfirmationDialog(false)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    className={
                        styles['delete-confirmation-dialogbox__delete-btn']
                    }
                    onClick={async() => {
                        if (inputState.email !== email) {
                            return setError('Enter correct email')
                        }
                        if (
                            mobileNumber.toString() !==
                            inputState.mobileNumber.toString()
                        ) {
                            return setError('Enter correct mobile number')
                        }
                        dispatch(deleteUserAccount(loggedInState.userAuthToken))
                        if (loggedInState.Error.isError) {
                            return setError(loggedInState.Error.e)
                        }
                        navigate(REACT_PATH_USER_SIGN_OUT,{replace:true})
                    }}
                >
                    Delete
                </Button>
            </div>
            {error ? <Error
                error={ error} />:<Error error={''}/>
            }
        </Card>
    )
}

export default DeleteAccountConfirmationDialogbox
