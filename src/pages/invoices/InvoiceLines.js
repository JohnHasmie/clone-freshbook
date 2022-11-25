import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useState } from "react"
import tw from "twin.macro"
import EditableText from "../../components/EditableText"
import { formatter } from "../../components/Utils"

const InvoiceLines = () => {
    const [lines, setLines] = useState([])
    const addLine = () => {
        setLines([
            ...lines,
            {
                item: 'Item title',
                description: 'Item description',
                qty: 1,
                total: 0,
            }
        ])
    }

    return (
        <>
            <table>
                <tbody>
                    <tr tw="border-t-4 border-gray-600 text-sm text-gray-500 text-right font-bold">
                        <th tw="text-left  py-2">Description</th>
                        <th tw="invisible">hide</th>
                        <th>Qty</th>
                        <th>Line Total</th>
                    </tr>
                    {
                        lines.map(line => {
                            return (
                                <>
                                    <tr tw="border-b text-sm  border-gray-300 text-right">
                                        <th tw="grid text-left py-2">
                                            <span>
                                                <EditableText>{line.item}</EditableText>
                                            </span>
                                            <span tw="text-xs">
                                                <EditableText>{line.description}</EditableText>
                                            </span>
                                        </th>
                                        <td></td>
                                        <td>
                                            <EditableText>{line.qty}</EditableText>
                                        </td>
                                        <td>
                                            <EditableText>{line.total}</EditableText>
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
        </>
    )
}

export default InvoiceLines