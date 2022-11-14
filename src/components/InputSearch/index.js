import { forwardRef } from "react";
import { StyledInputSearch } from './InputSearch.style';

const InputSearch = forwardRef((props, ref) => {
    return (
        <StyledInputSearch {...props} ref={ref} />
    )
})

export default InputSearch