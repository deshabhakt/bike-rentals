import React from 'react'
import ReactDOM from 'react-dom'
import styles from './modal.module.css'

const Modal = (props) => {

    return ReactDOM.createPortal(
        <div
            className={`${styles['modal']} ${
                props.className ? props.className : ''
            }`}
        >
            <div
                className={`${styles['backdrop']} ${props.backdropClassName ? props.backdropClassName : ''}`}
                onClick={()=>props.onClick()}
            ></div>
            <div className={`${styles['children']}`}>
                {props.children}
            </div>
        </div>,
        document.getElementById('modal')
    )
}

export default Modal
