import React, {useState} from 'react'
import { useSelector } from 'react-redux'

import changePassword from '../../../store/api-calls/user/USER_changePassword'

import Button from '../../UI/Button/Button'
import Error from '../../UI/Error/Error'
import Success from '../../UI/Success/Success'

import styles from './changePassword.module.css'
const ChangePassword = () => {
    const loggedInStateData = useSelector((state) => state.loggedInState)
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword1: '',
        newPassword2:'',
    })

    const [feedback,setFeedback] = useState({isError:undefined,message:''})

    const onChangeHandler = (event) => {
        setPasswords(prev => {
            return {
                ...prev,
                [event.target.name]:event.target.value
            }
        })
    }

    const onSubmitHandler = async() => {
        const { oldPassword, newPassword1, newPassword2 } = passwords
        if (!oldPassword || oldPassword.length === 0) {
            return setFeedback({isError:true,message:'Old Password cannot be empty'})
        }
        if (!newPassword1 || newPassword1.length === 0) {
            return setFeedback({isError:true,message:'Please enter new password'})
        }
        if (!newPassword2 || newPassword2.length === 0) {
            return setFeedback({isError:true,message:'Please re-enter new password'})
        }

        if (newPassword1 !== newPassword2) {
            return setFeedback({isError:true,message:'New passwords did not match'})
        }

        changePassword(passwords,loggedInStateData.userAuthToken)
            .then(({ error, success }) => {
                if (error) {
                    setFeedback({isError: true, message: error.e })
                    return 
                }
                if (success) {
                    setFeedback({isError: false, message: success.message })
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }
  return (
      <div className={styles['change-password']}>
          <Password
              label={'Old Password'}
              name={'oldPassword'}
              value={passwords.oldPassword}
              placeholder={'Enter old password'}
              onChangeHandler={onChangeHandler}
          />
          <Password
              label={'New Password'}
              name={'newPassword1'}
              value={passwords.newPassword1}
              placeholder={'Enter new password'}
              onChangeHandler={onChangeHandler}
          />
          <Password
              label={'Re-enter new Password'}
              name={'newPassword2'}
              value={passwords.newPassword2}
              placeholder={'Re-enter new password'}
              onChangeHandler={onChangeHandler}
          />

          <Button
              className={styles['change-password__submit-btn']}
              onClick={onSubmitHandler}
          >
              Submit
          </Button>

          {feedback.isError ? (
              <Error error={feedback.message} />
          ) : (
              <Success success={feedback.message} />
          )}
      </div>
  )
}

const Password = ({label,name,value,onChangeHandler,placeholder}) => {
    return (
        <>
            <label className={styles['change-password__label']}>
                {label}
            </label>
            <input
                className={styles['change-password__input']}
                name={name}
                value={value}
                placeholder={placeholder}
                type={'password'}
                onChange={(event) => {
                   onChangeHandler(event)
                }}
            />
        </>
    )
}

export default ChangePassword