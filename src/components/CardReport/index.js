import { forwardRef } from "react";
import { StyledCardReport } from './CardReport.style';

const CardReport = forwardRef((props, ref) => {
    return (
        <StyledCardReport {...props} ref={ref} />
    )
})

export default CardReport