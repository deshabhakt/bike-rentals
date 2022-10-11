import React from 'react'

import styles from './pageHolder.module.css'

const PageHolder = (props) => {
  return (
      <div className={`${styles['page-holder__main-container']} ${props.className?props.className:''}`}>
          {props.children}
    </div>
  )
}

export default PageHolder