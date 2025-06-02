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
import {
  AlertCircle,
  TrendingUp,
  X,
  Bookmark,
  Share2,
  Eye,
} from "lucide-react";
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
      trend: "+4.2%",
      lastUpdated: "2h ago",
    },
    {
      id: 2,
      name: "Millet",
      category: "grains",
      priceRange: [25000, 38000],
      unit: "₦/bag",
      markets: 8,
      image: milletImg,
      trend: "+2.1%",
      lastUpdated: "4h ago",
    },
    {
      id: 3,
      name: "Guinea Corn",
      category: "grains",
      priceRange: [45000, 50000],
      unit: "₦/bag",
      markets: 3,
      image: guineaCornImg,
      trend: "-1.3%",
      lastUpdated: "1d ago",
    },
    {
      id: 4,
      name: "Rice",
      category: "grains",
      priceRange: [60000, 100000],
      unit: "₦/bag",
      markets: 5,
      image: riceImg,
      trend: "+5.7%",
      lastUpdated: "6h ago",
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
          borderColor: "hsl(215.4 16.3% 46.9%)",
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

    const MetricCard = ({ title, value, change }) => (
      <div className="p-4 bg-background rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            {typeof value === "string" ? value : `₦${value?.toLocaleString()}`}
          </p>
          {change && (
            <span
              className={`text-sm font-medium ${
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
            <div className="px-6 pt-6 pb-4 mt-10 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {selectedCrop?.name} Market Trends
                </h2>
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger className="w-[120px] bg-white dark:bg-gray-800">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800">
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
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
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

  const ImagePreviewModal = () => {
    if (!selectedImage) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20"
          onClick={() => setSelectedImage(null)}
        >
          <X className="h-8 w-8" />
        </button>

        <div className="w-full max-w-4xl">
          <div className="relative aspect-video w-full max-h-[80vh]">
            <img
              src={selectedImage}
              alt="Crop preview"
              className="w-full h-full object-contain shadow-xl"
            />

            {!selectedImage && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg" />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <Tabs defaultValue="explore" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="explore">Market Prices</TabsTrigger>
          <TabsTrigger value="submit">Submit Price</TabsTrigger>
        </TabsList>

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
              <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-800">
                <SelectValue placeholder="Filter category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
                <SelectItem value="all">All Crops</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="tubers">Tubers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
            {loading ? (
              Array(8)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 animate-pulse" />
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
                      </div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                      <div className="flex gap-3">
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1 animate-pulse" />
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))
            ) : filteredCrops.length > 0 ? (
              filteredCrops.map((crop) => (
                <div
                  key={crop.id}
                  className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-full"
                >
                  {/* Image Section with View Button */}
                  <div className="relative aspect-video overflow-hidden w-full max-w-full">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedImage(crop.image)}
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium shadow-md flex items-center gap-1 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setSelectedImage(crop.image)}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      {crop.markets} markets
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 w-full max-w-full">
                    <div className="flex justify-between items-start mb-3 w-full max-w-full">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate max-w-[70%]">
                        {crop.name}
                      </h3>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900/50 dark:text-green-200 whitespace-nowrap">
                        {crop.category}
                      </span>
                    </div>

                    {/* Price Section */}
                    <div className="mb-4 w-full max-w-full">
                      <div className="flex items-baseline gap-2 mb-1 flex-wrap w-full max-w-full">
                        <span className="text-2xl font-extrabold text-green-600 dark:text-green-400">
                          ₦{crop.priceRange[0].toLocaleString()}
                        </span>
                        <span className="text-gray-400">-</span>
                        <span className="text-2xl font-extrabold text-green-600 dark:text-green-400">
                          ₦{crop.priceRange[1].toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1 whitespace-nowrap">
                          /{crop.unit}
                        </span>
                      </div>

                      <div className="flex items-center justify-between w-full max-w-full">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 min-w-0">
                          <AlertCircle className="h-4 w-4 mr-1 text-yellow-500" />
                          <span className="truncate">{crop.lastUpdated}</span>
                        </div>

                        <span
                          className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                            crop.trend.startsWith("+")
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          }`}
                        >
                          {crop.trend}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 w-full max-w-full flex-wrap">
                      <Button
                        onClick={() => setSelectedCrop(crop)}
                        className="flex-1 text-white bg-gradient-to-r from-green-500 to-green-500 hover:from-green-500 hover:to-green-600 transition-all shadow-md"
                      >
                        <TrendingUp className="h-4 w-4 mr-2 text-white" />
                        View Trends
                      </Button>

                      <Button
                        variant="outline"
                        className="px-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Bookmarked:", crop.name);
                        }}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        className="px-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Shared:", crop.name);
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16 px-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                <X className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                  No crops found
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="submit">
          <SubmitPrice crops={mockCrops} />
        </TabsContent>
      </Tabs>

      <PriceTrendDrawer />
      <ImagePreviewModal />
    </div>
  );
};

export default CropsPrice;
