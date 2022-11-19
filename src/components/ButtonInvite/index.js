import { forwardRef } from "react";
import { StyledButtonInvite } from "./ButtonInvite.style";

const ButtonInvite = forwardRef((props, ref) => {
    return (
        <StyledButtonInvite {...props} ref={ref} />
    )
})

export default ButtonInvite