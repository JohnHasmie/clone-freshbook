import { EditOutlined, ExportOutlined, FileDoneOutlined, HddOutlined, ImportOutlined, PrinterOutlined, RestOutlined, UsergroupAddOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'

export default function MoreAction() {
  return (
    <div >
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


export function MoreActionClients() {
  return (
    <div >
    <Menu>
      <Menu.Item>
        <div>
        <ImportOutlined />
          <span
            tw="cursor-pointer"
            onClick={() => console.log("export for excel")}
          >
            Import Clients
          </span>
        </div>
      </Menu.Item>

      <Menu.Item>
        <div>
        <ExportOutlined />
          <span tw="cursor-pointer" onClick={() => console.log("print")}>
            Export Clients
          </span>
        </div>
      </Menu.Item>
    </Menu>
  </div>
  )
}

export function MoreActionClientsDetail() {
  return (
    <div >
    <Menu>
      <Menu.Item>
        <div>
        <EditOutlined />
          <span
            tw="cursor-pointer"
            onClick={() => console.log("to edit page")}
          >
            Edit Client
          </span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div>
        <UsergroupAddOutlined />
          <span
            tw="cursor-pointer"
            onClick={() => console.log("generate")}
          >
            Generate Statement
          </span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div>
        <HddOutlined />
          <span
            tw="cursor-pointer"
            onClick={() => console.log("archive")}
          >
            Archive
          </span>
        </div>
      </Menu.Item>

      <Menu.Item>
        <div>
        <RestOutlined />
          <span tw="cursor-pointer" onClick={() => console.log("delete")}>
            Delete
          </span>
        </div>
      </Menu.Item>
    </Menu>
  </div>
  )
}



