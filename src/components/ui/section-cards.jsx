import React from "react";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AlertCircleIcon,
  WarehouseIcon,
  CoinsIcon,
  SproutIcon,
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
      status: "positive",
      description: "Average price across nearby markets",
      unit: "per 100kg bag",
    },
    {
      title: "Price Alerts",
      value: "8 Triggers",
      change: "3 New",
      period: "Last 24h",
      icon: <AlertCircleIcon className="h-6 w-6" />,
      status: "alert",
      description: "Active price threshold alerts",
      unit: "across your crops",
    },
    {
      title: "Price Submissions",
      value: "24 Entries",
      change: "+40%",
      period: "Today",
      icon: <CoinsIcon className="h-6 w-6" />,
      status: "positive",
      description: "Community price reports submitted",
      unit: "in your region",
    },
    {
      title: "Active Markets",
      value: "12 Nearby",
      change: "2 New",
      period: "This month",
      icon: <WarehouseIcon className="h-6 w-6" />,
      status: "neutral",
      description: "Markets with recent price updates",
      unit: "within 50km radius",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      {agriculturalCards.map((card, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden border-0 bg-gradient-to-br from-green-50/60 to-green-100/30 shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          {/* Modern agricultural pattern */}
          <div className="absolute inset-0 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,black)]">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <pattern
                id="diagonalHatch"
                width="5"
                height="5"
                patternTransform="rotate(45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="5"
                  className="stroke-green-200"
                  strokeWidth="1"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
            </svg>
          </div>

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-50/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <CardHeader className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <CardDescription className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-600">
                  {card.title}
                </CardDescription>
                <CardTitle className="text-3xl font-bold text-green-900">
                  {card.value}
                  <span className="ml-2 text-base font-medium text-green-600">
                    {card.unit}
                  </span>
                </CardTitle>
              </div>
              <div className="rounded-lg bg-green-100 p-2 shadow-inner">
                {React.cloneElement(card.icon, {
                  className: "h-6 w-6 text-green-700",
                })}
              </div>
            </div>
          </CardHeader>

          <CardFooter className="relative z-10 flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
                  card.status === "alert"
                    ? "animate-pulse bg-amber-100 text-amber-700"
                    : card.status === "positive"
                      ? "bg-green-100 text-green-700"
                      : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {card.status === "alert" ? (
                  <AlertCircleIcon className="h-4 w-4" />
                ) : card.status === "positive" ? (
                  <TrendingUpIcon className="h-4 w-4" />
                ) : (
                  <SproutIcon className="h-4 w-4" />
                )}
                {card.change}
              </span>
              <span className="text-sm text-green-600">{card.period}</span>
            </div>

            <div className="w-full space-y-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-green-100">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    card.status === "alert"
                      ? "bg-amber-400"
                      : card.status === "positive"
                        ? "bg-green-500"
                        : "bg-emerald-400"
                  }`}
                  style={{
                    width:
                      card.status === "alert"
                        ? "35%"
                        : card.status === "positive"
                          ? "75%"
                          : "50%",
                  }}
                />
              </div>
              <div className="flex justify-between text-xs font-medium text-green-600">
                <span>Weekly Avg.</span>
                <span>Market Range</span>
              </div>
            </div>

            <p className="text-sm text-green-700">{card.description}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
