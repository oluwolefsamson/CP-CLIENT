import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useIsMobile } from "../../hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { WheatIcon, RiceBowlIcon, GrainIcon } from "lucide-react";

// Enhanced agricultural price data with more frequent data points
const priceData = [
  { date: "2024-04-01", maize: 32000, rice: 41000, sorghum: 28000 },
  { date: "2024-04-15", maize: 34500, rice: 41500, sorghum: 29000 },
  { date: "2024-05-01", maize: 35500, rice: 43000, sorghum: 28500 },
  { date: "2024-05-15", maize: 36500, rice: 44000, sorghum: 30000 },
  { date: "2024-06-01", maize: 35000, rice: 42000, sorghum: 29500 },
  { date: "2024-06-15", maize: 34000, rice: 41000, sorghum: 28500 },
  { date: "2024-06-30", maize: 33500, rice: 41500, sorghum: 28000 },
];

const chartConfig = {
  maize: {
    label: "Maize",
    color: "#16a34a", // Green-600
    icon: <WheatIcon className="h-4 w-4" />,
    gradient: { start: "#22c55e", end: "#dcfce7" }, // Green-500 to Green-100
  },
  rice: {
    label: "Rice",
    color: "#2563eb", // Blue-600
    icon: <RiceBowlIcon className="h-4 w-4" />,
    gradient: { start: "#3b82f6", end: "#dbeafe" }, // Blue-500 to Blue-100
  },
  sorghum: {
    label: "Sorghum",
    color: "#ea580c", // Orange-600
    icon: <GrainIcon className="h-4 w-4" />,
    gradient: { start: "#f97316", end: "#ffedd5" }, // Orange-500 to Orange-100
  },
};

export function ChartAreaInteractive({ selectedCrop }) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("3m");
  const [displayCrop, setDisplayCrop] = React.useState(selectedCrop || "maize");

  const filteredData = priceData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    const monthsToSubtract = { "1m": 1, "3m": 3, "6m": 6 }[timeRange] || 3;
    const startDate = new Date(
      referenceDate.setMonth(referenceDate.getMonth() - monthsToSubtract)
    );
    return date >= startDate;
  });

  return (
    <Card className="@container/card bg-gradient-to-b from-green-50/50 to-white shadow-lg">
      <CardHeader className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
          <div className="space-y-1">
            <CardTitle className="text-green-900">Crop Price Trends</CardTitle>
            <CardDescription className="text-green-700">
              Historical pricing for{" "}
              {chartConfig[displayCrop].label.toLowerCase()} per 100kg
            </CardDescription>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Select value={displayCrop} onValueChange={setDisplayCrop}>
              <SelectTrigger className="w-full sm:w-40">
                <div className="flex items-center gap-2">
                  {chartConfig[displayCrop].icon}
                  <span>{chartConfig[displayCrop].label}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(chartConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      {config.icon}
                      {config.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={setTimeRange}
              variant="outline"
              className="flex-wrap justify-end"
            >
              <ToggleGroupItem value="6m" className="h-8 px-3 text-sm">
                6M
              </ToggleGroupItem>
              <ToggleGroupItem value="3m" className="h-8 px-3 text-sm">
                3M
              </ToggleGroupItem>
              <ToggleGroupItem value="1m" className="h-8 px-3 text-sm">
                1M
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig[displayCrop].gradient.start}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig[displayCrop].gradient.end}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#94a3b8"
                strokeOpacity={0.1}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
                angle={isMobile ? -45 : 0}
                dy={isMobile ? 10 : 0}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
                width={isMobile ? 60 : 80}
              />

              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-xl border border-green-100 relative">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-green-200 rotate-45" />
                        <p className="text-sm font-medium text-green-900 mb-2">
                          {new Date(label).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: chartConfig[displayCrop].color,
                            }}
                          />
                          <span className="font-semibold text-green-900">
                            ₦{payload[0].value.toLocaleString()}
                          </span>
                          <span className="text-sm text-green-600">/100kg</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Area
                type="monotone"
                dataKey={displayCrop}
                stroke={chartConfig[displayCrop].color}
                strokeWidth={2}
                fill="url(#priceGradient)"
                fillOpacity={0.3}
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
