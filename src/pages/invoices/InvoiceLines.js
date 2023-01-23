import { PlusOutlined, RestOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useState } from "react"
import "twin.macro"
import EditableText from "../../components/EditableText"
import { formatter } from "../../components/Utils"
import FormMultiplePayment from "./FormMultiplePayment"

const InvoiceLines = ({linesProps}) => {
    const [lines, setLines] = linesProps
    const addLine = () => {
        setLines([
            ...lines,
            {
                name: 'Item title',
                description: 'Item description',
                rate:0,
                qty: 1,
                total: "0",
            }
        ])
    }
    const handleRemove=(i)=>{
const newLines=[...lines]
newLines.splice(i,1)
setLines(newLines)
    }

    return (
        <>
            <table>
                <tbody>
                    <tr tw="border-t-4 border-gray-600 text-sm text-gray-500 text-right font-bold">
                        <th tw="text-left  py-2">Description</th>
                        <th tw="">Rate</th>
                        <th>Qty</th>
                        <th>Line Total</th>
                    </tr>
                    {
                        lines.map((line,i) => {
                            return (
                                <>
                                    <tr tw="border-b text-sm  border-gray-300 text-right">
                                        <th tw="grid text-left py-2">
                                            <span>
                                                <EditableText linesProps={[lines, setLines]} type={"name"} i={i} >{line.name}</EditableText>
                                            </span>
                                            <span tw="text-xs">
                                                <EditableText linesProps={[lines, setLines]} type={"description"} i={i} >{line.description}</EditableText>
                                            </span>
                                        </th>
                                        <td>
                                        <EditableText linesProps={[lines, setLines]} type={"rate"} i={i} >{line.rate}</EditableText>

                                        </td>
                                        <td>
                                            <EditableText linesProps={[lines, setLines]} type={"qty"} i={i} >{line.qty}</EditableText>
                                        </td>
                                        <td>
                                            {/* <EditableText linesProps={[lines, setLines]} type={"total"} i={i} >{line.total}</EditableText> */}
                                            {line.total}
                                        </td>
                                        <td>
                                            <RestOutlined tw="hover:opacity-50 cursor-pointer" onClick={()=>handleRemove(i)}/>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
            <Button onClick={addLine} tw="mt-4" block>
                <PlusOutlined />
                <span>Add a Line</span>
            </Button>
            <FormMultiplePayment linesProps={[lines, setLines]} />
        </>
    )
}

export default InvoiceLines