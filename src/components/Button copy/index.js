import { forwardRef } from "react";
import { StyledTable } from "./Table.style";

const TableCustom = forwardRef((props, ref) => {
    return (
        <StyledTable {...props} ref={ref} />
    )
})

export default TableCustom