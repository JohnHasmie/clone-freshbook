import { forwardRef } from "react";
import { StyledCardInvoice } from "./CardInvoice.style";

const CardInvoice = forwardRef((props, ref) => {
    return (
        <StyledCardInvoice {...props} ref={ref} />
    )
})

export default CardInvoice