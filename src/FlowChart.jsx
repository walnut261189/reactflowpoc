import React, { useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { nodes, edges } from "./element";
import * as XLSX from "xlsx";

const FlowChart = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        setJsonData(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <input type="file" accept=".xls,.xlsx,.csv" onChange={handleFileUpload} />
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  );
};

export default FlowChart;
