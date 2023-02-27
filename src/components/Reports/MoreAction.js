import {
  EditOutlined,
  ExportOutlined,
  HddOutlined,
  ImportOutlined,
  PrinterOutlined,
  RestOutlined,
  UsergroupAddOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { CSVLink } from "react-csv";
import { Link, useHistory } from "react-router-dom";
import ReactToPrint from "react-to-print";

export default function MoreAction({  myRef ,excelRefetch}) {
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
              Export to PDF
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
              Export to PDF
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
        <Menu.Item>
          <div>
            <UsergroupAddOutlined />
            <Link to={`/dashboard/reports/account-statement?clientId=${globalDetailClient?.id}`}>
              Generate Statement
            </Link>
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
