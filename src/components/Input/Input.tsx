import React from 'react'
import { TextField } from '@material-ui/core';
import classes from "./Input.module.scss";

export type InputPropsType = {
    onKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void
    value: string
    error: string | undefined
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

const Input: React.FC<InputPropsType> = ({ onKeyPress, value, error=undefined , onChange }) => {

    return ( <TextField
                onKeyPress={onKeyPress}
                value={value}
                onChange={onChange}
                className={classes.inputSize}
                {...(error && {error:true, helperText:error})}
                />
    )
}

export default Input;
