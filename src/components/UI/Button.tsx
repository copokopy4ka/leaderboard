import React from "react";
import { IButtonProps } from "../../types/userTypes";

const Button = ({children, ...props}: IButtonProps) => {
    return (
        <button {...props}>
            {children}
        </button>
    )
}

export default Button;