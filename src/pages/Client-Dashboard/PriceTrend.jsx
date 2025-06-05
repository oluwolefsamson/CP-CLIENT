import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { format } from "date-fns";
import { Skeleton } from "../../components/ui/skeleton";

// Mock data
const mockCrops = [
  { id: 1, name: "Maize", category: "grains" },
  { id: 2, name: "Rice", category: "grains" },
  { id: 3, name: "Tomato", category: "vegetables" },
];

const mockMarkets = [
  { id: 1, name: "Kano Central Market", state: "Kano" },
  { id: 2, name: "Lagos Main Market", state: "Lagos" },
  { id: 3, name: "Onitsha Market", state: "Anambra" },
];

const generatePriceData = () => {
  const data = [];
  const today = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    data.push({
      date: date.toISOString().split("T")[0],
      price: Math.floor(80 + Math.random() * 70),
      forecast: i < 7 ? Math.floor(80 + Math.random() * 70) : null,
    });
  }

  return data;
};

const PriceTrend = () => {
  const [selectedCrop, setSelectedCrop] = useState(mockCrops[0].id);
  const [selectedMarket, setSelectedMarket] = useState(mockMarkets[0].id);
  const [timeRange, setTimeRange] = useState("30d");
  const [chartType, setChartType] = useState("line");
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setPriceData(generatePriceData());
        setError(null);
      } catch (err) {
        setError("Failed to load price data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCrop, selectedMarket, startDate, endDate]);

  useEffect(() => {
    const today = new Date();
    switch (timeRange) {
      case "7d":
        setStartDate(new Date(today.setDate(today.getDate() - 7)));
        break;
      case "30d":
        setStartDate(new Date(today.setDate(today.getDate() - 30)));
        break;
      case "90d":
        setStartDate(new Date(today.setDate(today.getDate() - 90)));
        break;
      default:
        break;
    }
    setEndDate(new Date());
  }, [timeRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-indigo-600">
            Price: ₦{payload[0].value.toFixed(2)}
          </p>
          {payload[1] && payload[1].value && (
            <p className="text-emerald-600">
              Forecast: ₦{payload[1].value.toFixed(2)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const formatXAxis = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Calculate statistics
  const currentPrice =
    priceData.length > 0 ? priceData[priceData.length - 1].price : 0;
  const avgPrice =
    priceData.reduce((sum, item) => sum + item.price, 0) / priceData.length ||
    0;
  const priceChange =
    priceData.length > 1
      ? (
          ((currentPrice - priceData[0].price) / priceData[0].price) *
          100
        ).toFixed(2)
      : 0;

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-2 py-8">
        {/* Title Card Skeleton */}
        <Card className="mb-6 bg-white">
          <CardHeader>
            <Skeleton className="h-8 w-56 mb-2" />
            <Skeleton className="h-4 w-40" />
          </CardHeader>
        </Card>

        {/* Filters Skeleton */}
        <Card className="mb-6 bg-white">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Date Range Picker Skeleton */}
        <Card className="mb-6 bg-white">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chart Skeleton */}
        <Card className="mb-6 bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-8 w-40 rounded-full" />
          </CardHeader>
          <CardContent className="h-96 flex items-center justify-center">
            <Skeleton className="h-80 w-full rounded-lg" />
          </CardContent>
        </Card>

        {/* Statistics Summary Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-white">
              <CardHeader>
                <Skeleton className="h-4 w-24 mb-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-2 py-8">
      <Card className="mb-6 bg-gray-50">
        <CardHeader>
          <CardTitle className="text-2xl">Price Trend Analysis</CardTitle>
          <CardDescription>
            Track historical prices and forecast future trends
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Filters Section */}
      <Card className="mb-6 bg-gray-50">
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Crop
            </label>
            <Select
              value={selectedCrop.toString()}
              onValueChange={(value) => setSelectedCrop(Number(value))}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {mockCrops.map((crop) => (
                  <SelectItem key={crop.id} value={crop.id.toString()}>
                    {crop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Market
            </label>
            <Select
              value={selectedMarket.toString()}
              onValueChange={(value) => setSelectedMarket(Number(value))}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select market" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {mockMarkets.map((market) => (
                  <SelectItem key={market.id} value={market.id.toString()}>
                    {market.name} ({market.state})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chart Type
            </label>
            <Select
              value={chartType}
              onValueChange={(value) => setChartType(value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Range
            </label>
            <div className="flex space-x-2">
              <Button
                variant={timeRange === "7d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("7d")}
              >
                7D
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("30d")}
              >
                30D
              </Button>
              <Button
                variant={timeRange === "90d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("90d")}
              >
                90D
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date Range Picker */}
      <Card className="mb-6 bg-gray-50">
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 bg-white" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  className="bg-white"
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    if (date) {
                      setStartDate(date);
                      setTimeRange("custom");
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 ">
                <Calendar
                  className="bg-white"
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    if (date) {
                      setEndDate(date);
                      setTimeRange("custom");
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Chart Area */}
      <Card className="mb-6 bg-gray-50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              {mockCrops.find((c) => c.id === selectedCrop)?.name} Prices at{" "}
              {mockMarkets.find((m) => m.id === selectedMarket)?.name}
            </CardTitle>
            <CardDescription>
              Historical prices and forecasted trends
            </CardDescription>
          </div>
          <div className="bg-emerald-50 px-4 py-2 rounded-full">
            <span className="text-emerald-700 font-medium">
              Current Price: ₦{currentPrice.toFixed(2)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="h-96">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="mt-4 text-gray-600">Loading price data...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-red-50 p-4 rounded-lg max-w-md text-center">
                <p className="text-red-700 font-medium">{error}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" ? (
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatXAxis}
                    tick={{ fill: "#555" }}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    tickFormatter={(value) => `₦${value}`}
                    tick={{ fill: "#555" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    name="Historical Price"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    name="Forecasted Price"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              ) : (
                <BarChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatXAxis}
                    tick={{ fill: "#555" }}
                  />
                  <YAxis
                    tickFormatter={(value) => `₦${value}`}
                    tick={{ fill: "#555" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="price" name="Historical Price" fill="#8884d8" />
                  <Bar
                    dataKey="forecast"
                    name="Forecasted Price"
                    fill="#82ca9d"
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              30-Day Change
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold ${priceChange >= 0 ? "text-emerald-600" : "text-red-600"}`}
            >
              {priceChange >= 0 ? "↑" : "↓"} {Math.abs(priceChange)}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">
              ₦{avgPrice.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              Price Volatility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">Medium</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              7-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">Stable ↑</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PriceTrend;
