export const nodes = [
    { id: "1", type: "input", data: { label: "Start" }, position: { x: 250, y: 5 } },
    { id: "2", data: { label: "Process" }, position: { x: 250, y: 100 } },
    { id: "3", type: "output", data: { label: "End" }, position: { x: 250, y: 200 } },
  ];
  
  export const edges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
  ];
  