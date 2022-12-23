import { forwardRef } from "react";
import { StyledTable } from "./Table.style";

const TableDeleted = forwardRef((props, ref) => {
    return (
        <StyledTable {...props} ref={ref} />
    )
})

export default TableDeleted