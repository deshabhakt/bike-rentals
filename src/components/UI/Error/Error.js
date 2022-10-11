import React from 'react'


import styles from './error.module.css'

const Error = (props) => {
  return (
      <>
          <h1
            className={`${styles['error']} ${props.errorStyle?props.errorStyle:''}`}
          >{props.error}</h1>
          {props.message && <h1
          className={`${styles['message']} ${props.messageStyle?props.messageStyle:''}`}
          >{props.message}</h1>}
      </>
  )
}

export default Error