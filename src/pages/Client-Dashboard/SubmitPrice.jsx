import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "../../components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { format } from "date-fns";
import {
  CalendarIcon,
  Upload,
  Info,
  BarChart2,
  Users,
  ShieldCheck,
  X,
  Trash2,
  Maximize2,
} from "lucide-react";
import { Skeleton } from "../../components/ui/skeleton";

// Custom scrollbar styles (tiny and gray)
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

const crops = [
  { id: 1, name: "Maize", price: 100 },
  { id: 2, name: "Rice", price: 150 },
  { id: 3, name: "Wheat", price: 120 },
  { id: 4, name: "Soybeans", price: 180 },
  { id: 5, name: "Sorghum", price: 90 },
];

const features = [
  {
    icon: <BarChart2 className="h-6 w-6 text-green-500" />,
    title: "Market Transparency",
    description:
      "Real-time pricing data helps eliminate information asymmetry in agricultural markets",
  },
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    title: "Community Driven",
    description:
      "Powered by farmers, traders, and agricultural officers like you",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
    title: "Verified Data",
    description:
      "All submissions are validated to ensure accuracy and reliability",
  },
];

const ImageUpload = ({
  onFilesSelect,
  previewUrls,
  onRemove,
  onImageClick,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFilesSelect(acceptedFiles);
      }
    },
  });

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="picture">Market Receipt Photos</Label>
      <Card
        {...getRootProps()}
        className={`flex h-32 cursor-pointer items-center justify-center border-2 border-dashed ${
          isDragActive ? "border-primary" : "border-muted"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Upload className="h-5 w-5" />
          <p className="text-sm text-center px-4">
            {isDragActive
              ? "Drop images here"
              : "Drag images or click to upload (multiple allowed)"}
          </p>
        </div>
      </Card>

      {previewUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <div
                className="h-32 w-full rounded-md overflow-hidden cursor-pointer relative"
                onClick={() => onImageClick(url)}
              >
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(index);
                }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ImageModal = ({ imageUrl, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="destructive"
            size="icon"
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt="Enlarged preview"
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

const SubmitPrice = () => {
  const form = useForm({
    defaultValues: {
      initials: "",
      crop: "",
      date: new Date(),
      price: "",
      images: [],
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = form;

  const [previewUrls, setPreviewUrls] = useState([]);
  const [open, setOpen] = useState(false);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading for 1.5s
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Load sample recent submissions
  useEffect(() => {
    const samples = [
      { crop: "Maize", price: 120, location: "Kano", date: "2023-10-15" },
      { crop: "Rice", price: 160, location: "Lagos", date: "2023-10-14" },
      { crop: "Wheat", price: 130, location: "Kaduna", date: "2023-10-13" },
      { crop: "Soybeans", price: 190, location: "Oyo", date: "2023-10-12" },
    ];
    setRecentSubmissions(samples);
  }, []);

  const handleFilesSelect = useCallback(
    (files) => {
      const newImages = [...form.getValues().images, ...files];
      setValue("images", newImages);

      // Create preview URLs
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    },
    [setValue, form]
  );

  const handleRemoveImage = useCallback(
    (index) => {
      const currentImages = [...form.getValues().images];
      const currentPreviewUrls = [...previewUrls];

      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(currentPreviewUrls[index]);

      // Remove the file and preview
      currentImages.splice(index, 1);
      currentPreviewUrls.splice(index, 1);

      setValue("images", currentImages);
      setPreviewUrls(currentPreviewUrls);
    },
    [form, previewUrls, setValue]
  );

  const handleImageClick = (url) => {
    setCurrentImage(url);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setCurrentImage(null);
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", {
      ...data,
      date: format(data.date, "yyyy-MM-dd"),
    });
    setOpen(false);

    // Clean up preview URLs
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    form.reset({
      initials: "",
      crop: "",
      date: new Date(),
      price: "",
      images: [],
    });
    setPreviewUrls([]);
  };

  // Close image modal when drawer is closed
  useEffect(() => {
    if (!open) {
      closeImageModal();
    }
  }, [open]);

  if (loading) {
    return (
      <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
        {/* Hero Skeleton */}
        <div className="text-center py-12 px-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl mb-12 border">
          <Skeleton className="mx-auto h-10 w-2/3 mb-4" />
          <Skeleton className="mx-auto h-6 w-1/2 mb-8" />
          <Skeleton className="mx-auto h-12 w-48 rounded-lg" />
        </div>

        {/* Features Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6">
              <Skeleton className="mx-auto h-12 w-12 rounded-full mb-4" />
              <Skeleton className="h-6 w-2/3 mx-auto mb-2" />
              <Skeleton className="h-4 w-full mx-auto" />
            </div>
          ))}
        </div>

        {/* How It Works Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-8 w-1/3 mx-auto mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6">
                <Skeleton className="mx-auto h-10 w-10 rounded-full mb-4" />
                <Skeleton className="h-5 w-1/2 mx-auto mb-2" />
                <Skeleton className="h-4 w-full mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions & Benefits Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Skeleton className="h-7 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 mb-2"
              >
                <Skeleton className="h-12 w-12 rounded-lg mr-4" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-16 ml-4" />
              </div>
            ))}
          </div>
          <div>
            <Skeleton className="h-7 w-1/2 mb-4" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center mb-3">
                <Skeleton className="h-5 w-5 rounded-full mr-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
            <div className="mt-8 text-center">
              <Skeleton className="mx-auto h-10 w-40 rounded-lg mb-2" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
          </div>
        </div>

        {/* Call to Action Skeleton */}
        <div className="mt-16 text-center py-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border">
          <Skeleton className="mx-auto h-8 w-1/3 mb-4" />
          <Skeleton className="mx-auto h-5 w-1/2 mb-8" />
          <Skeleton className="mx-auto h-12 w-48 rounded-lg" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      {/* Add custom scrollbar styles */}
      <style>{customScrollbarStyles}</style>

      {/* Image Modal */}
      {isImageModalOpen && (
        <ImageModal
          imageUrl={currentImage}
          isOpen={isImageModalOpen}
          onClose={closeImageModal}
        />
      )}

      {/* Hero Section */}
      <div className="text-center py-12 px-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl mb-12 border">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
          Agricultural Price Transparency Platform
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Help create a fair agricultural marketplace by sharing real-time crop
          prices from your local market. Your contributions empower farmers and
          buyers with accurate market information.
        </p>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              size="lg"
              className="px-8 py-6 text-lg transition-all duration-300 transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                boxShadow: "0 4px 14px rgba(5, 150, 105, 0.4)",
                color: "white",
                fontWeight: "600",
                letterSpacing: "0.5px",
                borderRadius: "12px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              Submit Price Report
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh] w-full">
            <div className="absolute right-4 top-4">
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </DrawerClose>
            </div>

            <div className="mx-auto w-full max-w-2xl p-6 overflow-y-auto custom-scrollbar">
              <DrawerHeader className="text-left">
                <DrawerTitle className="text-2xl font-semibold text-gray-900 mb-4">
                  New Price Submission
                </DrawerTitle>
              </DrawerHeader>

              <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="initials">Your Initials</Label>
                      <Controller
                        name="initials"
                        control={control}
                        rules={{
                          required: "Initials are required",
                          maxLength: {
                            value: 3,
                            message: "Maximum 3 characters",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="JM"
                            className="w-full"
                            maxLength={3}
                          />
                        )}
                      />
                      {errors.initials && (
                        <p className="text-sm text-destructive">
                          {errors.initials.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Date of Observation</Label>
                      <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Crop Type</Label>
                    <Controller
                      name="crop"
                      control={control}
                      rules={{ required: "Please select a crop" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select crop" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {crops.map((crop) => (
                              <SelectItem
                                key={crop.id}
                                value={crop.id.toString()}
                              >
                                {crop.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.crop && (
                      <p className="text-sm text-destructive">
                        {errors.crop.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Price (₦ per kg)</Label>
                    <Controller
                      name="price"
                      control={control}
                      rules={{
                        required: "Price is required",
                        min: { value: 1, message: "Price must be positive" },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter market price"
                          className="w-full"
                        />
                      )}
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <ImageUpload
                    onFilesSelect={handleFilesSelect}
                    previewUrls={previewUrls}
                    onRemove={handleRemoveImage}
                    onImageClick={handleImageClick}
                  />

                  <DrawerFooter className="pt-6">
                    <div className="flex gap-4 justify-end">
                      <DrawerClose asChild>
                        <Button
                          variant="outline"
                          className="px-6 py-3 font-semibold border-gray-300 hover:bg-gray-50"
                        >
                          Cancel
                        </Button>
                      </DrawerClose>
                      <Button
                        type="submit"
                        className="px-6 py-3 font-semibold"
                        style={{
                          background:
                            "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                          boxShadow: "0 4px 14px rgba(5, 150, 105, 0.4)",
                          color: "white",
                          fontWeight: "600",
                          letterSpacing: "0.5px",
                          borderRadius: "8px",
                          border: "2px solid rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        Submit Report
                      </Button>
                    </div>
                  </DrawerFooter>
                </form>
              </FormProvider>
            </div>
          </DrawerContent>
        </Drawer>

        <p className="mt-4 text-sm text-muted-foreground">
          Click the button above to contribute current market prices
        </p>
      </div>

      {/* Value Proposition Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="bg-gray-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: 1,
              title: "Visit Market",
              desc: "Go to your local agricultural market",
            },
            {
              step: 2,
              title: "Record Prices",
              desc: "Note current prices for different crops",
            },
            {
              step: 3,
              title: "Submit Report",
              desc: "Fill out our simple submission form",
            },
            {
              step: 4,
              title: "Help Farmers",
              desc: "Your data helps farmers get fair prices",
            },
          ].map((item, index) => (
            <Card key={index} className="text-center p-6">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Latest verified market prices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 rounded-lg w-12 h-12 flex items-center justify-center mr-4">
                      <span className="font-bold">₦{submission.price}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{submission.crop}</p>
                      <p className="text-sm text-muted-foreground">
                        {submission.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {submission.date}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card className="bg-amber-50 border-amber-100">
          <CardHeader>
            <CardTitle>Why Your Contribution Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Info className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  Helps farmers negotiate better prices for their produce
                </span>
              </li>
              <li className="flex items-start">
                <Info className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Provides buyers with accurate market information</span>
              </li>
              <li className="flex items-start">
                <Info className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Identifies price trends and market opportunities</span>
              </li>
              <li className="flex items-start">
                <Info className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Supports agricultural policy decisions</span>
              </li>
              <li className="flex items-start">
                <Info className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  Creates a more transparent and efficient marketplace
                </span>
              </li>
            </ul>

            <div className="mt-8 text-center">
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <Button
                    className="px-6 py-3 font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                      boxShadow: "0 4px 14px rgba(5, 150, 105, 0.4)",
                      color: "white",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      borderRadius: "8px",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    Contribute Now
                  </Button>
                </DrawerTrigger>
              </Drawer>
              <p className="text-sm text-muted-foreground mt-2">
                Every submission makes a difference
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center py-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of contributors helping create price transparency in
          agricultural markets
        </p>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              size="lg"
              className="px-8 py-6 text-lg transition-all duration-300 transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                boxShadow: "0 4px 14px rgba(5, 150, 105, 0.4)",
                color: "white",
                fontWeight: "600",
                letterSpacing: "0.5px",
                borderRadius: "12px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              Submit Price Report
            </Button>
          </DrawerTrigger>
        </Drawer>
      </div>
    </main>
  );
};

export default SubmitPrice;
