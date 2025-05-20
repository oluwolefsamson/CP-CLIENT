import React from "react";
import { DataTable } from "../../components/ui/data-table";
import { Toaster } from "sonner";

const PriceAlert = () => {
  return (
    <div className="p-4">
      <DataTable />
      <Toaster position="top-center" />
    </div>
  );
};

export default PriceAlert;
