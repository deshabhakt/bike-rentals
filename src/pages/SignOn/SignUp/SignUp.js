import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import {useNavigate} from 'react-router-dom'

import SignUpForm from '../../../components/FunctionalComponents/SignUpForm/SignUpForm'
import PageHolder from '../../../components/UI/PageHolder/PageHolder'

import styles from './signUp.module.css'
const SignUp = () => {
  const loggedInStateData = useSelector((state) => state.loggedInState)

  const navigate = useNavigate()

  useEffect(() => {
    if (loggedInStateData.isLoggedIn) {
        navigate('/bikes', { replace: true })
    }
  },[])

  return <PageHolder
  className={styles['sign-up']}>
    <SignUpForm/>
  </PageHolder>
}

export default SignUp