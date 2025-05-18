import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormLabel,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  ChevronRight,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Upload,
  ImageIcon,
  X,
} from "lucide-react";
import cornImg from "../../assets/images/crops/corn.jpeg";
import milletImg from "../../assets/images/crops/millet.jpeg";
import guineaCornImg from "../../assets/images/crops/guinea-corn.jpeg";
import riceImg from "../../assets/images/crops/rice.jpeg";

const CropsPrice = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const form = useForm();

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
      name: "G Corn",
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
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    form.setValue("image", null);
  };

  const handleFormSubmit = (data) => {
    toast.success("Price submitted successfully!");
    console.log("Form data:", data);
    form.reset();
    setPreviewImage(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 text-center space-y-3">
        <h1 className="text-3xl font-bold text-gray-500">
          Crop Price Intelligence
        </h1>
        <p className="text-muted-foreground">
          Real-time agricultural market insights
        </p>
      </div>

      <Tabs defaultValue="explore" className="w-full">
        <TabsList className="flex flex-col md:flex-row w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="explore" className="w-full md:w-auto">
            <TrendingUp className="h-4 w-4 mr-2" />
            Explore
          </TabsTrigger>
          <TabsTrigger value="submit" className="w-full md:w-auto">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Submit
          </TabsTrigger>
          <TabsTrigger value="alerts" className="w-full md:w-auto">
            <AlertCircle className="h-4 w-4 mr-2" />
            Alerts
          </TabsTrigger>
        </TabsList>

        {/* Explore Tab */}
        <TabsContent value="explore">
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search crops..."
              className="w-full md:max-w-md"
            />
            <Select>
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
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="animate-pulse h-[400px]">
                      <Skeleton className="h-full w-full" />
                    </Card>
                  ))
              : mockCrops.map((crop) => (
                  <Card
                    key={crop.id}
                    className="group hover:shadow-lg transition-all duration-300 h-[400px] relative overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(crop.image)}
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 h-full flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/40 to-transparent p-6">
                      <CardHeader className="p-0">
                        <CardTitle className="flex justify-between items-start">
                          <span className="text-lg font-semibold text-white">
                            {crop.name}
                          </span>
                          <span className="text-sm font-medium bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                            {crop.markets} markets
                          </span>
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="text-white p-0 space-y-2 mt-4">
                        <div className="text-xl font-bold text-green-200">
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
                        <Button
                          className="w-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();

                            setSelectedCrop(crop);
                          }}
                        >
                          View Trends <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
          </div>
        </TabsContent>

        {/* Submit Tab */}
        <TabsContent value="submit">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-700">
                New Price Submission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleFormSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="crop"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel>Crop Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a crop" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockCrops.map((crop) => (
                              <SelectItem
                                key={crop.id}
                                value={crop.id.toString()}
                              >
                                {crop.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel>Price (₦)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Enter price per unit"
                            className="text-lg font-medium"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Market Evidence</FormLabel>
                    <div className="flex flex-col gap-4">
                      {previewImage ? (
                        <div className="relative group">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                            onClick={removeImage}
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                          <div className="flex flex-col items-center text-gray-500">
                            <Upload className="h-8 w-8 mb-2" />
                            <p className="text-sm">Upload market photo</p>
                            <p className="text-xs text-muted-foreground">
                              JPEG or PNG, max 5MB
                            </p>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  <Button className="w-full h-12 text-lg" type="submit">
                    Submit Price Report
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
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

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-[95vw] max-h-[95vh] sm:max-w-[90vw] sm:max-h-[90vh] p-2">
          <div className="flex items-center justify-center h-full">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Enlarged crop preview"
                className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Price Trend Dialog */}
      <Dialog open={!!selectedCrop} onOpenChange={() => setSelectedCrop(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedCrop?.name} Price Trend
            </DialogTitle>
          </DialogHeader>
          <div className="h-64 bg-green-50 rounded-lg p-4">
            <div className="flex items-end justify-between h-full gap-2">
              {[16000, 16500, 17000, 16800, 17500].map((value, index) => (
                <div
                  key={index}
                  className="flex-1 bg-green-600 rounded-t animate-in fade-in"
                  style={{ height: `${(value / 20000) * 70}%` }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-4">
            <span>Last 7 days</span>
            <span>Average: ₦16,800/bag</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CropsPrice;
