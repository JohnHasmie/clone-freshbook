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
            onClick={() => console.log("export for PDF")}
          >
            Export for PDF
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


export function MoreActionClients({pdfRefetch}) {
  return (
    <div >
    <Menu>
      <Menu.Item key="import">
        <div>
        <ImportOutlined />
          <span
            tw="cursor-pointer"
            onClick={() => console.log("export for PDF")}
          >
            Import Clients
          </span>
        </div>
      </Menu.Item>

      <Menu.Item key="export">
        <div>
        <ExportOutlined />
          <span tw="cursor-pointer" onClick={() => pdfRefetch()}>
            Export Clients
          </span>
        </div>
      </Menu.Item>
    </Menu>
  </div>
  )
}

export function MoreActionClientsDetail({globalDetailClient,history}) {
  return (
    <div >
    <Menu>
      <Menu.Item>
        <div>
        <EditOutlined />
          <span
            tw="cursor-pointer"
            onClick={() => history.push(`/clients/${globalDetailClient?.id}/edit`)}
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



