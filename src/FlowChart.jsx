import React, { useState, useCallback } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { nodes, edges } from "./element";
import * as XLSX from "xlsx";
import { useDropzone } from "react-dropzone";

const FlowChart = () => {
  const [jsonData, setJsonData] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
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
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xls,.xlsx,.csv",
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div {...getRootProps()} style={{ padding: "10px", border: "2px dashed #000", cursor: "pointer" }}>
        <input {...getInputProps()} />
        <p>Drag & drop an Excel/CSV file here, or click to select one</p>
      </div>
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  );
};

export default FlowChart;
