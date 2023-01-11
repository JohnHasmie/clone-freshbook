import { useState } from "react"
import { StyledPopover } from "./PopoverClickable.style"

<<<<<<< HEAD
const PopoverClickable = ({ renderChildren, renderContent, defaultValue, ...popoverProps }) => {
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState(defaultValue)
    const show = () => setVisible(true)
    const hide = () => setVisible(false)
    const state = { visible, show, hide, value, setValue }
=======
const PopoverClickable = ({ renderChildren, renderContent,setIsClient, ...popoverProps }) => {
    const [visible, setVisible] = useState(false)
    const show = (e) => {
        console.log(e,"event");
        setVisible(true)}
    const hide = (e) => {setVisible(false)}
    const state = { visible, show, hide ,setIsClient}
>>>>>>> origin/usamah

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