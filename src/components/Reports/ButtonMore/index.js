import { forwardRef } from "react";
import { StyledButtonMore } from "./ButtonMore.style";

const ButtonMore = forwardRef((props, ref) => {
    return (
        <StyledButtonMore {...props} ref={ref} />
    )
})

export default ButtonMore