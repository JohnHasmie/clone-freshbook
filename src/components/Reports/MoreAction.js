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
import { CSVLink } from "react-csv";
import { useHistory } from "react-router-dom";
import ReactToPrint from "react-to-print";

const MyPrintButton = ({ myRef }) => (
  <ReactToPrint
    trigger={() => <span tw="cursor-pointer">Print</span>}
    content={() => myRef.current}
  />
);

export default function MoreAction({  myRef ,excelRefetch}) {
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
  console.log(myRef,"Type");
  return (
    <div>
      <Menu>
        <Menu.Item key="export" >
          <div>
            <VerticalAlignBottomOutlined />
            <span
              tw="cursor-pointer"
              onClick={() => excelRefetch()}
            >
              Export
            </span>
          </div>
        </Menu.Item>
{typeof(myRef) === 'object'?
  <Menu.Item key="print" onClick={()=>history.push(`/invoices/${myRef.id}/print`)}>
  <div>
    <PrinterOutlined />
    <span tw="cursor-pointer">Print</span>
  </div>
</Menu.Item>

:<ReactToPrint
          trigger={() => (
            <Menu.Item key="print">
              <div>
                <PrinterOutlined />
                <span tw="cursor-pointer">Print</span>
              </div>
            </Menu.Item>
          )}
          content={() => myRef.current}
        />}
      </Menu>
    </div>
  );
}

export function MoreActionBackend({  myRef ,excelRefetch}) {
  const history = useHistory();
 
  return (
    <div>
      <Menu>
        <Menu.Item key="export" >
          <div>
            <VerticalAlignBottomOutlined />
            <span
              tw="cursor-pointer"
              onClick={() => excelRefetch()}
            >
              Export
            </span>
          </div>
        </Menu.Item>
{!myRef.current?
  <Menu.Item key="print" onClick={()=>history.push(`/invoices/${myRef.id}/print`)}>
  <div>
    <PrinterOutlined />
    <span tw="cursor-pointer">Print</span>
  </div>
</Menu.Item>

:<ReactToPrint
          trigger={() => (
            <Menu.Item key="print">
              <div>
                <PrinterOutlined />
                <span tw="cursor-pointer">Print</span>
              </div>
            </Menu.Item>
          )}
          content={() => myRef.current}
        />}
      </Menu>
    </div>
  );
}

export function MoreActionCSV({  myRef ,csvReport}) {
  const history = useHistory();

  return (
    <div>
      <Menu>
        <Menu.Item key="export" >
          <div>
            <VerticalAlignBottomOutlined  />
            <CSVLink
              tw="cursor-pointer"
              {...csvReport}
            >
              Export
            </CSVLink>
          </div>
        </Menu.Item>
{!myRef.current?
  <Menu.Item key="print" onClick={()=>history.push(`/invoices/${myRef.id}/print`)}>
  <div>
    <PrinterOutlined />
    <span tw="cursor-pointer">Print</span>
  </div>
</Menu.Item>

:<ReactToPrint
          trigger={() => (
            <Menu.Item key="print">
              <div>
                <PrinterOutlined />
                <span tw="cursor-pointer">Print</span>
              </div>
            </Menu.Item>
          )}
          content={() => myRef.current}
        />}
      </Menu>
    </div>
  );
}

export function MoreActionClients({ excelRefetch,onSelectFileClient }) {
  return (
    <div>
      <Menu>
        <Menu.Item key="import">
        <label
                  htmlFor="import-file"
                  tw="cursor-pointer"
      
                >
                  <input
                    type="file"
                    name="import-file"
                    id="import-file"
                    style={{ display: "none" }}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={onSelectFileClient}
                  />
           
           <ImportOutlined />
           <span
              tw="cursor-pointer"
            >
              Import Clients
            </span>
         </label>
        </Menu.Item>

        <Menu.Item key="export">
          <div>
            <ExportOutlined />
            <span tw="cursor-pointer" onClick={()=>excelRefetch()}>
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
