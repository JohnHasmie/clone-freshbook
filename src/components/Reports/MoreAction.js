import {
  EditOutlined,
  ExportOutlined,
  FileDoneOutlined,
  HddOutlined,
  ImportOutlined,
  PrinterOutlined,
  RestOutlined,
  UsergroupAddOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactToPrint from "react-to-print";

const MyPrintButton = ({ myRef }) => (
  <ReactToPrint
    trigger={() => <span tw="cursor-pointer">Print</span>}
    content={() => myRef.current}
  />
);

export default function MoreAction({  myRef }) {
  const history = useHistory();
  const handlePrint = () => {
    // let a = window.open('', 'Cek')
    // history.push(urlLink);
    <ReactToPrint
      trigger={() => <button>Cetak</button>}
      content={() => myRef.current}
    />;
    // window.print()
  };
  return (
    <div>
      <Menu>
        <Menu.Item key="export" disabled>
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
        <ReactToPrint
          trigger={() => (
            <Menu.Item key="print">
              <div>
                <PrinterOutlined />
                <span tw="cursor-pointer">Print</span>
              </div>
            </Menu.Item>
          )}
          content={() => myRef.current}
        />
      </Menu>
    </div>
  );
}

export function MoreActionClients({ pdfRefetch }) {
  return (
    <div>
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
  );
}

export function MoreActionClientsDetail({
  globalDetailClient,
  history,
  handleModal,
}) {
  const [isGenerate, setIsGenerate] = useState(0);

  return (
    <div>
      <Menu>
        <Menu.Item>
          <div>
            <EditOutlined />
            <span
              tw="cursor-pointer"
              onClick={() =>
                history.push(`/clients/${globalDetailClient?.id}/edit`)
              }
            >
              Edit Client
            </span>
          </div>
        </Menu.Item>
        <Menu.Item disabled={isGenerate === 0}>
          <div>
            <UsergroupAddOutlined />
            <span tw="cursor-pointer" onClick={() => console.log("generate")}>
              Generate Statement
            </span>
          </div>
        </Menu.Item>
        <Menu.Item onClick={handleModal} key="archive">
          <div>
            <HddOutlined />
            <span tw="cursor-pointer">Archive</span>
          </div>
        </Menu.Item>

        <Menu.Item onClick={handleModal} key="delete">
          <div>
            <RestOutlined />
            <span tw="cursor-pointer">Delete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );
}
