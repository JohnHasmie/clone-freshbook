import { EditOutlined, ExportOutlined, FileDoneOutlined, HddOutlined, ImportOutlined, PrinterOutlined, RestOutlined, UsergroupAddOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

export default function MoreAction() {
  const history= useHistory()
  const handlePrint=()=>{
    // let a = window.open('', 'Cek')
    window.print()

  }
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
          <span tw="cursor-pointer" onClick={handlePrint} >
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

export function MoreActionClientsDetail({globalDetailClient,history,handleModal}) {
  const [isGenerate, setIsGenerate] = useState(0)

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
      <Menu.Item   disabled={isGenerate === 0} >
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
      <Menu.Item onClick={handleModal} key="archive" >
        <div>
        <HddOutlined />
          <span
            tw="cursor-pointer"
          >
            Archive
          </span>
        </div>
      </Menu.Item>

      <Menu.Item onClick={handleModal} key="delete" >
        <div>
        <RestOutlined />
          <span tw="cursor-pointer" >
            Delete
          </span>
        </div>
      </Menu.Item>
    </Menu>
  </div>
  )
}



