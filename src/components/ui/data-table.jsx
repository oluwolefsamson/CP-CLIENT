import * as React from "react";
import { toast } from "sonner";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ColumnsIcon,
  GripVerticalIcon,
  LoaderIcon,
  MoreVerticalIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { z } from "zod";
import { Toaster } from "sonner";

// UI Components
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import clsx from "clsx";
import { Calendar as CalendarIcon } from "lucide-react";
import { Edit as EditIcon } from "lucide-react";
import { Copy as CopyIcon, Activity as ActivityIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";

export const schema = z.object({
  id: z.number().positive().optional(),
  crop: z.string().min(1, "Crop type is required"),
  type: z.enum(["above", "below"]),
  status: z.enum(["active", "inactive", "pending"]).optional(),
  threshold: z.number().positive("Valid price required"),
  market: z.string().min(1, "Market required").optional(),
  lastTriggered: z.string().optional(),
});

const sampleData = [
  {
    id: 1,
    crop: "Maize",
    type: "above",
    status: "active",
    threshold: 25000,
    market: "Lagos Main Market",
    lastTriggered: "2024-03-15",
  },
  {
    id: 2,
    crop: "Rice",
    type: "below",
    status: "active",
    threshold: 42000,
    market: "Kano Central Market",
    lastTriggered: "2024-03-14",
  },
  {
    id: 3,
    crop: "Sorghum",
    type: "above",
    status: "inactive",
    threshold: 18000,
    market: "Kaduna Wholesale",
  },
];

const sampleMarkets = [
  {
    id: 1,
    name: "Lagos Main Market",
    location: "Lagos, Nigeria",
    activeAlerts: 3,
    lastUpdate: "2024-03-20",
    status: "active",
  },
  {
    id: 2,
    name: "Kano Central Market",
    location: "Kano, Nigeria",
    activeAlerts: 1,
    lastUpdate: "2024-03-19",
    status: "active",
  },
  {
    id: 3,
    name: "Abuja Wholesale",
    location: "Abuja, Nigeria",
    activeAlerts: 0,
    lastUpdate: "2024-03-18",
    status: "inactive",
  },
];

function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-gray-600 hover:bg-gray-100"
    >
      <GripVerticalIcon className="size-3.5" />
      <span className="sr-only">Reorder alert</span>
    </Button>
  );
}

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-green-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-700"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-700"
        />
      </div>
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "crop",
    header: "Crop",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-semibold text-green-800">
          {row.original.crop}
        </span>
        {row.original.market && (
          <Badge
            variant="outline"
            className="border-blue-200 text-blue-600 bg-blue-50"
          >
            {row.original.market}
          </Badge>
        )}
      </div>
    ),
    size: 200,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Alert Type",
    cell: ({ row }) => (
      <Badge
        className={clsx(
          "capitalize font-medium",
          row.original.type === "above"
            ? "bg-green-100 text-green-700"
            : "bg-purple-100 text-purple-700"
        )}
      >
        {row.original.type}
      </Badge>
    ),
    size: 120,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={clsx(
          "gap-2 items-center",
          row.original.status === "active"
            ? "bg-emerald-100 text-emerald-700"
            : row.original.status === "pending"
              ? "bg-amber-100 text-amber-700"
              : "bg-gray-100 text-gray-700"
        )}
      >
        {row.original.status === "active" ? (
          <CheckCircle2Icon className="size-4" />
        ) : (
          <LoaderIcon className="size-4 animate-spin" />
        )}
        <span className="capitalize">{row.original.status}</span>
      </Badge>
    ),
    size: 140,
  },
  {
    accessorKey: "threshold",
    header: "Price Threshold",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-bold text-green-600">
          ₦{Number(row.original.threshold).toLocaleString()}
        </span>
        <span className="text-sm text-gray-500">/100kg</span>
      </div>
    ),
    size: 180,
  },
  {
    accessorKey: "lastTriggered",
    header: "Last Triggered",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-gray-600">
        <CalendarIcon className="size-4 text-gray-400" />
        {row.original.lastTriggered ? (
          new Date(row.original.lastTriggered).toLocaleDateString()
        ) : (
          <span className="text-gray-400">Never</span>
        )}
      </div>
    ),
    size: 160,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:bg-blue-50 hover:text-green-600"
          >
            <MoreVerticalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border-gray-200 bg-white w-48"
        >
          <DropdownMenuItem className="flex items-center gap-2 text-gray-700 hover:bg-blue-50">
            <EditIcon className="size-4" />
            Edit Alert
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-gray-700 hover:bg-blue-50">
            <CopyIcon className="size-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-gray-700 hover:bg-blue-50">
            <ActivityIcon className="size-4" />
            View Trends
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem className="flex items-center gap-2 text-red-600 hover:bg-red-50">
            <TrashIcon className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 60,
  },
];

function DraggableRow({ row }) {
  if (!row.original?.id) {
    console.error("Missing row ID:", row);
    return null;
  }

  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`${isDragging ? "bg-gray-100" : "hover:bg-gray-50"} border-b border-gray-200 bg-white`}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="py-2">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({ data = sampleData }) {
  const [openNewAlert, setOpenNewAlert] = React.useState(false);
  const [newAlert, setNewAlert] = React.useState({
    crop: "",
    type: "above",
    threshold: "",
    market: "",
  });
  const [formErrors, setFormErrors] = React.useState({});

  const [tableData, setTableData] = React.useState(() => {
    try {
      return data.map((item) =>
        schema.parse({
          id: item.id || Math.floor(Math.random() * 1000),
          crop: item.crop || "Unknown Crop",
          type: item.type || "above",
          status: item.status || "inactive",
          threshold: item.threshold || 0,
          market: item.market || "General Market",
          lastTriggered: item.lastTriggered,
        })
      );
    } catch (error) {
      console.error("Data validation error:", error);
      return [];
    }
  });

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, columnVisibility, rowSelection, pagination },
    getRowId: (row) => row.id.toString(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleCreateAlert = () => {
    try {
      const newId =
        tableData.length > 0 ? Math.max(...tableData.map((d) => d.id)) + 1 : 1;

      const alertData = schema.parse({
        id: newId,
        crop: newAlert.crop,
        type: newAlert.type,
        status: "active",
        threshold: Number(newAlert.threshold),
        market: newAlert.market || "All Markets",
      });

      setTableData((prev) => [alertData, ...prev]);
      setOpenNewAlert(false);
      setNewAlert({ crop: "", type: "above", threshold: "", market: "" });
      setFormErrors({});

      toast.success("Price alert created successfully", {
        description: `${alertData.crop} alert set for ₦${alertData.threshold.toLocaleString()}/100kg`,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        setFormErrors(errors);

        toast.error("Validation failed", {
          description: Object.values(errors).flat().join(", "),
        });
      }
    }
  };

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!active?.id || !over?.id) return;

    if (active.id !== over.id) {
      setTableData((data) => {
        const oldIndex = data.findIndex((d) => d.id === active.id);
        const newIndex = data.findIndex((d) => d.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return data;

        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="mx-4 lg:mx-6 pt-4">
      <Tabs defaultValue="alerts">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <TabsList className="bg-gray-50 border border-gray-200">
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:border-green-700 px-4 py-2"
            >
              Price Alerts
            </TabsTrigger>
            <TabsTrigger
              value="markets"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:border-green-700 px-4 py-2"
            >
              Tracked Markets
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                >
                  <ColumnsIcon className="mr-2 size-4" />
                  <span>Columns</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-gray-200 bg-white w-[200px]">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      className="focus:bg-gray-100 text-gray-700 text-sm"
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={openNewAlert} onOpenChange={setOpenNewAlert}>
              <DialogTrigger asChild>
                <Button className="bg-gray-800 hover:bg-gray-900 text-white">
                  <PlusIcon className="mr-2 size-4" />
                  New Alert
                </Button>
              </DialogTrigger>

              {/* Professional Bottom Drawer */}
              <div
                className={clsx(
                  "fixed inset-0 z-50 transition-all duration-300 ease-in-out",
                  openNewAlert
                    ? "bg-black/30 backdrop-blur-sm"
                    : "pointer-events-none opacity-0"
                )}
              >
                <div
                  className={clsx(
                    "fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl border-t border-gray-200 shadow-lg",
                    "transition-transform duration-300 ease-in-out transform",
                    openNewAlert ? "translate-y-0" : "translate-y-full"
                  )}
                  style={{ height: "80vh" }}
                >
                  <div className="flex flex-col h-full">
                    {/* Drawer Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-800">
                        Create New Price Alert
                      </h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpenNewAlert(false)}
                        className="text-gray-500 hover:bg-gray-100"
                      >
                        <XIcon className="size-5" />
                      </Button>
                    </div>

                    {/* Professional Layout: Image + Form */}
                    <div className="flex flex-1 overflow-hidden">
                      {/* Left Side - Illustration */}
                      <div className="hidden md:flex w-2/5 bg-gradient-to-br from-green-50 to-emerald-50 p-8 items-center justify-center">
                        <div className="max-w-md text-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500 mb-6">
                            <div className="text-center">
                              <div className="bg-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ActivityIcon className="text-green-700 size-8" />
                              </div>
                              <p className="font-medium text-gray-700">
                                Market Monitoring
                              </p>
                              <p className="text-sm mt-2 text-gray-500">
                                Visualize price trends and set alerts
                              </p>
                            </div>
                          </div>
                          <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="bg-green-100 rounded-full p-2">
                                <CheckCircle2Icon className="text-green-600 size-5" />
                              </div>
                              <p className="text-sm text-gray-700">
                                Monitor price movements in real-time
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="bg-green-100 rounded-full p-2">
                                <CheckCircle2Icon className="text-green-600 size-5" />
                              </div>
                              <p className="text-sm text-gray-700">
                                Get notified when prices hit your target
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="bg-green-100 rounded-full p-2">
                                <CheckCircle2Icon className="text-green-600 size-5" />
                              </div>
                              <p className="text-sm text-gray-700">
                                Make informed trading decisions
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Form */}
                      <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto">
                        <div className="max-w-md mx-auto">
                          <h3 className="text-lg font-semibold text-gray-800 mb-6">
                            Alert Configuration
                          </h3>

                          <div className="space-y-6">
                            <div>
                              <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Crop Type
                                <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Input
                                value={newAlert.crop}
                                onChange={(e) =>
                                  setNewAlert((prev) => ({
                                    ...prev,
                                    crop: e.target.value,
                                  }))
                                }
                                className="border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="e.g. Maize, Rice, Sorghum..."
                              />
                              {formErrors.crop && (
                                <p className="mt-1 text-sm text-red-500">
                                  {formErrors.crop[0]}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Alert Type
                                <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <Select
                                value={newAlert.type}
                                onValueChange={(value) =>
                                  setNewAlert((prev) => ({
                                    ...prev,
                                    type: value,
                                  }))
                                }
                              >
                                <SelectTrigger className="border-gray-300 text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                  <SelectValue placeholder="Select alert type" />
                                </SelectTrigger>
                                <SelectContent className="border-gray-200 bg-white shadow-lg">
                                  <SelectItem
                                    value="above"
                                    className="focus:bg-gray-100 py-3"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="bg-green-100 p-1 rounded">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4 text-green-600"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </div>
                                      <span>Price Above</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem
                                    value="below"
                                    className="focus:bg-gray-100 py-3"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="bg-purple-100 p-1 rounded">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4 text-purple-600"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </div>
                                      <span>Price Below</span>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Threshold Price (₦/100kg)
                                <span className="text-red-500 ml-1">*</span>
                              </Label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                  ₦
                                </span>
                                <Input
                                  type="number"
                                  value={newAlert.threshold}
                                  onChange={(e) =>
                                    setNewAlert((prev) => ({
                                      ...prev,
                                      threshold: e.target.value,
                                    }))
                                  }
                                  className="border-gray-300 pl-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                  placeholder="Enter target price"
                                />
                              </div>
                              {formErrors.threshold && (
                                <p className="mt-1 text-sm text-red-500">
                                  {formErrors.threshold[0]}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Market
                              </Label>
                              <Select>
                                <SelectTrigger className="border-gray-300 text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                                  <SelectValue placeholder="Select market" />
                                </SelectTrigger>
                                <SelectContent className="border-gray-200 bg-white shadow-lg">
                                  <SelectItem
                                    value="all"
                                    className="focus:bg-gray-100"
                                  >
                                    All Markets
                                  </SelectItem>
                                  <SelectItem
                                    value="lagos"
                                    className="focus:bg-gray-100"
                                  >
                                    Lagos Main Market
                                  </SelectItem>
                                  <SelectItem
                                    value="kano"
                                    className="focus:bg-gray-100"
                                  >
                                    Kano Central Market
                                  </SelectItem>
                                  <SelectItem
                                    value="abuja"
                                    className="focus:bg-gray-100"
                                  >
                                    Abuja Wholesale
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="mt-2 text-xs text-gray-500">
                                Leave blank to monitor all markets
                              </p>
                            </div>

                            <div className="pt-4">
                              <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Notification Method
                              </Label>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 hover:border-green-500">
                                  <Checkbox
                                    id="email-notify"
                                    className="border-gray-400"
                                  />
                                  <Label
                                    htmlFor="email-notify"
                                    className="text-gray-700"
                                  >
                                    Email
                                  </Label>
                                </div>
                                <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3 hover:border-green-500">
                                  <Checkbox
                                    id="sms-notify"
                                    className="border-gray-400"
                                  />
                                  <Label
                                    htmlFor="sms-notify"
                                    className="text-gray-700"
                                  >
                                    SMS
                                  </Label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Drawer Footer */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Need help?
                          </h4>
                          <p className="text-xs text-gray-500">
                            Contact support@agromonitor.com
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            onClick={() => setOpenNewAlert(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="bg-green-600 hover:bg-green-700 shadow-sm"
                            onClick={handleCreateAlert}
                          >
                            Create Price Alert
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </div>

        <TabsContent value="alerts">
          <div className="rounded-b-lg border border-green-100 bg-white">
            <div className="relative overflow-x-auto shadow-sm">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
              >
                <div className="min-w-[1000px]">
                  <Table className="w-full">
                    {tableData.length === 0 ? (
                      <TableBody>
                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center text-green-600 py-8"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <AlertCircleIcon className="size-8 text-green-400" />
                              No price alerts found
                              <span className="text-sm text-green-500">
                                Click "New Alert" to create your first price
                                monitor
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ) : (
                      <>
                        <TableHeader className="bg-white sticky top-0 z-10">
                          {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                              key={headerGroup.id}
                              className="border-b border-green-100"
                            >
                              {headerGroup.headers.map((header) => (
                                <TableHead
                                  key={header.id}
                                  style={{ width: header.getSize() }}
                                  className="text-gray-400 text-md font-bold py-3 bg-white"
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </TableHead>
                              ))}
                            </TableRow>
                          ))}
                        </TableHeader>
                        <TableBody>
                          <SortableContext
                            items={tableData.map((d) => d.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            {table.getRowModel().rows.map((row) => (
                              <DraggableRow key={row.id} row={row} />
                            ))}
                          </SortableContext>
                        </TableBody>
                      </>
                    )}
                  </Table>
                </div>
              </DndContext>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white border-t border-green-100">
            <div className="text-sm text-green-600">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} alerts selected
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Label className="text-green-700">Rows per page</Label>
                <Select
                  value={pagination.pageSize.toString()}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                >
                  <SelectTrigger className="w-20 border-green-200 text-green-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-green-100 bg-white">
                    {[10, 20, 30].map((size) => (
                      <SelectItem
                        key={size}
                        value={size.toString()}
                        className="focus:bg-green-50/30 text-green-700"
                      >
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="border-green-200 text-green-700 hover:bg-green-50/20"
                >
                  <ChevronLeftIcon className="size-4" />
                </Button>
                <span className="text-green-600">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="border-green-200 text-green-700 hover:bg-green-50/20"
                >
                  <ChevronRightIcon className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="markets">
          <div className="rounded-b-lg border border-green-100 bg-white p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-800">
                Tracked Markets
              </h3>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <PlusIcon className="mr-2 size-4" />
                Add Market
              </Button>
            </div>

            <div className="border border-green-100 rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-green-50">
                  <TableRow className="border-b border-green-100">
                    <TableHead className="text-green-700">Market</TableHead>
                    <TableHead className="text-green-700">Location</TableHead>
                    <TableHead className="text-green-700">
                      Active Alerts
                    </TableHead>
                    <TableHead className="text-green-700">
                      Last Price Update
                    </TableHead>
                    <TableHead className="text-green-700">Status</TableHead>
                    <TableHead className="text-green-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleMarkets.map((market) => (
                    <TableRow
                      key={market.id}
                      className="border-b border-green-100 hover:bg-green-50/20"
                    >
                      <TableCell className="font-medium text-green-800">
                        {market.name}
                      </TableCell>
                      <TableCell>{market.location}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-50/30 text-green-700">
                          {market.activeAlerts}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(market.lastUpdate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            market.status === "active" ? "default" : "secondary"
                          }
                          className="bg-green-50/30 text-green-700"
                        >
                          {market.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:bg-green-50/20"
                        >
                          <MoreVerticalIcon className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          <AlertCircleIcon className="inline-block mr-2 text-green-600" />
          Something went wrong displaying this data.
        </div>
      );
    }
    return this.props.children;
  }
}
