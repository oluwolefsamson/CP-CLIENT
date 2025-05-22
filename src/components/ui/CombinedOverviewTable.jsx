// src/components/ui/combined-overview-table.tsx
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
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
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <Tabs defaultValue="alerts">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-gray-200">
          <TabsList className="bg-gray-100">
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-sm px-3 py-1"
            >
              Price Alerts
            </TabsTrigger>
            <TabsTrigger
              value="markets"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-sm px-3 py-1"
            >
              Tracked Markets
            </TabsTrigger>
          </TabsList>

          <Link
            to="/dashboard/price-alert"
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            Manage All <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Price Alerts Table */}
        <TabsContent value="alerts">
          <div className="p-4">
            <Table className="min-w-[600px]">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-600 py-3">Crop</TableHead>
                  <TableHead className="text-gray-600">Type</TableHead>
                  <TableHead className="text-gray-600 text-right">
                    Threshold
                  </TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-gray-600 text-right">
                    Market
                  </TableHead>
                  <TableHead className="text-gray-600 text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overviewAlertData.map((alert) => (
                  <TableRow key={alert.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800 py-2">
                      {alert.crop}
                    </TableCell>
                    <TableCell className="py-2">
                      <Badge className="bg-gray-100 text-gray-700 capitalize px-2 py-1 rounded-md">
                        {alert.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-800 py-2">
                      ₦{alert.threshold.toLocaleString()}/100kg
                    </TableCell>
                    <TableCell className="py-2">
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
                    <TableCell className="text-right text-gray-600 py-2">
                      {alert.market}
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <Link
                        to="#"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-3 text-sm text-gray-600">
              Showing 02+00 of {overviewAlertData.length}
            </div>
          </div>
        </TabsContent>

        {/* Tracked Markets Table */}
        <TabsContent value="markets">
          <div className="p-4">
            <Table className="min-w-[600px]">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-600 py-3">Market</TableHead>
                  <TableHead className="text-gray-600">Location</TableHead>
                  <TableHead className="text-gray-600">Alerts</TableHead>
                  <TableHead className="text-gray-600">Last Update</TableHead>
                  <TableHead className="text-gray-600 text-right">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-600 text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overviewMarketData.map((market) => (
                  <TableRow key={market.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800 py-2">
                      {market.name}
                    </TableCell>
                    <TableCell className="py-2">{market.location}</TableCell>
                    <TableCell className="py-2">
                      <Badge className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                        {market.activeAlerts}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2">
                      {format(new Date(market.lastUpdate), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <Badge
                        className={`px-2 py-1 rounded-md ${
                          market.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {market.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <Link
                        to="#"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-3 text-sm text-gray-600">
              Showing 02+00 of {overviewMarketData.length}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
