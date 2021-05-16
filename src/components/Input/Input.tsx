import React from 'react'
import { TextField } from '@material-ui/core';
import classes from "./Input.module.scss";

export type InputPropsType = {
    onKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void
    value: string
    error: string | undefined
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    placeholder: string
}

const Input: React.FC<InputPropsType> = ({ onKeyPress, value, error=undefined , onChange, placeholder }) => {

    return ( <TextField
                onKeyPress={onKeyPress}
                value={value}
                onChange={onChange}
                className={classes.inputSize}
                placeholder={placeholder}
                {...(error && {error:true, helperText:error})}
                />
    )
}

export default Input;
