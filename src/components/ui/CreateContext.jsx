// contexts/data-context.jsx
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [tableData, setTableData] = useState(sampleData); // Initial data

  return (
    <DataContext.Provider value={{ tableData, setTableData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
