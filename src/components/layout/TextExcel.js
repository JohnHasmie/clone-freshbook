import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import * as XLSX from 'xlsx';
import { DOMParser } from 'xmldom';

export default function ExportExcel() {
  const [data, setData] = useState([]);
  const { data: queryData } = useQuery('data', async () => {
    // fetch data from API
    const response = await axios.get('clients/export');
    return await response.data;
  });
  // useEffect(() => {
  //   if (queryData) {
  //     // parse xml data
  //     const parser = new DOMParser();
  //     const xmlData = parser.parseFromString(queryData, 'application/xml');
  //     // convert to json
  //     const jsonData = xmlToJson(xmlData);
  //     setData(jsonData);
  //   }
  // }, [queryData]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(queryData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'data');
    XLSX.writeFile(wb, 'data.xlsx');
  }

  return (
    <div>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
}

function xmlToJson(xml) {
    // Create the return object
    var obj = {};
    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }
    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}
