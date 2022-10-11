import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { createUser, signUpActions } from '../../../store/features/signUpSlice'

import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

import styles from './signUpForm.module.css'
import { useNavigate } from 'react-router'
import { REACT_PATH_USER_SIGN_IN } from '../../../utils/macros/react-macros/reactUserPathMacros'
import Error from '../../UI/Error/Error'

const SignUpForm = () => {
    const signUpData = useSelector((state) => state.signUp)
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    return (
        <Card className={styles['sign-up__main-div']}>
            <div className={styles['sign-up__sub-div-1']}>
                <h1>Company logo</h1>
                <h2>Company Tagline</h2>
            </div>

            <Card className={styles['sign-up__sub-div-2']}>
                <h1 className={styles['sign-up__sign-up-heading']}>Sign Up</h1>
                <form autoComplete="off">
                    <div className={styles['sign-up__form__name-container']}>
                        <Input
                            key={Math.random}
                            inputClassName={
                                styles['sign-up__form__first-name-input']
                            }
                            {...signUpData.FIRST_NAME}
                            onChange={(payload) => {
                                dispatch(signUpActions.firstName(payload))
                            }}
                            autoFocus
                            required
                        />
                        <Input
                            inputClassName={
                                styles['sign-up__form__last-name-input']
                            }
                            {...signUpData.LAST_NAME}
                            onChange={(payload) => {
                                dispatch(signUpActions.lastName(payload))
                            }}
                        />
                    </div>
                    <Input
                        {...signUpData.EMAIL}
                        onChange={(payload) => {
                            dispatch(signUpActions.email(payload))
                        }}
                        autoFocus
                        required
                    />
                    <Input
                        {...signUpData.mobileNumber}
                        onChange={(payload) => {
                            dispatch(signUpActions.mobileNumber(payload))
                        }}
                        autoFocus
                        required
                    />
                    <Input
                        {...signUpData.dateOfBirth}
                        onChange={(payload) => {
                            dispatch(signUpActions.dateOfBirth(payload))
                        }}
                        autoFocus
                        required
                    />
                    <Input
                        {...signUpData.PASSWORD}
                        onChange={(payload) => {
                            dispatch(signUpActions.password(payload))
                        }}
                        autoFocus
                        required
                    />
                    <div className={styles['sign-up__form__buttons-div']}>
                        <Button
                            className={styles['sign-up__form__sign-in-button']}
                            type="button"
                            onClick={() => {
                                navigate(REACT_PATH_USER_SIGN_IN, {
                                    replace: true,
                                })
                            }}
                        >
                            Sign In
                        </Button>
                        <Button
                            className={styles['sign-up__form__submit-button']}
                            type="submit"
                            onClick={(event) => {
                                event.preventDefault()
                                // validateFormData()
                                dispatch(createUser(signUpData))
                                if (signUpData.Error.isError) {
                                    return setError(signUpData.Error.e)
                                }
                                // setError('dummy error')
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
                {error ? <Error error={error} />
                    : <Error error={''} />}
            </Card>
        </Card>
    )
}

export default SignUpForm
