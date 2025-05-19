import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import bgImage from "../../assets/images/submit-bg.jpeg";

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
    <div className="mt-6">
      <label className="block mb-2 font-medium text-black">Upload Image</label>
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-md border border-black/50 bg-black/5 p-6 text-center transition-colors ${
          isDragActive ? "border-sky-400 bg-sky-100" : "hover:border-sky-400"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-black/70 text-sm">
          {isDragActive
            ? "Drop your image here..."
            : "Click or drag image to upload"}
        </p>
      </div>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="mt-4 max-h-48 w-auto mx-auto rounded-md object-contain"
        />
      )}
    </div>
  );
};

const FormContent = ({
  handleSubmit,
  onSubmit,
  control,
  register,
  errors,
  handleImageSelect,
  previewUrl,
}) => (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full max-w-md bg-white backdrop-blur-md rounded-xl p-8 shadow-lg"
  >
    <h1 className="text-3xl font-semibold text-black mb-8 text-center drop-shadow">
      Submit Crop Price
    </h1>

    <div className="mb-6">
      <label className="block mb-1 font-medium text-black">Select Crop</label>
      <Controller
        name="crop"
        control={control}
        rules={{ required: "Please select a crop" }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className="w-full rounded border-b border-black/50 bg-transparent px-3 py-2 text-black placeholder-black/60 focus:outline-none focus:ring-1 focus:ring-sky-400"
              aria-label="Crop select"
            >
              <SelectValue placeholder="Choose a crop" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              {crops.map((crop) => (
                <SelectItem key={crop.id} value={crop.id.toString()}>
                  {crop.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.crop && (
        <p className="mt-1 text-sm text-red-600 font-medium">
          {errors.crop.message}
        </p>
      )}
    </div>

    <div className="mb-6">
      <label className="block mb-1 font-medium text-black">Price (₦)</label>
      <Input
        type="number"
        placeholder="Enter price"
        {...register("price", { required: "Price is required" })}
        className="w-full border-b border-black/50 bg-transparent px-3 py-2 text-black placeholder-black/60 focus:outline-none focus:ring-1 focus:ring-sky-400"
      />
      {errors.price && (
        <p className="mt-1 text-sm text-red-600 font-medium">
          {errors.price.message}
        </p>
      )}
    </div>

    <ImageUpload onFileSelect={handleImageSelect} previewUrl={previewUrl} />

    <button
      type="submit"
      className="mt-8 w-full rounded bg-green-600 py-3 text-white font-semibold transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
      style={{
        borderRadius: "30px 0",
      }}
    >
      Submit
    </button>
  </form>
);

const SubmitPrice = () => {
  const form = useForm({
    defaultValues: {
      crop: "",
      price: "",
      image: null,
    },
  });

  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const [previewUrl, setPreviewUrl] = useState(null);

  const selectedCropId = watch("crop");

  useEffect(() => {
    const selected = crops.find((c) => c.id.toString() === selectedCropId);
    if (selected) {
      setValue("price", selected.price);
    }
  }, [selectedCropId, setValue]);

  const handleImageSelect = (file) => {
    setValue("image", file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/5 z-0" />
      <FormProvider {...form}>
        <FormContent
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          control={control}
          register={register}
          errors={errors}
          handleImageSelect={handleImageSelect}
          previewUrl={previewUrl}
        />
      </FormProvider>
    </main>
  );
};

export default SubmitPrice;
