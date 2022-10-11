import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import {signInUser, signInActions } from '../../../store/features/signInSlice'

import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

import styles from './signInForm.module.css'
import { REACT_PATH_USER_SIGN_UP } from '../../../utils/macros/react-macros/reactUserPathMacros'
import Error from '../../UI/Error/Error'

const SignInForm = () => {
    const dispatch = useDispatch()
    const signInData = useSelector((state) => state.signIn)

    const [error,setError] = useState(false)
    const navigate = useNavigate()

    return (
        <Card className={`${styles['sign-in__main-div']}`}>
            <div className={styles['sign-in__sub-div-1']}>
                <h1>Company logo</h1>
                <h2>Company Tagline</h2>
            </div>

            <Card className={styles['sign-in__sub-div-2']}>
                <h1 className={styles['sign-in__sign-in-heading']}>Sign In</h1>
                <form autoComplete="off">
                    <Input
                        {...signInData.LOGIN_ID}
                        onChange={(payload) => {
                            dispatch(signInActions.loginId(payload))
                        }}
                        autoFocus
                        required
                    />
                    <Input
                        {...signInData.PASSWORD}
                        onChange={(payload) => {
                            dispatch(signInActions.password(payload))
                        }}
                        autoFocus
                        required
                    />
                    <div className={styles['sign-in__form__buttons-div']}>
                        <Button
                            className={styles['sign-in__form__sign-up-button']}
                            type="button"
                            onClick={() => {
                                navigate(REACT_PATH_USER_SIGN_UP, {
                                    replace: true,
                                })
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            className={styles['sign-in__form__sign-in-button']}
                            type="submit"
                            onClick={(event) => {
                                event.preventDefault()
                                dispatch(signInUser(signInData))
                                if (signInData.Error.isError) {
                                    setError(signInData.Error.e)
                                    return
                                }
                                // setError('dummy error')
                            }}
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
                {error ? 
                    <Error error={error} />:<Error error={''}/>
                }
            </Card>
        </Card>
    )
}

export default SignInForm
