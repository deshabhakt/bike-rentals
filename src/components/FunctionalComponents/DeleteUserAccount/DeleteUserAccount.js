import React, { useState } from 'react'

import DeleteAccountConfirmationDialogbox from './DeleteAccountConfirmationDialogBox'

import USER_LEAVING_MESSAGES from '../../../utils/macros/react-macros/reactUserLeavingMessages'

import Button from '../../UI/Button/Button'
import Modal from '../../UI/Modal/Modal'

import styles from './deleteUserAccount.module.css'

const DeleteUserAccount = () => {
    const [selectedMessage, setSelectedMessage] = useState(
        USER_LEAVING_MESSAGES[0]
    )
    const [otherFeedback, setOtherFeedback] = useState('')
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
    const [error, setError] = useState(false)

    const showConfirmationDialogHandler = () => {
        if (
            selectedMessage ===
            USER_LEAVING_MESSAGES[USER_LEAVING_MESSAGES.length - 1]
        ) {
            if (!otherFeedback || otherFeedback.length === 0) {
                return setError('Please enter valid reason')
            }
        }
        setError(false)
        setShowConfirmationDialog(true)
    }

    const selectionHandler = (event) => {
        setSelectedMessage(event.target.value)
    }
    const OptionsToDisplay = USER_LEAVING_MESSAGES.map((ele, index) => {
        if (index === 0) {
            return (
                <option key={Math.random()} selected disabled>
                    {ele}
                </option>
            )
        }
        return <option key={Math.random()}>{ele}</option>
    })

    return (
        <div className={styles['delete-user-account']}>
            <h1 className={styles['delete-user-account__title']}>Leaving?😕</h1>
            <div className={styles['delete-user-account__reason-div']}>
                <h3>Tell us why</h3>
                <select
                    onChange={(event) => selectionHandler(event)}
                    value={selectedMessage}
                >
                    {OptionsToDisplay}
                </select>
                {selectedMessage ===
                    USER_LEAVING_MESSAGES[USER_LEAVING_MESSAGES.length - 1] && (
                    <textarea
                        className={
                            styles[
                                'delete-user-acount__other-reason-input-field'
                            ]
                        }
                        value={otherFeedback}
                        onChange={(event) => {
                            setOtherFeedback(event.target.value)
                            if (otherFeedback.length > 0) {
                                setError(false)
                            }
                        }}
                    />
                )}
                {selectedMessage !== USER_LEAVING_MESSAGES[0] && (
                    <Button
                        className={styles['delete-user-account-delete-btn']}
                        onClick={showConfirmationDialogHandler}
                    >
                        {selectedMessage ===
                        USER_LEAVING_MESSAGES[USER_LEAVING_MESSAGES.length - 1]
                            ? 'Submit & Delete Account'
                            : 'Delete Account'}
                    </Button>
                )}
                {error && (
                    <p className={styles['delete-user-account__error']}>
                        {error}
                    </p>
                )}
            </div>
            {showConfirmationDialog && (
                <Modal
                    className={
                        styles['delete-user-account__confirmation-modal']
                    }
                    onClick={() => {
                        setShowConfirmationDialog(false)
                    }}
                >
                    <DeleteAccountConfirmationDialogbox
                        showConfirmationDialog={setShowConfirmationDialog}
                    />
                </Modal>
            )}
        </div>
    )
}

export default DeleteUserAccount
