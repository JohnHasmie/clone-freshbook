import { PlusOutlined, RestOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import axios from "axios";
import { useState,useEffect } from "react";
import { useQuery } from "react-query";
import "twin.macro";
import EditableText from "../../components/EditableText";
import { formatter } from "../../components/Utils";

const InvoiceLines = ({ linesProps }) => {
  const [lines, setLines] = linesProps;
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
  });
  const [isData, setIsData] = useState("");

  const addLine = () => {
    setLines([
      ...lines,
      {
        name: "Item title",
        description: "Item description",
        rate: 0,
        qty: 1,
        total: "0",
      },
    ]);
  };
  const { data: dataItems, status } = useQuery(
    ["items-by-client", filter],
    async (key) =>
      axios
        .get("items", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );

  useEffect(() => {
      const newLines=[...lines]
    if(isData && status === "success"){
let newDataItems=dataItems?.data?.data?.find(x =>x.id === isData.id)
newLines[isData.index].id=newDataItems.id
newLines[isData.index].name=newDataItems.name
newLines[isData.index].description=newDataItems.description
newLines[isData.index].rate=newDataItems.rate
newLines[isData.index].qty=newDataItems.qty
newLines[isData.index].total= String(parseInt(newDataItems.rate)*parseInt(newDataItems.qty))




setLines(newLines)
    }
  
 
  }, [isData,status])
  
  const handleRemove = (i) => {
    const newLines = [...lines];
    newLines.splice(i, 1);
    setLines(newLines);
  };
  const handleChange=(i,e)=>{
      setIsData({id:e,index:i})

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
          {lines.map((line, i) => {
            return (
              <>
                <tr tw="border-b text-sm  border-gray-300 text-right">
                  <th tw="grid text-left py-2">
       { status === "success" &&           <span>
                    <Select
                    tw="w-full"
            
            onChange={(e) =>
                handleChange(i,e)
           }
           value={line.name}
           options={dataItems?.data?.data?.map(item=>({
            label:item.name,
            value:item.id
           }))}
           />
                      {/* <EditableText
                        linesProps={[lines, setLines]}
                        type={"name"}
                        i={i}
                      >
                        {line.name}
                      </EditableText> */}
                    </span>}
                    <span tw="text-xs">
                      <EditableText
                        linesProps={[lines, setLines]}
                        type={"description"}
                        i={i}
                      >
                        {line.description}
                      </EditableText>
                    </span>
                  </th>
                  <td>
                    <EditableText
                      linesProps={[lines, setLines]}
                      type={"rate"}
                      i={i}
                    >
                      {line.rate}
                    </EditableText>
                  </td>
                  <td>
                    <EditableText
                      linesProps={[lines, setLines]}
                      type={"qty"}
                      i={i}
                    >
                      {line.qty}
                    </EditableText>
                  </td>
                  <td>
                    {/* <EditableText linesProps={[lines, setLines]} type={"total"} i={i} >{line.total}</EditableText> */}
                    {line.total}
                  </td>
                  <td>
                    <RestOutlined
                      tw="hover:opacity-50 cursor-pointer"
                      onClick={() => handleRemove(i)}
                    />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <Button onClick={addLine} tw="mt-4" block>
        <PlusOutlined />
        <span>Add a Line</span>
      </Button>
    </>
  );
};

export default InvoiceLines;
