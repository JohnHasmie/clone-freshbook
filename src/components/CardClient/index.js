import { forwardRef } from "react";
import { StyledCard } from './Card.style';

const CardClient = forwardRef((props, ref) => {
    return (
        <StyledCard {...props} ref={ref} />
    )
})

export default CardClient