import { useState } from "react"
import { StyledPopover } from "./PopoverClickable.style"

const PopoverClickable = ({ renderChildren, renderContent, ...popoverProps }) => {
    const [visible, setVisible] = useState(false)
    const show = () => setVisible(true)
    const hide = () => setVisible(false)
    const state = { visible, show, hide }

    return (
        <StyledPopover 
            visible={visible} 
            trigger="click"
            content={renderContent(state)}
            {...popoverProps}
        >
            {renderChildren(state)}
        </StyledPopover>
    )
}

export default PopoverClickable