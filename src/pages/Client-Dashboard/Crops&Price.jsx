import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Skeleton } from "../../components/ui/skeleton";
import { AlertCircle, TrendingUp, X } from "lucide-react";
import cornImg from "../../assets/images/crops/corn.jpeg";
import milletImg from "../../assets/images/crops/millet.jpeg";
import guineaCornImg from "../../assets/images/crops/guinea-corn.jpeg";
import riceImg from "../../assets/images/crops/rice.jpeg";
import SubmitPrice from "./SubmitPrice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CropsPrice = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredCrops, setFilteredCrops] = useState([]);

  const mockCrops = [
    {
      id: 1,
      name: "Corn",
      category: "grains",
      priceRange: [15000, 18000],
      unit: "₦/bag",
      markets: 12,
      image: cornImg,
    },
    {
      id: 2,
      name: "Millet",
      category: "grains",
      priceRange: [25000, 38000],
      unit: "₦/bag",
      markets: 8,
      image: milletImg,
    },
    {
      id: 3,
      name: "Guinea Corn",
      category: "grains",
      priceRange: [45000, 50000],
      unit: "₦/bag",
      markets: 3,
      image: guineaCornImg,
    },
    {
      id: 4,
      name: "Rice",
      category: "grains",
      priceRange: [60000, 100000],
      unit: "₦/bag",
      markets: 5,
      image: riceImg,
    },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    filterCrops();
  }, [searchQuery, selectedCategory]);

  const filterCrops = () => {
    let result = mockCrops;

    if (selectedCategory !== "all") {
      result = result.filter((crop) => crop.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter((crop) =>
        crop.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCrops(result);
  };

  const PriceTrendDrawer = () => {
    const getData = (period = "7d") => {
      const dataMap = {
        "7d": {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"],
          prices: [15800, 16200, 16500, 16300, 16800, 17200, 17500],
        },
        "30d": {
          labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
          prices: Array.from({ length: 30 }, () =>
            Math.floor(Math.random() * 4000 + 15000)
          ),
        },
      };

      return dataMap[period] || dataMap["7d"];
    };

    const [timePeriod, setTimePeriod] = useState("7d");
    const { labels, prices } = getData(timePeriod);

    const chartData = {
      labels,
      datasets: [
        {
          label: "Price (₦)",
          data: prices,
          borderColor: "hsl(215.4 16.3% 46.9%)", // Using slate-500
          backgroundColor: "hsl(215.4 16.3% 46.9% / 0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "nearest",
          intersect: false,
          backgroundColor: "hsl(224 71% 4%)",
          titleColor: "hsl(210 40% 98%)",
          bodyColor: "hsl(210 40% 98%)",
          borderColor: "hsl(215.4 16.3% 46.9%)",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (context) => `₦${context.parsed.y.toLocaleString()}`,
          },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawTicks: false,
          },
          ticks: {
            color: "hsl(215.4 16.3% 46.9%)",
            font: {
              weight: 500,
            },
          },
          border: {
            color: "hsl(215.4 16.3% 46.9% / 0.2)",
          },
        },
        y: {
          beginAtZero: false,
          grid: {
            color: "hsl(215.4 16.3% 46.9% / 0.1)",
            drawTicks: false,
          },
          ticks: {
            color: "hsl(215.4 16.3% 46.9%)",
            callback: (value) => `₦${Number(value).toLocaleString()}`,
            font: {
              weight: 500,
            },
          },
          border: {
            color: "hsl(215.4 16.3% 46.9% / 0.2)",
          },
        },
      },
      elements: {
        line: {
          cubicInterpolationMode: "monotonic",
        },
      },
    };

    // Update the metrics display section
    const MetricCard = ({ title, value, change }) => (
      <div className="p-4 bg-background rounded-lg border">
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            {typeof value === "string" ? value : `₦${value?.toLocaleString()}`}
          </p>
          {change && (
            <span
              className={`text-sm ${
                change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </span>
          )}
        </div>
      </div>
    );

    return (
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          selectedCrop ? "visible" : "invisible"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={() => setSelectedCrop(null)}
        />

        {/* Updated Drawer Content */}
        <div
          className={`fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl shadow-xl transition-transform duration-300 ${
            selectedCrop ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ height: "85vh" }}
        >
          <div className="absolute left-1/2 top-2 -translate-x-1/2">
            <div className="h-1.5 w-12 rounded-full bg-gray-300" />
          </div>

          <div className="h-full flex flex-col overflow-hidden">
            <div className="px-6 pt-6 pb-4 mt-10 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {selectedCrop?.name} Market Trends
                </h2>
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="h-[300px] relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-transparent z-10 pointer-events-none" />
                  <Line data={chartData} options={options} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Current Price"
                    value={prices[prices.length - 1]}
                  />
                  <MetricCard title="7D Change" value="+4.2%" change="+4.2%" />
                  <MetricCard title="30D High" value="₦18,200" />
                  <MetricCard title="30D Low" value="₦15,800" />
                </div>

                <div className="text-sm text-muted-foreground flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span>
                    Prices trending above 3-month average in 12 markets
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <Tabs defaultValue="explore" className="w-full">
        <TabsContent value="explore">
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search crops..."
              className="w-full md:max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="tubers">Tubers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {loading ? (
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="animate-pulse h-[400px]">
                    <Skeleton className="h-full w-full" />
                  </Card>
                ))
            ) : filteredCrops.length > 0 ? (
              filteredCrops.map((crop) => (
                <Card
                  key={crop.id}
                  className="group hover:shadow-2xl transition-all duration-300 ease-in-out h-[400px] relative overflow-hidden rounded-2xl cursor-pointer border border-green-200"
                  onClick={() => setSelectedImage(crop.image)}
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <CardHeader className="p-0">
                      <CardTitle className="flex justify-between items-start">
                        <span className="text-lg font-semibold text-white drop-shadow-md">
                          {crop.name}
                        </span>
                        <span className="text-sm font-medium bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                          {crop.markets} markets
                        </span>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="text-white p-0 space-y-2 mt-4">
                      <div className="text-xl font-extrabold text-green-200 drop-shadow-sm">
                        ₦{crop.priceRange[0].toLocaleString()} - ₦
                        {crop.priceRange[1].toLocaleString()}
                        <span className="text-sm text-green-100 ml-2">
                          /{crop.unit}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-green-100">
                        <AlertCircle className="h-4 w-4 mr-2 text-yellow-300" />
                        Updated 2h ago
                      </div>
                    </CardContent>

                    <CardFooter className="p-0 mt-6">
                      <div className="flex items-center w-full gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCrop(crop);
                          }}
                          className="w-3/4 flex items-center justify-center gap-2 py-4 px-4 bg-white text-gray-900 font-semibold rounded-full shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          View Trends
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Bookmarked:", crop.name);
                          }}
                          className="w-[70px] h-[60px] aspect-square flex items-center justify-center rounded-3xl bg-gray-500 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl transition-all"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No crops found matching your criteria
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="submit">
          <SubmitPrice crops={mockCrops} />
        </TabsContent>

        <TabsContent value="alerts">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Price Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select className="flex-1">
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

                <Select className="w-[120px]">
                  <SelectTrigger>
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="above">Above</SelectItem>
                    <SelectItem value="below">Below</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  placeholder="Price"
                  className="w-[150px]"
                />

                <Button variant="outline" className="whitespace-nowrap">
                  Add Alert
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Active Alerts</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((alert) => (
                    <div
                      key={alert}
                      className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100"
                    >
                      <div>
                        <div className="font-medium">Maize</div>
                        <div className="text-sm text-muted-foreground">
                          Notify when price exceeds ₦20,000/bag
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <PriceTrendDrawer />
    </div>
  );
};

export default CropsPrice;
