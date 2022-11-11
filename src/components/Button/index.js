import { forwardRef } from "react";
import { StyledButton } from "./Button.style";

const Button = forwardRef((props, ref) => {
    return (
        <StyledButton {...props} ref={ref} />
    )
})

export default Button