import React from "react";
import { IInputProps } from "../../types/userTypes";

const Input = ({children, ...props}: IInputProps) => {
    return (
        <input {...props}>
            {children}
        </input>
    )
}

export default Input;