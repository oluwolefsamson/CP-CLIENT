import { useState, useEffect } from "react";
import { ChartAreaInteractive } from "../../components/ui/chart-area-interactive";
import { DataTable } from "../../components/ui/data-table";
import { SectionCards } from "../../components/ui/section-cards";
import { Skeleton } from "../../components/ui/skeleton";
import data from "../../assets/data/dashboard-data.json";

export function Overview() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-xl" />
          ))}
        </div>
      ) : (
        <SectionCards />
      )}

      {/* Chart Skeleton */}
      <div className="px-4 lg:px-6">
        {isLoading ? (
          <Skeleton className="h-[400px] rounded-lg" />
        ) : (
          <ChartAreaInteractive />
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4 px-4 lg:px-6">
          <Skeleton className="h-10 w-full rounded-lg" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>
      ) : (
        <DataTable />
      )}
    </div>
  );
}
