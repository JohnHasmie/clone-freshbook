import { forwardRef } from "react";
import { StyledCardPopup } from "./CardPopup.style";

const CardPopup = forwardRef((props, ref) => {
    return (
        <StyledCardPopup {...props} ref={ref} />
    )
})

export default CardPopup