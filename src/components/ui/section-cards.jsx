import React from "react";
import {
  TrendingUpIcon,
  AlertCircleIcon,
  WarehouseIcon,
  CoinsIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../components/ui/card";

export function SectionCards() {
  const agriculturalCards = [
    {
      title: "Maize Price Trend",
      value: "₦35,800",
      change: "+15%",
      period: "This week",
      icon: <TrendingUpIcon />,
      description: "Average price across nearby markets",
      unit: "per 100kg bag",
      progress: 80,
      color: "green",
    },
    {
      title: "Price Alerts",
      value: "8 Triggers",
      change: "3 New",
      period: "Last 24h",
      icon: <AlertCircleIcon />,
      description: "Active price threshold alerts",
      unit: "across your crops",
      progress: 60,
      color: "amber",
    },
    {
      title: "Price Submissions",
      value: "24 Entries",
      change: "+40%",
      period: "Today",
      icon: <CoinsIcon />,
      description: "Community price reports submitted",
      unit: "in your region",
      progress: 90,
      color: "blue",
    },
    {
      title: "Active Markets",
      value: "12 Nearby",
      change: "2 New",
      period: "This month",
      icon: <WarehouseIcon />,
      description: "Markets with recent price updates",
      unit: "within 50km radius",
      progress: 50,
      color: "emerald",
    },
  ];

  // Helper for progress bar color
  const progressBarColor = {
    green: "bg-green-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
  };

  return (
    <div className="w-full  mx-auto px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {agriculturalCards.map((card, index) => (
          <Card
            key={index}
            className="overflow-hidden border border-gray-100 bg-white shadow transition-all hover:shadow-lg rounded-2xl"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardDescription className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {card.title}
                  </CardDescription>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-end gap-2">
                    {card.value}
                    <span className="ml-1 text-xs font-medium text-gray-500">
                      {card.unit}
                    </span>
                  </CardTitle>
                </div>
                <div
                  className={`rounded-xl p-2 bg-gradient-to-br from-${card.color}-100 to-white shadow-inner`}
                >
                  {React.cloneElement(card.icon, {
                    className: `h-7 w-7 text-${card.color}-600`,
                  })}
                </div>
              </div>
            </CardHeader>

            <CardFooter className="flex flex-col items-start gap-3 pt-0">
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-1 rounded-full bg-${card.color}-100 px-3 py-1 text-xs font-semibold text-${card.color}-700`}
                >
                  <TrendingUpIcon className="h-4 w-4" />
                  {card.change}
                </span>
                <span className="text-xs text-gray-500">{card.period}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full space-y-1">
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${progressBarColor[card.color]}`}
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-medium text-gray-400">
                  <span>Weekly Avg.</span>
                  <span>Market Range</span>
                </div>
              </div>

              <p className="text-xs text-gray-600">{card.description}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
