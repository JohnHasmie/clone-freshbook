import { forwardRef } from "react";
import { StyledCardReporting } from "./CardReporting.style";

const CardReporting = forwardRef((props, ref) => {
    return (
        <StyledCardReporting {...props} ref={ref} />
    )
})

export default CardReporting