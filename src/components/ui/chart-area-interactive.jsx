import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

// Sample agricultural price data
const priceData = [
  { date: "2024-04-01", maize: 32000, rice: 41000, sorghum: 28000 },
  { date: "2024-04-08", maize: 33500, rice: 42500, sorghum: 27500 },
  { date: "2024-04-15", maize: 34500, rice: 41500, sorghum: 29000 },
  { date: "2024-04-22", maize: 35500, rice: 43000, sorghum: 28500 },
  { date: "2024-04-29", maize: 36500, rice: 44000, sorghum: 30000 },
  { date: "2024-05-06", maize: 35000, rice: 42000, sorghum: 29500 },
  { date: "2024-05-13", maize: 34000, rice: 41000, sorghum: 28500 },
  { date: "2024-05-20", maize: 33000, rice: 40000, sorghum: 27500 },
  { date: "2024-05-27", maize: 32500, rice: 39500, sorghum: 27000 },
  { date: "2024-06-03", maize: 31500, rice: 39000, sorghum: 26500 },
  { date: "2024-06-10", maize: 32000, rice: 40500, sorghum: 27500 },
  { date: "2024-06-17", maize: 33500, rice: 41500, sorghum: 28000 },
  { date: "2024-06-24", maize: 34500, rice: 42500, sorghum: 29000 },
];

const chartConfig = {
  maize: {
    label: "Maize",
    color: "hsl(88, 70%, 50%)", // Green
  },
  rice: {
    label: "Rice",
    color: "hsl(210, 70%, 50%)", // Blue
  },
  sorghum: {
    label: "Sorghum",
    color: "hsl(35, 70%, 50%)", // Orange
  },
};

export function ChartAreaInteractive({ selectedCrop }) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("3m");
  const [displayCrop, setDisplayCrop] = React.useState(selectedCrop || "maize");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("1m");
    }
  }, [isMobile]);

  const filteredData = priceData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let monthsToSubtract = 3;
    if (timeRange === "1m") monthsToSubtract = 1;
    if (timeRange === "6m") monthsToSubtract = 6;

    const startDate = new Date(referenceDate);
    startDate.setMonth(startDate.getMonth() - monthsToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card bg-gradient-to-b from-green-50 to-white">
      <CardHeader className="relative">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Crop Price Trends</CardTitle>
            <CardDescription>
              {displayCrop.charAt(0).toUpperCase() + displayCrop.slice(1)}{" "}
              prices per 100kg bag
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select
              value={displayCrop}
              onValueChange={setDisplayCrop}
              className="w-32"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maize">Maize</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="sorghum">Sorghum</SelectItem>
              </SelectContent>
            </Select>
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={setTimeRange}
              variant="outline"
              className="@[767px]/card:flex hidden"
            >
              <ToggleGroupItem value="6m" className="h-8 px-2.5">
                6M
              </ToggleGroupItem>
              <ToggleGroupItem value="3m" className="h-8 px-2.5">
                3M
              </ToggleGroupItem>
              <ToggleGroupItem value="1m" className="h-8 px-2.5">
                1M
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig[displayCrop].color}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig[displayCrop].color}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              strokeOpacity={0.2}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
              width={80}
            />

            <ChartTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-4 rounded-lg shadow-lg border">
                      <p className="font-medium text-sm text-gray-600">
                        {new Date(label).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <div className="mt-2">
                        {payload.map((entry) => (
                          <div
                            key={entry.dataKey}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="font-semibold">
                              ₦{entry.value?.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500">
                              /100kg
                            </span>
                          </div>
                        ))}
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
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
