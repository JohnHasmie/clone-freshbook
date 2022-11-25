import Text from "antd/lib/typography/Text"
import { useState } from "react"

const EditableText = ({ children }) => {
    const [value, setValue] = useState(children)
    return (
        <Text 
            onClick={evt => evt.stopPropagation()}
            editable={{
                onChange: str => {
                    setValue(str)
                }
            }}
        >
            {value}
        </Text>
    )
}

export default EditableText