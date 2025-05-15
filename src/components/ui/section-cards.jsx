import {
  TrendingDownIcon,
  TrendingUpIcon,
  SproutIcon,
  AlertCircleIcon,
  WarehouseIcon,
  CoinsIcon,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export function SectionCards({ metrics }) {
  const agriculturalCards = [
    {
      title: "Maize Price Trend",
      value: "₦35,800",
      change: "+15%",
      period: "This week",
      icon: <TrendingUpIcon className="h-5 w-5 text-primary" />,
      status: "positive",
      description: "Average price across nearby markets",
      unit: "per 100kg bag",
    },
    {
      title: "Price Alerts",
      value: "8 Triggers",
      change: "3 New",
      period: "Last 24h",
      icon: <AlertCircleIcon className="h-5 w-5 text-destructive" />,
      status: "alert",
      description: "Active price threshold alerts",
      unit: "across your crops",
    },
    {
      title: "Price Submissions",
      value: "24 Entries",
      change: "+40%",
      period: "Today",
      icon: <CoinsIcon className="h-5 w-5 text-primary" />,
      status: "positive",
      description: "Community price reports submitted",
      unit: "in your region",
    },
    {
      title: "Active Markets",
      value: "12 Nearby",
      change: "2 New",
      period: "This month",
      icon: <WarehouseIcon className="h-5 w-5 text-primary" />,
      status: "neutral",
      description: "Markets with recent price updates",
      unit: "within 50km radius",
    },
  ];

  return (
    <div className="group/cards *:data-[slot=card]:shadow-xs grid auto-rows-fr grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-green-50 *:data-[slot=card]:to-card hover:*:data-[slot=card]:[&:not(:hover)]:opacity-50 dark:*:data-[slot=card]:bg-card sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      {agriculturalCards.map((card, index) => (
        <Card
          key={index}
          className="@container/card relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 to-transparent opacity-20" />

          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardDescription>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full p-1.5 ${
                  card.status === "alert"
                    ? "bg-destructive/10"
                    : "bg-primary/10"
                }`}
              >
                {card.icon}
              </div>
            </div>

            <CardTitle className="@[250px]/card:text-3xl mt-4 text-2xl font-bold tabular-nums">
              {card.value}
              <span className="ml-2 text-base font-medium text-muted-foreground">
                {card.unit}
              </span>
            </CardTitle>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/20">
              <div
                className={`h-full transition-all duration-500 ${
                  card.status === "alert"
                    ? "bg-destructive w-1/3"
                    : card.status === "positive"
                      ? "bg-primary w-2/3"
                      : "bg-gray-400 w-1/2"
                }`}
              />
            </div>
          </CardHeader>

          <CardFooter className="flex flex-col items-start gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium">
              {card.status === "alert" ? (
                <>
                  <AlertCircleIcon className="h-4 w-4 text-destructive" />
                  <span className="text-destructive">{card.change}</span>
                </>
              ) : (
                <>
                  {card.status === "positive" ? (
                    <TrendingUpIcon className="h-4 w-4 text-primary" />
                  ) : (
                    <TrendingDownIcon className="h-4 w-4 text-gray-400" />
                  )}
                  <span
                    className={
                      card.status === "positive"
                        ? "text-primary"
                        : "text-gray-400"
                    }
                  >
                    {card.change}
                  </span>
                </>
              )}
              <span className="text-muted-foreground">{card.period}</span>
            </div>

            <div className="text-muted-foreground">{card.description}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
