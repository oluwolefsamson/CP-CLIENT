import React, { useState, useEffect } from "react";
import {
  MapPinIcon,
  ClockIcon,
  HeartIcon,
  StarIcon,
  UserCircleIcon,
  MapIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Bike } from "lucide-react";
import { Skeleton } from "../../components/ui/skeleton";

const NearbyMarkets = () => {
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleShowRoute = (market) => {
    setSelectedMarket(market);
    setIsMapOpen(true);
  };

  const sampleMarkets = [
    {
      id: 1,
      name: "Green Valley Farmers Market",
      address: "123 Garden Lane, Lagos",
      distance: "1.2km",
      status: "open",
      openingHours: "Today 8AM - 6PM",
      rating: "4.8",
      reviews: "245",
      farmers: "12+",
      recentVisitors: [
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2",
        "https://i.pravatar.cc/40?img=3",
      ],
      delivery: "Bike delivery available",
      vibe: "Family-friendly • Live music",
    },
    {
      id: 2,
      name: "Urban Harvest Market",
      address: "45 City Center Plaza, Lagos",
      distance: "2.8km",
      status: "closing_soon",
      openingHours: "Closes at 5PM",
      rating: "4.6",
      reviews: "182",
      farmers: "8+",
      recentVisitors: [
        "https://i.pravatar.cc/40?img=4",
        "https://i.pravatar.cc/40?img=5",
      ],
      delivery: "In-store pickup",
      vibe: "Artisan crafts • Vegan options",
    },
    {
      id: 3,
      name: "Green park",
      address: "123 Garden Lane, Abuja",
      distance: "4.2km",
      status: "open",
      openingHours: "Today 8AM - 6PM",
      rating: "4.8",
      reviews: "245",
      farmers: "12+",
      recentVisitors: [
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2",
        "https://i.pravatar.cc/40?img=3",
      ],
      delivery: "Bike delivery available",
      vibe: "Family-friendly • Live music",
    },
    {
      id: 4,
      name: "Green Market",
      address: "Potiskum, Nangere. Yobe",
      distance: "1.2km",
      status: "open",
      openingHours: "Today 8AM - 6PM",
      rating: "4.8",
      reviews: "245",
      farmers: "12+",
      recentVisitors: [
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2",
        "https://i.pravatar.cc/40?img=3",
      ],
      delivery: "Bike delivery available",
      vibe: "Family-friendly • Live music",
    },
  ];
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 my-2 mx-4">
      <div className="flex items-center gap-3 mb-8">
        <MapPinIcon className="w-7 h-7 text-green-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Fresh Markets Nearby
          </h2>
          <p className="text-gray-600 mt-1">
            Discover local farmers and artisans in your community
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="p-5 bg-green-50/20 rounded-xl border border-green-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex items-center gap-1.5">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-5 w-12 rounded-full" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="space-y-2">
                      <Skeleton className="h-16 rounded-lg" />
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm mb-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/3" />
                </div>

                <div className="mt-4 pt-4 border-t border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((item) => (
                        <Skeleton key={item} className="h-8 w-8 rounded-full" />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>

                <Skeleton className="h-12 w-full rounded-lg mt-4" />
              </div>
            ))
          : sampleMarkets.map((market) => (
              <div
                key={market.id}
                className="p-5 bg-green-50/20 rounded-xl border border-green-100 hover:bg-green-50/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {market.name}
                    </h3>
                    <div className="text-sm text-gray-600 mt-2 flex items-center gap-1.5">
                      <MapPinIcon className="w-4 h-4 text-green-500" />
                      <span>{market.address}</span>
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {market.distance} away
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-green-600">
                    <HeartIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <ClockIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium capitalize">
                        {market.status.replace("_", " ")}
                      </p>
                      <p className="text-xs text-green-500">
                        {market.openingHours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Bike className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{market.delivery}</p>
                      <p className="text-xs text-green-500">Delivery options</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{market.rating}</span>
                    <span>({market.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserCircleIcon className="w-4 h-4 text-green-500" />
                    <span>{market.farmers} local farmers</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {market.recentVisitors.map((visitor, index) => (
                        <img
                          key={index}
                          src={visitor}
                          alt="Recent visitor"
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      Recently visited by community members
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleShowRoute(market)}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Show Route on Map
                  <MapIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
      </div>

      {isMapOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Route to {selectedMarket?.name}
              </h3>
              <button
                onClick={() => setIsMapOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-4">
              <iframe
                className="w-full h-full rounded-lg"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/directions?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&origin=Current+Location&destination=${encodeURIComponent(selectedMarket?.address)}`}
              />
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <ClockIcon className="w-4 h-4 text-green-600" />
                  {selectedMarket?.openingHours}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPinIcon className="w-4 h-4 text-green-600" />
                  {selectedMarket?.distance} away
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyMarkets;
