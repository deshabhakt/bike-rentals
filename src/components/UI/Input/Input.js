import React, { useEffect, useState } from 'react'

import styles from './input.module.css'

const Input = (props) => {

    const placeholder = {
        fontSize: '1rem',
        position: 'absolute',
        marginTop: '0.6rem',
        marginLeft: '0.5rem',
        pointerEvents: 'none',
        transition: '0.2s ease all',
        color: 'grey'
    }

    const label = {
        fontSize: '0.6rem',
        position: 'absolute',
        marginTop: '-0.25rem',
        marginLeft: '0.5rem',
        pointerEvents: 'none',
        transition: '0.2s ease all',
        color: 'black',
        backgroundColor: 'white',
        padding: ' 0 0.2rem'
    }
    const [isFocussed, setIsFocussed] = useState(false)
    const [typeForDOB, setTypeForDOB] = useState("text")

    const onChangeHandler = (event) => {
        props.onChange(event.target.value)
    }

    const onFocusHandler = () => {
        if (props.type === 'date' && typeForDOB === 'text') {
            setTypeForDOB('date')
        }
        setIsFocussed(true)
    }

    const onFocusOutHandler = () => {
        if ((props.value && props.value.length !== 0) || typeForDOB==='date') {
            return
        }
        
        setIsFocussed(false)
    }

    useEffect(() => {
        if(props.type==='date')
            setTypeForDOB('text')
    },[])


    return (
        <div className={`${styles['input-div']} ${props.className ? props.className : ''}`}>
            <label style={isFocussed ? label : placeholder}>{props.label ? props.label : "Label"}</label>
            <input
                className={`${styles['input']} ${props.inputClassName?props.inputClassName:''}`}
                type={props.type === 'date' ? typeForDOB : props.type}
                name={props.name}
                value={props.value}
                onClick={props.onClick && props.onClick}
                onChange={onChangeHandler}
                onFocus={props.onFocus ? () => {
                    props.onFocus()
                    onFocusHandler()
                } : onFocusHandler
                }
                onBlur={() => { onFocusOutHandler() }}
                autoFocus={props.autoFocus ? true : false}
                required={props.required ? true:false}
            />
            </div>
    )
}

export default Input