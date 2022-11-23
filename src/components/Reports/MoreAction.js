import { PrinterOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'

export default function MoreAction() {
  return (
    <div tw="border border-[#7f8c9f]">
    <Menu>
      <Menu.Item>
        <div>
          <VerticalAlignBottomOutlined />
          <span
            tw="cursor-pointer"
            onClick={() => console.log("export for excel")}
          >
            Export for Excel
          </span>
        </div>
      </Menu.Item>

      <Menu.Item>
        <div>
          <PrinterOutlined />
          <span tw="cursor-pointer" onClick={() => console.log("print")}>
            Print
          </span>
        </div>
      </Menu.Item>
    </Menu>
  </div>
  )
}


