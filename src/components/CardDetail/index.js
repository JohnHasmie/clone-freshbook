import { forwardRef } from "react";
import { StyledCardDetail } from "./CardDetail.style";

const CardDetail = forwardRef((props, ref) => {
    return (
        <StyledCardDetail {...props} ref={ref} />
    )
})

export default CardDetail