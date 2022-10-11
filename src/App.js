import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom'

import MenuBar from './components/FunctionalComponents/MenuBar/MenuBar'

import Home from './pages/Home/Home'
import Bikes from './pages/Bikes/Bikes'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import SignIn from './pages/SignOn/SignIn/SignIn'
import SignUp from './pages/SignOn/SignUp/SignUp'
import BookBike from './pages/BookBike/BookBike'
import ManagePage from './pages/ManageUserPage/ManageUserPage'

import {
    KEY_USER_AUTH_TOKEN,
    KEY_USER_DATA,
    KEY_USER_LOGIN_STATE,
} from './utils/macros/generalMacros'

import { loggedInStateActions } from './store/features/loggedInStateSlice'

import { REACT_PATH_USER_MANAGE, REACT_PATH_USER_SIGN_IN, REACT_PATH_USER_SIGN_OUT, REACT_PATH_USER_SIGN_UP } from './utils/macros/react-macros/reactUserPathMacros'
import { REACT_PATH_BOOK_BIKE, REACT_PATH_BIKES } from './utils/macros/react-macros/reactBikeBookingMacros'

import styles from './app.module.css'

const App = () => {

    const loggedInState = useSelector((state)=>state.loggedInState)
    const dispatch = useDispatch()

    const getDataFromLocalStorage = () => {
        try {
            const authToken = localStorage.getItem(KEY_USER_AUTH_TOKEN)
            const userData = JSON.parse(localStorage.getItem(KEY_USER_DATA))
            const isLoggedIn = localStorage.getItem(KEY_USER_LOGIN_STATE) === 'true'?true:false
            dispatch(loggedInStateActions.signOnHandler({
                isLoggedIn,
                userAuthToken:authToken,
                userData
            }))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
       getDataFromLocalStorage() 
    },[])


    return (
        <BrowserRouter>
            <div className={styles['app']}>
                <MenuBar />
                {/* <div className={styles['app__main-container']}> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/bikes" element={<Bikes />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                        path={REACT_PATH_USER_SIGN_IN}
                        element={
                            loggedInState.isLoggedIn ? (
                                <Navigate to={REACT_PATH_BIKES} />
                            ) : (
                                <SignIn />
                            )
                        }
                    />
                    <Route
                        path={REACT_PATH_USER_SIGN_UP}
                        element={
                            loggedInState.isLoggedIn ? (
                                <Navigate to={REACT_PATH_BIKES} />
                            ) : (
                                <SignUp />
                            )
                        }
                    />
                    <Route
                        path={REACT_PATH_USER_MANAGE}
                        element={<ManagePage />}
                    />
                    {loggedInState.isLoggedIn && (
                        <Route
                            path={REACT_PATH_USER_SIGN_OUT}
                            element={<SignOut />}
                        />
                    )}

                    {/* Bike path */}
                    {/* <Route
                        path={REACT_PATH_BOOK_BIKE}
                        element={
                            loggedInState.isLoggedIn ? (
                                <BookBike />
                            ) : (
                                <Navigate to={REACT_PATH_USER_SIGN_IN} />
                            )
                        }
                    /> */}

                    <Route
                        path={REACT_PATH_BOOK_BIKE}
                        element={<BookBike />}
                    />

                </Routes>
                {/* </div> */}
            </div>
        </BrowserRouter>
    )
}

const SignOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(loggedInStateActions.logOutHandler())
        navigate(REACT_PATH_USER_SIGN_IN,{replace:true})    
    },[])
}


export default App
