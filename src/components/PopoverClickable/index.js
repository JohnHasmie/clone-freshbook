import { useState } from "react"
import { StyledPopover } from "./PopoverClickable.style"

const PopoverClickable = ({ renderChildren, renderContent,setIsClient, ...popoverProps }) => {
    const [visible, setVisible] = useState(false)
    const show = (e) => {
        console.log(e,"event");
        setVisible(true)}
    const hide = (e) => {setVisible(false)}
    const state = { visible, show, hide ,setIsClient}

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