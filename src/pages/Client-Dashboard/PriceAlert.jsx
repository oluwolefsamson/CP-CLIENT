import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import bgImage from "../../assets/images/submit-bg.jpeg";

const PriceAlert = () => {
  const crops = [
    { id: 1, name: "Maize" },
    { id: 2, name: "Wheat" },
    { id: 3, name: "Rice" },
  ];

  const [selectedCrop, setSelectedCrop] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [alerts, setAlerts] = useState([]);

  const handleAddAlert = () => {
    const crop = crops.find((c) => c.id.toString() === selectedCrop);
    if (!crop || !condition || !price) return;

    setAlerts([
      ...alerts,
      {
        id: Date.now(),
        cropName: crop.name,
        condition,
        price,
      },
    ]);

    // Reset form
    setSelectedCrop("");
    setCondition("");
    setPrice("");
  };

  const handleRemoveAlert = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <div
      className="min-h-screen py-10 px-4 flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card className="w-full max-w-3xl bg-white shadow-lg p-6 rounded-lg backdrop-blur-md bg-opacity-90">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Price Alerts</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Form Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="flex-1 bg-white">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {crops.map((crop) => (
                  <SelectItem key={crop.id} value={crop.id.toString()}>
                    {crop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="w-[130px] bg-white">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="above">Above</SelectItem>
                <SelectItem value="below">Below</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-[150px] flex-shrink-0 bg-white"
            />

            <Button
              variant="outline"
              className="whitespace-nowrap"
              onClick={handleAddAlert}
            >
              Add Alert
            </Button>
          </div>

          {/* Active Alerts Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-center">Active Alerts</h3>
            <div className="space-y-2">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100"
                  >
                    <div>
                      <div className="font-medium">{alert.cropName}</div>
                      <div className="text-sm text-muted-foreground">
                        Notify when price {alert.condition} ₦
                        {Number(alert.price).toLocaleString()}/bag
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleRemoveAlert(alert.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500">
                  No alerts added yet.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceAlert;
