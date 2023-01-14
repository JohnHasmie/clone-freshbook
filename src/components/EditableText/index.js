import Text from "antd/lib/typography/Text"
import { useEffect, useState } from "react"

const EditableText = ({ children,linesProps,type,i }) => {
    const [lines, setLines]=linesProps
    const [value, setValue] = useState(children)
    // useEffect(() => {
    //     const newLines=[...lines]
    //     newLines[i].total=newLines[i].rate*newLines[i].qty
    //     String(newLines[i].total)
    //     setLines(newLines)

    // }, [value])
    
    return (
        <Text 
            onClick={evt => evt.stopPropagation()}
            editable={{
                onChange: str => {
                    setValue(str)
                    const newLines=[...lines]
                    newLines[i][type]=str
                    newLines[i].id=lines.length
                    if(type === "rate" || "qty"){
        newLines[i].total= String(parseInt(newLines[i].rate)*parseInt(newLines[i].qty))
        // String(newLines[i].total)
        setLines(newLines)
}
                }
            }}
        >
            {lines[i][type]}
        </Text>
    )
}

export default EditableText