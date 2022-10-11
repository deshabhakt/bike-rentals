import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import SignInForm from '../../../components/FunctionalComponents/SignInForm/SignInForm'
import PageHolder from '../../../components/UI/PageHolder/PageHolder'

import styles from './signIn.module.css'

function SignIn() {
  const loggedInStateData = useSelector((state) => state.loggedInState)
  const navigate = useNavigate()
  useEffect(() => {
    if (loggedInStateData.isLoggedIn) {
        navigate('/bikes', { replace: true })
    }
  },[])
  return (
    <PageHolder className={styles['sign-in']}>
      <SignInForm/>
    </PageHolder>
  )
}

export default SignIn