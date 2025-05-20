import React, { useEffect, useState } from "react";
import { DataTable } from "../../components/ui/data-table";
import { Toaster } from "sonner";
import { Skeleton } from "../../components/ui/skeleton";

const PriceAlert = () => {
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // simulate a delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <div className="space-y-4">
          {/* Simulate skeleton rows */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          ))}
        </div>
      ) : (
        <DataTable />
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default PriceAlert;
