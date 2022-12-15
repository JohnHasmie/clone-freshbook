import { forwardRef } from "react";
import { StyledTabs } from "./Tabs.style";

const TabsCustom = forwardRef((props, ref) => {
    return (
        <StyledTabs {...props} ref={ref} />
    )
})

export default TabsCustom