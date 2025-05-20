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
      icon: <TrendingUpIcon className="h-6 w-6" />,
      description: "Average price across nearby markets",
      unit: "per 100kg bag",
    },
    {
      title: "Price Alerts",
      value: "8 Triggers",
      change: "3 New",
      period: "Last 24h",
      icon: <AlertCircleIcon className="h-6 w-6" />,
      description: "Active price threshold alerts",
      unit: "across your crops",
    },
    {
      title: "Price Submissions",
      value: "24 Entries",
      change: "+40%",
      period: "Today",
      icon: <CoinsIcon className="h-6 w-6" />,
      description: "Community price reports submitted",
      unit: "in your region",
    },
    {
      title: "Active Markets",
      value: "12 Nearby",
      change: "2 New",
      period: "This month",
      icon: <WarehouseIcon className="h-6 w-6" />,
      description: "Markets with recent price updates",
      unit: "within 50km radius",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      {agriculturalCards.map((card, index) => (
        <Card
          key={index}
          className="overflow-hidden border border-gray-200 bg-white shadow-sm"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardDescription className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  {card.title}
                </CardDescription>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {card.value}
                  <span className="ml-2 text-base font-medium text-gray-600">
                    {card.unit}
                  </span>
                </CardTitle>
              </div>
              <div className="rounded-lg bg-green-50 p-2">
                {React.cloneElement(card.icon, {
                  className: "h-6 w-6 text-green-600",
                })}
              </div>
            </div>
          </CardHeader>

          <CardFooter className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                <TrendingUpIcon className="h-4 w-4" />
                {card.change}
              </span>
              <span className="text-sm text-gray-600">{card.period}</span>
            </div>

            <div className="w-full space-y-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-green-100">
                <div className="h-full w-[60%] rounded-full bg-green-500" />
              </div>
              <div className="flex justify-between text-xs font-medium text-gray-500">
                <span>Weekly Avg.</span>
                <span>Market Range</span>
              </div>
            </div>

            <p className="text-sm text-gray-700">{card.description}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
