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
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <Tabs defaultValue="alerts">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
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

        <TabsContent value="alerts">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600">Crop</TableHead>
                <TableHead className="text-gray-600">Type</TableHead>
                <TableHead className="text-gray-600">Threshold</TableHead>
                <TableHead className="text-gray-600">Status</TableHead>
                <TableHead className="text-right text-gray-600">
                  Market
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overviewAlertData.map((alert) => (
                <TableRow key={alert.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-800">
                    {alert.crop}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-gray-100 text-gray-700 capitalize">
                      {alert.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-800">
                    ₦{alert.threshold.toLocaleString()}/100kg
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        alert.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-gray-600">
                    {alert.market}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="markets">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600">Market</TableHead>
                <TableHead className="text-gray-600">Location</TableHead>
                <TableHead className="text-gray-600">Active Alerts</TableHead>
                <TableHead className="text-gray-600">Last Update</TableHead>
                <TableHead className="text-right text-gray-600">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overviewMarketData.map((market) => (
                <TableRow key={market.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-800">
                    {market.name}
                  </TableCell>
                  <TableCell>{market.location}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-700">
                      {market.activeAlerts}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(market.lastUpdate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={
                        market.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {market.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
