import React, { useState } from 'react'

import UserProfile from '../../components/FunctionalComponents/UserProfile/UserProfile'
import BookingHistory from '../../components/FunctionalComponents/BookingHistory/BookingHistory'
import ChangePassword from '../../components/FunctionalComponents/ChangePassword/ChangePassword'
import DeleteUserAccount from '../../components/FunctionalComponents/DeleteUserAccount/DeleteUserAccount'

import PageHolder from '../../components/UI/PageHolder/PageHolder'

import {
    USER_MANAGE_PAGE_TAB_BOOKING_HISTORY,
    USER_MANAGE_PAGE_TAB_CHANGE_PASSWORD,
    USER_MANAGE_PAGE_TAB_DELETE_ACCOUNT,
    USER_MANAGE_PAGE_TAB_MY_PROFILE,
} from '../../utils/macros/entity-macros/userMacros'

import styles from './manageUserPage.module.css'
const ManageUserPage = () => {
    const [content, setContent] = useState({
        name: USER_MANAGE_PAGE_TAB_MY_PROFILE,
        component: <UserProfile />,
    })

    const tabClickHandler = (name) => {
        switch (name) {
            case USER_MANAGE_PAGE_TAB_MY_PROFILE:
                return setContent({
                    name: USER_MANAGE_PAGE_TAB_MY_PROFILE,
                    component: <UserProfile />,
                })
            case USER_MANAGE_PAGE_TAB_BOOKING_HISTORY:
                return setContent({
                    name: USER_MANAGE_PAGE_TAB_BOOKING_HISTORY,
                    component: <BookingHistory />,
                })
            case USER_MANAGE_PAGE_TAB_CHANGE_PASSWORD:
                return setContent({
                    name: USER_MANAGE_PAGE_TAB_CHANGE_PASSWORD,
                    component: <ChangePassword />,
                })
            case USER_MANAGE_PAGE_TAB_DELETE_ACCOUNT:
                return setContent({
                    name: USER_MANAGE_PAGE_TAB_DELETE_ACCOUNT,
                    component: <DeleteUserAccount />,
                })
            default:
                return
        }
    }

    return (
        <PageHolder className={styles['manage-user-page']}>
            <div className={styles['manage-user__sidebar-list']}>
                <span
                    className={`${
                        content.name === USER_MANAGE_PAGE_TAB_MY_PROFILE
                            ? styles['manage-user__sidebar-list__selected-tab']
                            : styles['manage-user__sidebar-list__tab']
                    } ${
                        styles[
                            'manage-user__sidebar-list__selected-tab__round-on-media-query'
                        ]
                    }`}
                    onClick={() =>
                        tabClickHandler(USER_MANAGE_PAGE_TAB_MY_PROFILE)
                    }
                >
                    My Profile
                </span>
                <span
                    className={
                        content.name === USER_MANAGE_PAGE_TAB_BOOKING_HISTORY
                            ? styles['manage-user__sidebar-list__selected-tab']
                            : styles['manage-user__sidebar-list__tab']
                    }
                    onClick={() =>
                        tabClickHandler(USER_MANAGE_PAGE_TAB_BOOKING_HISTORY)
                    }
                >
                    Booking History
                </span>
                <span
                    className={
                        content.name === USER_MANAGE_PAGE_TAB_CHANGE_PASSWORD
                            ? styles['manage-user__sidebar-list__selected-tab']
                            : styles['manage-user__sidebar-list__tab']
                    }
                    onClick={() =>
                        tabClickHandler(USER_MANAGE_PAGE_TAB_CHANGE_PASSWORD)
                    }
                >
                    Change Password
                </span>
                <span
                    className={
                        content.name === USER_MANAGE_PAGE_TAB_DELETE_ACCOUNT
                            ? styles['manage-user__sidebar-list__selected-tab']
                            : styles['manage-user__sidebar-list__tab']
                    }
                    onClick={() =>
                        tabClickHandler(USER_MANAGE_PAGE_TAB_DELETE_ACCOUNT)
                    }
                >
                    Delete Account
                </span>
            </div>
            <div className={styles['manage-user__main-container']}>
                {content.component}
            </div>
        </PageHolder>
    )
}

export default ManageUserPage
