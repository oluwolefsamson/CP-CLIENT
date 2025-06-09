import * as React from "react";
import { Badge } from "./badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const overviewAlertData = [
  {
    id: 1,
    crop: "Maize",
    type: "above",
    status: "active",
    threshold: 28500,
    market: "Lagos Main Market",
    lastTriggered: "2024-03-25",
  },
  {
    id: 2,
    crop: "Rice",
    type: "below",
    status: "active",
    threshold: 41500,
    market: "Kano Central Market",
  },
];

const overviewMarketData = [
  {
    id: 1,
    name: "Lagos Main Market",
    location: "Lagos, Nigeria",
    activeAlerts: 3,
    lastUpdate: "2024-03-25",
    status: "active",
  },
  {
    id: 2,
    name: "Kano Central Market",
    location: "Kano, Nigeria",
    activeAlerts: 2,
    lastUpdate: "2024-03-24",
    status: "active",
  },
];

export function CombinedOverviewTable() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Price Alerts Card */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Price Alerts</h3>
          <Link
            to="/dashboard/price-alert"
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            Manage Alerts <span className="text-lg">→</span>
          </Link>
        </div>
        <div className="p-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-600 py-3 px-4">
                    Crop
                  </TableHead>
                  <TableHead className="text-gray-600 px-4">Type</TableHead>
                  <TableHead className="text-gray-600 text-right px-4">
                    Threshold
                  </TableHead>
                  <TableHead className="text-gray-600 px-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overviewAlertData.map((alert) => (
                  <TableRow key={alert.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800 py-2 px-4">
                      {alert.crop}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      <Badge className="bg-gray-100 text-gray-700 capitalize px-2 py-1 rounded-md">
                        {alert.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-800 py-2 px-4">
                      ₦{alert.threshold.toLocaleString()}/100kg
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      <Badge
                        className={`px-2 py-1 rounded-md ${
                          alert.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {alert.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-3 p-3 text-sm text-gray-600 border-t border-gray-200 bg-gray-50">
              Showing {overviewAlertData.length} of {overviewAlertData.length}{" "}
              alerts
            </div>
          </div>
        </div>
      </div>

      {/* Tracked Markets Card */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Tracked Markets
          </h3>
          <Link
            to="/dashboard/tracked-markets"
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            Manage Markets <span className="text-lg">→</span>
          </Link>
        </div>
        <div className="p-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-600 py-3 px-4">
                    Market
                  </TableHead>
                  <TableHead className="text-gray-600 px-4">Location</TableHead>
                  <TableHead className="text-gray-600 px-4">Alerts</TableHead>
                  <TableHead className="text-gray-600 px-4">
                    Last Update
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overviewMarketData.map((market) => (
                  <TableRow key={market.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800 py-2 px-4">
                      {market.name}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {market.location}
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      <Badge className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                        {market.activeAlerts}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      {format(new Date(market.lastUpdate), "dd MMM yyyy")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-3 p-3 text-sm text-gray-600 border-t border-gray-200 bg-gray-50">
              Showing {overviewMarketData.length} of {overviewMarketData.length}{" "}
              markets
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
