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

// Schema validation
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
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    size: 40,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-gray-300 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-gray-300 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900"
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
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    size: 200,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Alert Type",
    cell: ({ row }) => (
      <Badge className="bg-gray-100 text-gray-700 capitalize">
        {row.original.type || "N/A"}
      </Badge>
    ),
    size: 120,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={`gap-1 ${
          row.original.status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {row.original.status === "active" ? (
          <CheckCircle2Icon className="size-3.5 text-green-600" />
        ) : (
          <LoaderIcon className="size-3.5 text-gray-600 animate-spin" />
        )}
        {row.original.status || "N/A"}
      </Badge>
    ),
    size: 120,
  },
  {
    accessorKey: "threshold",
    header: "Price Threshold",
    cell: ({ row }) => {
      const threshold = Number(row.original.threshold) || 0;
      return (
        <span className="font-semibold text-gray-800">
          ₦{threshold.toLocaleString()}/100kg
        </span>
      );
    },
    size: 180,
  },
  {
    accessorKey: "market",
    header: "Market",
    cell: ({ row }) => row.original.market || "All Markets",
    size: 220,
  },
  {
    accessorKey: "lastTriggered",
    header: "Last Triggered",
    cell: ({ row }) =>
      row.original.lastTriggered ? (
        <span className="text-gray-600">
          {new Date(row.original.lastTriggered).toLocaleDateString()}
        </span>
      ) : (
        <span className="text-gray-400">Never</span>
      ),
    size: 150,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:bg-gray-100"
          >
            <MoreVerticalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-gray-200 bg-white">
          <DropdownMenuItem className="focus:bg-gray-100 text-gray-700">
            Edit Alert
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-gray-100 text-gray-700">
            Duplicate Alert
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-gray-100 text-gray-700">
            View Market Trends
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem className="text-red-600 focus:bg-red-50/30">
            Delete Alert
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
    <div className="mx-4 lg:mx-6 pt-2">
      {/* <Toaster
        position="top-center"
        theme="light"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "border-gray-200",
            title: "text-gray-800",
            description: "text-gray-600",
            success: "bg-gray-50",
            error: "bg-red-50 border-red-200",
          },
        }}
      /> */}

      <Tabs defaultValue="alerts">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-white rounded-t-lg border-b border-gray-200">
          <TabsList className="bg-gray-100 w-full sm:w-auto">
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
              <DialogContent className="bg-white border-gray-200 max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-gray-800">
                    Create New Price Alert
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700">Crop Type</Label>
                    <Input
                      value={newAlert.crop}
                      onChange={(e) =>
                        setNewAlert((prev) => ({
                          ...prev,
                          crop: e.target.value,
                        }))
                      }
                      className="border-gray-300"
                      placeholder="e.g. Maize, Rice..."
                    />
                    {formErrors.crop && (
                      <span className="text-red-500 text-sm">
                        {formErrors.crop[0]}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Alert Type</Label>
                    <Select
                      value={newAlert.type}
                      onValueChange={(value) =>
                        setNewAlert((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger className="border-gray-300 text-gray-700">
                        <SelectValue placeholder="Select alert type" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-200 bg-white">
                        <SelectItem value="above" className="focus:bg-gray-100">
                          Price Above
                        </SelectItem>
                        <SelectItem value="below" className="focus:bg-gray-100">
                          Price Below
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-green-700">Threshold Price</Label>
                    <Input
                      type="number"
                      value={newAlert.threshold}
                      onChange={(e) =>
                        setNewAlert((prev) => ({
                          ...prev,
                          threshold: e.target.value,
                        }))
                      }
                      className="border-green-200"
                      placeholder="Enter price per 100kg"
                    />
                    {formErrors.threshold && (
                      <span className="text-red-500 text-sm">
                        {formErrors.threshold[0]}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-green-700">
                      Specific Market (optional)
                    </Label>
                    <Input
                      value={newAlert.market}
                      onChange={(e) =>
                        setNewAlert((prev) => ({
                          ...prev,
                          market: e.target.value,
                        }))
                      }
                      className="border-green-200"
                      placeholder="All markets"
                    />
                    {formErrors.market && (
                      <span className="text-red-500 text-sm">
                        {formErrors.market[0]}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50/20"
                      onClick={() => setOpenNewAlert(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleCreateAlert}
                    >
                      Create Alert
                    </Button>
                  </div>
                </div>
              </DialogContent>
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
    </div>
  );
}

function TableCellViewer({ item }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium text-green-800">
        {item.crop || "Unknown Crop"}
      </span>
      {item.market && (
        <Badge
          variant="outline"
          className="ml-2 border-green-200 text-green-700 bg-green-50/30"
        >
          {item.market}
        </Badge>
      )}
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
