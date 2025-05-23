import React, { useState } from "react";
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
import { Card } from "../../components/ui/card";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";

const crops = [
  { id: 1, name: "Maize", price: 100 },
  { id: 2, name: "Rice", price: 150 },
  { id: 3, name: "Wheat", price: 120 },
];

const ImageUpload = ({ onFileSelect, previewUrl }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
  });

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="picture">Market Receipt Photo</Label>
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
            {isDragActive ? "Drop image here" : "Drag image or click to upload"}
          </p>
        </div>
      </Card>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="mt-2 h-32 w-auto rounded-md object-cover"
        />
      )}
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
      image: null,
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = form;

  const [previewUrl, setPreviewUrl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleImageSelect = (file) => {
    setValue("image", file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", {
      ...data,
      date: format(data.date, "yyyy-MM-dd"),
    });
    setOpen(false);
    form.reset();
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Crop Price Submission
        </h1>
        <p className="text-muted-foreground">
          Help us keep the agricultural market transparent by submitting current
          crop prices from your local market. Your contributions benefit farmers
          and buyers across the region.
        </p>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="lg">Submit Price Report</Button>
        </DrawerTrigger>

        <DrawerContent className="max-h-[90vh]">
          <div className="absolute left-1/2 top-2 -translate-x-1/2">
            <div className="h-1.5 w-12 rounded-full bg-gray-400" />
          </div>

          <div className="mx-auto w-full max-w-2xl p-6 overflow-y-auto">
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-2xl font-semibold text-gray-900 mb-4 ">
                New Price Submission
              </DrawerTitle>
            </DrawerHeader>

            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
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
                        <SelectContent>
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
                  onFileSelect={handleImageSelect}
                  previewUrl={previewUrl}
                />

                <DrawerFooter className="pt-6">
                  <div className="flex gap-4 justify-end">
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    <Button type="submit">Submit Report</Button>
                  </div>
                </DrawerFooter>
              </form>
            </FormProvider>
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
};

export default SubmitPrice;
