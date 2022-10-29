import React from 'react'


import styles from './error.module.css'

const Error = (props) => {
  return (
      <>
          <h1
            className={`${styles['error']} ${props.errorStyles?props.errorStyles:''}`}
          >{props.error}</h1>
          {props.message && <h1
          className={`${styles['message']} ${props.messageStyles?props.messageStyles:''}`}
          >{props.message}</h1>}
      </>
  )
}

export default Error