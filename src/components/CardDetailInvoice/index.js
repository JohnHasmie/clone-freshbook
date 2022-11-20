import { forwardRef } from "react";
import { StyledCardDetailInvoice } from "./CardInvoice.style";

const CardDetailInvoice = forwardRef((props, ref) => {
    return (
        <StyledCardDetailInvoice {...props} ref={ref} />
    )
})

export default CardDetailInvoice