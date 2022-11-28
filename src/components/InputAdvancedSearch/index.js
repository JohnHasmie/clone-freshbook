import { forwardRef } from "react";
import { StyledInputAdvanceSearch } from "./InputAdvancedSearch.style";

const InputAdvanceSearch = forwardRef((props, ref) => {
    return (
        <StyledInputAdvanceSearch {...props} ref={ref} />
    )
})

export default InputAdvanceSearch