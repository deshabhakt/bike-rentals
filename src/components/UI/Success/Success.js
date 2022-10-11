import React from 'react'


import styles from './success.module.css'

const Success = (props) => {
  
  return (
      <>
          <h1
            className={`${styles['success']} ${props.errorStyle?props.errorStyle:''}`}
          >{props.success}</h1>
          {props.message && <h1
          className={`${styles['message']} ${props.messageStyle?props.messageStyle:''}`}
          >{props.message}</h1>}
      </>
  )
}

export default Success