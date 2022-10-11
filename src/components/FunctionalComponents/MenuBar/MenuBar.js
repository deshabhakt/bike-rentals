import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { FaUser } from 'react-icons/fa'

import Button from '../../UI/Button/Button'

import styles from './menuBar.module.css'
import {
    REACT_PATH_USER_MANAGE,
    REACT_PATH_USER_SIGN_IN,
    REACT_PATH_USER_SIGN_OUT,
    REACT_PATH_USER_SIGN_UP
} from '../../../utils/macros/react-macros/reactUserPathMacros'
import Modal from '../../UI/Modal/Modal'
const MenuBar = () => {
    const loggedInState = useSelector((state) => state.loggedInState)

    const [isUserIconDropDownShown, setIsUserIconDrowpDownShown] =
        useState(false)

    const navigate = useNavigate()

    const userIconClickHandler = (path) => {
        if (path === '') {
            setIsUserIconDrowpDownShown(false)
        } else {
            setIsUserIconDrowpDownShown((prev) => !prev)
        }
        switch (path) {
            case REACT_PATH_USER_SIGN_IN:
                return navigate(REACT_PATH_USER_SIGN_IN, { replace: true })
            case REACT_PATH_USER_SIGN_UP:
                return navigate(REACT_PATH_USER_SIGN_UP, { replace: true })
            case REACT_PATH_USER_SIGN_OUT:
                return navigate(REACT_PATH_USER_SIGN_OUT, { replace: true })
            case REACT_PATH_USER_MANAGE:
                return navigate(REACT_PATH_USER_MANAGE, { replace: true })
            default:
                return
        }
    }
    return (
        <nav className={styles['menu-bar']}>
            <div className={styles['menu-bar__nav-items']}>
                <Link to="/" className={styles['menu-bar__nav-items__link']}>
                    Home
                </Link>
                <Link
                    to="/bikes"
                    className={styles['menu-bar__nav-items__link']}
                >
                    Bikes
                </Link>
                <Link
                    to="/about"
                    className={styles['menu-bar__nav-items__link']}
                >
                    About
                </Link>
                <Link
                    to="/contact"
                    className={styles['menu-bar__nav-items__link']}
                >
                    Contact
                </Link>
            </div>
            <div className={styles['menu-bar__logon-div']}>
                {loggedInState.userData && loggedInState.userData.avatar ? (
                    <a onClick={userIconClickHandler}>
                        <img
                            src={loggedInState.userData.avatar}
                            alt="user-icon"
                        />
                    </a>
                ) : (
                    <FaUser
                        className={styles['menu-bar__logon-div__user-icon']}
                        onClick={() => userIconClickHandler('dummy')}
                    />
                )}
                {isUserIconDropDownShown && (
                    <UserIconDropDown
                        userIconClickHandler={userIconClickHandler}
                    />
                )}
            </div>
        </nav>
    )
}

const UserIconDropDown = ({ userIconClickHandler }) => {
    const loggedInState = useSelector((state) => state.loggedInState)
    return (
        <Modal
            className={styles['user-icon-drop-down-modal']}
            onClick={() => userIconClickHandler('')}
        >
            <div className={styles['user-icon-drop-down-container']}>
                {loggedInState.isLoggedIn ? (
                    <>
                        <DropDownUserCard
                            userIconClickHandler={userIconClickHandler}
                        />
                    </>
                ) : (
                    <>
                        <DropDownSignOnCard
                            userIconClickHandler={userIconClickHandler}
                        />
                    </>
                )}
            </div>
        </Modal>
    )
}

const DropDownSignOnCard = ({ userIconClickHandler }) => {
    return (
        <div className={styles['drop-down-sign-on-card']}>
            <Button
                className={styles['drop-down-sign-on-card__button__sign-in']}
                onClick={() => userIconClickHandler(REACT_PATH_USER_SIGN_IN)}
            >
                Sign In
            </Button>
            <Button
                className={styles['drop-down-sign-on-card__button__sign-up']}
                onClick={() => userIconClickHandler(REACT_PATH_USER_SIGN_UP)}
            >
                Sign Up
            </Button>
        </div>
    )
}

const DropDownUserCard = ({ userIconClickHandler }) => {
    const loggedInState = useSelector((state) => state.loggedInState)

    const { first_name, last_name, email, avatar } = loggedInState.userData
    return (
        <div className={styles['dorp-down-user-card']}>
            {avatar ? (
                <img
                    src={avatar}
                    alt={'user-icon'}
                    className={styles['drop-down-user-card__user-icon']}
                />
            ) : (
                <FaUser className={styles['drop-down-user-card__user-icon']} />
            )}
            <span className={styles['drop-down-user-card__user-name']}>
                {`${first_name ? first_name : 'user'}  ${
                    last_name ? last_name : 'name'
                }`}
            </span>
            <span className={styles['drop-down-user-card__user-email']}>
                {email ? email : 'email@id.com'}
            </span>
            <Button
                className={styles['drop-down-user-card__manage-account-btn']}
                onClick={()=>userIconClickHandler(REACT_PATH_USER_MANAGE)}
            >
                Manage your account
            </Button>
            <Button
                className={
                    styles['user-icon-drop-down-container__button__sign-out']
                }
                onClick={() => userIconClickHandler(REACT_PATH_USER_SIGN_OUT)}
            >
                Sign Out
            </Button>
        </div>
    )
}

export default MenuBar
