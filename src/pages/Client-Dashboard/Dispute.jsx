import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  AlertCircle,
  MoreVertical,
  XCircle,
  Wheat,
  User,
  MessageCircle,
  FileImage,
  TrendingUp,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../components/ui/dialog";
import DisputeImg from "../../assets/images/DisputeImg/receipt.jpg";
import { Skeleton } from "../../components/ui/skeleton";

export default function DisputePage() {
  const disputes = [
    {
      id: "D-1024",
      crop: "Rice",
      market: "Kano Central Market",
      price: "₦35,000/bag",
      reportedBy: "You",
      disputedBy: "Fatima Bello",
      reason: "Price outdated - current price is ₦38,000",
      status: "pending",
      date: "2025-06-08",
      proofPhoto: "/rice-price.jpg",
      userPhoto: "/user-female1.jpg", // Added user photo
    },
    {
      id: "D-1023",
      crop: "Tomatoes",
      market: "Lagos Mile 12 Market",
      price: "₦15,000/crate",
      reportedBy: "You",
      disputedBy: "Chika Nwosu",
      reason: "Wrong measurement unit (should be per basket)",
      status: "resolved",
      date: "2025-06-07",
      proofPhoto: "/tomatoes-board.jpg",
      userPhoto: "/user-female2.jpg", // Added user photo
    },
    {
      id: "D-1022",
      crop: "Maize",
      market: "Kaduna Central Market",
      price: "₦28,500/bag",
      reportedBy: "You",
      disputedBy: "Amina Mohammed",
      reason: "Seasonal discount not reflected",
      status: "rejected",
      date: "2025-06-05",
      proofPhoto: "/maize-price.jpg",
      userPhoto: "/user-female3.jpg", // Added user photo
    },
  ];

  // For demo, always show the first dispute as selected
  const selectedDispute = disputes[0];

  // Modal state
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    crop: "",
    market: "",
    price: "",
    reason: "",
    proofPhoto: null,
  });

  // Skeleton loading state
  const [loading, setLoading] = useState(true);

  // Simulate loading (remove in production, use real data loading)
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Simple form handler (for demo)
  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Here you would send the form data to your backend
    setOpen(false);
    setForm({ crop: "", market: "", price: "", reason: "", proofPhoto: null });
    // Optionally show a toast or update the disputes list
  }

  if (loading) {
    return (
      <div className="w-full px-2 sm:px-4 md:px-8 py-6 md:py-8 space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-60" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-10 w-48" />
        </div>
        {/* Table Skeleton */}
        <Card className="mb-10 bg-white border-0 shadow-lg rounded-2xl w-full">
          <CardHeader className="pb-2 px-2 sm:px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <Skeleton className="h-6 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full">
                <thead>
                  <tr>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <th key={i}>
                        <Skeleton className="h-4 w-24 my-2" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 4 }).map((_, row) => (
                    <tr key={row}>
                      {Array.from({ length: 7 }).map((_, col) => (
                        <td key={col} className="px-2 py-2">
                          <Skeleton className="h-4 w-20" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        {/* Dispute Detail Skeleton */}
        <Card className="border-0 shadow-none bg-transparent mt-8">
          <CardHeader className="p-0 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div>
                  <Skeleton className="h-8 w-40 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <Skeleton className="h-8 w-20 rounded" />
                <Skeleton className="h-8 w-24 rounded" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Details */}
              <section className="col-span-1 bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col min-h-[320px]">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="flex gap-2 mt-6">
                  <Skeleton className="h-10 w-32 rounded" />
                  <Skeleton className="h-10 w-32 rounded" />
                </div>
              </section>
              {/* Reason & Market Context */}
              <div className="col-span-1 flex flex-col gap-6">
                <section className="bg-yellow-50 border-l-4 border-yellow-400 rounded-2xl p-6 shadow-sm">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-32" />
                </section>
                <section className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 space-y-3">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </section>
              </div>
              {/* Price Evidence */}
              <section className="col-span-1 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col p-0 overflow-hidden">
                <div className="p-6 pb-0">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="relative flex-1 flex items-center justify-center bg-gray-50 min-h-[224px]">
                  <Skeleton className="h-44 w-full" />
                </div>
                <div className="p-4 bg-gray-50 border-t">
                  <Skeleton className="h-4 w-32" />
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 py-6 md:py-8">
      {/* Modal for creating a dispute */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Raise New Dispute</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Crop</label>
              <Input
                name="crop"
                value={form.crop}
                onChange={handleChange}
                placeholder="e.g. Rice"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Market</label>
              <Input
                name="market"
                value={form.market}
                onChange={handleChange}
                placeholder="e.g. Kano Central Market"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Reported Price
              </label>
              <Input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. ₦35,000/bag"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reason</label>
              <Textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Describe the issue"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Photo Evidence
              </label>
              <div className="flex items-center gap-4">
                <Input
                  name="proofPhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                {/* Preview placeholder */}
                {form.proofPhoto ? (
                  <img
                    src={URL.createObjectURL(form.proofPhoto)}
                    alt="Preview"
                    className="h-16 w-16 rounded object-cover border"
                  />
                ) : (
                  <div className="border border-dashed rounded-xl w-16 h-16 flex items-center justify-center bg-gray-50">
                    <FileImage className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Dispute</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Responsive header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <AlertCircle className="text-amber-500 h-7 w-7" />
            My Price Disputes
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            View and manage all price disputes you have raised or are involved
            in.
          </p>
        </div>
        <Button
          variant="default"
          className="flex items-center gap-2 shadow w-full sm:w-auto"
          onClick={() => setOpen(true)}
        >
          <AlertCircle className="h-5 w-5" />
          Raise New Dispute
        </Button>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <Card className="mb-10 bg-white border-0 shadow-lg rounded-2xl w-full">
          <CardHeader className="pb-2 px-2 sm:px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <CardTitle className="text-base md:text-lg font-semibold text-gray-800">
                Dispute History
              </CardTitle>
              <TabsList className="bg-gray-50 rounded-xl p-1 flex flex-wrap gap-2">
                <TabsTrigger
                  value="all"
                  className="rounded-lg px-3 py-1 text-sm md:text-base"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="rounded-lg px-3 py-1 text-sm md:text-base"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="resolved"
                  className="rounded-lg px-3 py-1 text-sm md:text-base"
                >
                  Resolved
                </TabsTrigger>
                <TabsTrigger
                  value="rejected"
                  className="rounded-lg px-3 py-1 text-sm md:text-base"
                >
                  Rejected
                </TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            {/* All */}
            <TabsContent value="all">
              <div className="overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[100px] text-xs md:text-base">
                        Crop
                      </TableHead>
                      <TableHead className="min-w-[120px] text-xs md:text-base">
                        Market
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Price
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Reason
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Status
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Date
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {disputes.map((dispute) => (
                      <TableRow
                        key={dispute.id}
                        className="hover:bg-gray-50 text-xs md:text-base"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Wheat className="h-5 w-5 text-green-600" />
                            <span className="font-medium">{dispute.crop}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{dispute.market}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-gray-900">
                            {dispute.price}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {dispute.reason}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              dispute.status === "pending"
                                ? "secondary"
                                : dispute.status === "resolved"
                                  ? "success"
                                  : "destructive"
                            }
                            className="capitalize"
                          >
                            {dispute.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-gray-500">
                            {new Date(dispute.date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Contact User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileImage className="mr-2 h-4 w-4" />
                                View Evidence
                              </DropdownMenuItem>
                              {dispute.status === "pending" && (
                                <DropdownMenuItem className="text-red-600">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Cancel Dispute
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            {/* Pending */}
            <TabsContent value="pending">
              <div className="overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[100px] text-xs md:text-base">
                        Crop
                      </TableHead>
                      <TableHead className="min-w-[120px] text-xs md:text-base">
                        Market
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Price
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Reason
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Status
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Date
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {disputes
                      .filter((d) => d.status === "pending")
                      .map((dispute) => (
                        <TableRow
                          key={dispute.id}
                          className="hover:bg-gray-50 text-xs md:text-base"
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Wheat className="h-5 w-5 text-green-600" />
                              <span className="font-medium">
                                {dispute.crop}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span>{dispute.market}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-gray-900">
                              {dispute.price}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {dispute.reason}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                dispute.status === "pending"
                                  ? "secondary"
                                  : dispute.status === "resolved"
                                    ? "success"
                                    : "destructive"
                              }
                              className="capitalize"
                            >
                              {dispute.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-gray-500">
                              {new Date(dispute.date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <MessageCircle className="mr-2 h-4 w-4" />
                                  Contact User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileImage className="mr-2 h-4 w-4" />
                                  View Evidence
                                </DropdownMenuItem>
                                {dispute.status === "pending" && (
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Cancel Dispute
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            {/* Resolved */}
            <TabsContent value="resolved">
              <div className="overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[100px] text-xs md:text-base">
                        Crop
                      </TableHead>
                      <TableHead className="min-w-[120px] text-xs md:text-base">
                        Market
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Price
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Reason
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Status
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Date
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {disputes
                      .filter((d) => d.status === "resolved")
                      .map((dispute) => (
                        <TableRow
                          key={dispute.id}
                          className="hover:bg-gray-50 text-xs md:text-base"
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Wheat className="h-5 w-5 text-green-600" />
                              <span className="font-medium">
                                {dispute.crop}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span>{dispute.market}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-gray-900">
                              {dispute.price}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {dispute.reason}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                dispute.status === "pending"
                                  ? "secondary"
                                  : dispute.status === "resolved"
                                    ? "success"
                                    : "destructive"
                              }
                              className="capitalize"
                            >
                              {dispute.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-gray-500">
                              {new Date(dispute.date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <MessageCircle className="mr-2 h-4 w-4" />
                                  Contact User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileImage className="mr-2 h-4 w-4" />
                                  View Evidence
                                </DropdownMenuItem>
                                {dispute.status === "pending" && (
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Cancel Dispute
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            {/* Rejected */}
            <TabsContent value="rejected">
              <div className="overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[100px] text-xs md:text-base">
                        Crop
                      </TableHead>
                      <TableHead className="min-w-[120px] text-xs md:text-base">
                        Market
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Price
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Reason
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Status
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Date
                      </TableHead>
                      <TableHead className="text-xs md:text-base">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {disputes
                      .filter((d) => d.status === "rejected")
                      .map((dispute) => (
                        <TableRow
                          key={dispute.id}
                          className="hover:bg-gray-50 text-xs md:text-base"
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Wheat className="h-5 w-5 text-green-600" />
                              <span className="font-medium">
                                {dispute.crop}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span>{dispute.market}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-gray-900">
                              {dispute.price}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {dispute.reason}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                dispute.status === "pending"
                                  ? "secondary"
                                  : dispute.status === "resolved"
                                    ? "success"
                                    : "destructive"
                              }
                              className="capitalize"
                            >
                              {dispute.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-gray-500">
                              {new Date(dispute.date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <MessageCircle className="mr-2 h-4 w-4" />
                                  Contact User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileImage className="mr-2 h-4 w-4" />
                                  View Evidence
                                </DropdownMenuItem>
                                {dispute.status === "pending" && (
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Cancel Dispute
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
      {/* Dispute Detail Card */}
      <Card className="border-0 shadow-none bg-transparent mt-8">
        <CardHeader className="p-0 mb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-green-100 p-2">
                <Wheat className="h-7 w-7 text-green-700" />
              </span>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-green-900 leading-tight">
                  {selectedDispute.crop} Dispute
                </h2>
                <div className="text-base md:text-lg text-gray-600 font-medium">
                  {selectedDispute.market}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <Badge
                variant="secondary"
                className="capitalize text-base px-3 py-1"
              >
                {selectedDispute.status}
              </Badge>
              <Badge className="text-base px-3 py-1">
                ID: {selectedDispute.id}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Dispute Details */}
            <section className="col-span-1 bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between min-h-[320px]">
              <div>
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                  <User className="h-5 w-5" />
                  Dispute Details
                </h3>
                <div className="space-y-2 text-base">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-500 w-32">
                      Market:
                    </span>
                    <span className="text-gray-900">
                      {selectedDispute.market}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-500 w-32">
                      Reported Price:
                    </span>
                    <span className="text-gray-900">
                      {selectedDispute.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-500 w-32">
                      Disputed By:
                    </span>
                    <span className="flex items-center gap-2 text-gray-900">
                      <img
                        src={selectedDispute.userPhoto}
                        alt={selectedDispute.disputedBy}
                        className="w-7 h-7 rounded-full object-cover border"
                      />
                      {selectedDispute.disputedBy}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-500 w-32">
                      Date:
                    </span>
                    <span className="text-gray-900">
                      {new Date(selectedDispute.date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-base font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contact User
                </Button>
                {selectedDispute.status === "pending" && (
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2 text-base font-semibold"
                  >
                    <XCircle className="h-4 w-4" />
                    Cancel Dispute
                  </Button>
                )}
              </div>
            </section>

            {/* Center: Reason & Market Context */}
            <div className="col-span-1 flex flex-col gap-6">
              {/* Reason */}
              <section className="bg-yellow-50 border-l-4 border-yellow-400 rounded-2xl p-6 text-gray-900 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Reason
                </h3>
                <p className="text-base">{selectedDispute.reason}</p>
              </section>
              {/* Market Context */}
              <section className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 space-y-3">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Market Context
                </h3>
                <div className="flex justify-between text-base">
                  <span>Average Price (Kano):</span>
                  <span className="font-semibold">₦37,800</span>
                </div>
                <div className="flex justify-between text-base">
                  <span>7-Day Trend:</span>
                  <span className="text-green-600 font-semibold flex items-center">
                    ↑ 5.2% <TrendingUp className="h-4 w-4 ml-1" />
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span>Last Verified:</span>
                  <span>Today at 11:30 AM</span>
                </div>
              </section>
            </div>

            {/* Right: Price Evidence */}
            <section className="col-span-1 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col p-0 overflow-hidden">
              <div className="p-6 pb-0">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-lg">
                  <FileImage className="h-5 w-5" />
                  Price Evidence
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Photo submitted as proof
                </p>
              </div>
              <div className="relative flex-1 flex items-center justify-center bg-gray-50">
                <img
                  src={DisputeImg}
                  alt="Price verification"
                  className="w-full h-56 object-contain"
                />
                <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow">
                  <FileImage className="h-4 w-4 text-gray-700" />
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-xs text-gray-600">
                  Submitted by you on{" "}
                  {new Date(selectedDispute.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
