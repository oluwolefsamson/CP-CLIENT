import * as React from "react";
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
  WheatIcon,
} from "lucide-react";
import { z } from "zod";

// UI Components
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
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

// Updated Agricultural price alert schema with optional fields and extended enums
export const schema = z.object({
  id: z.number().positive().optional(),
  crop: z.string().min(1).optional(),
  type: z.enum(["above", "below", "other"]).optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
  threshold: z.number().positive().optional(),
  market: z.string().min(1).optional(),
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

function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-green-600 hover:bg-green-50"
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
          className="border-green-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-700"
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
      <Badge
        variant={row.original.type === "above" ? "default" : "secondary"}
        className="capitalize bg-green-100 text-green-800 hover:bg-green-200"
      >
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
        variant={row.original.status === "active" ? "default" : "secondary"}
        className="gap-1 bg-green-50 text-green-700 border-green-200"
      >
        {row.original.status === "active" ? (
          <CheckCircle2Icon className="size-3.5 text-green-600" />
        ) : (
          <LoaderIcon className="size-3.5 text-green-600 animate-spin" />
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
        <span className="font-semibold text-green-700">
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
        <span className="text-green-600">
          {new Date(row.original.lastTriggered).toLocaleDateString()}
        </span>
      ) : (
        <span className="text-green-400">Never</span>
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
            className="text-green-600 hover:bg-green-50"
          >
            <MoreVerticalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-green-100">
          <DropdownMenuItem className="focus:bg-green-50">
            Edit Alert
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-green-50">
            Duplicate Alert
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-green-50">
            View Market Trends
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-green-100" />
          <DropdownMenuItem className="text-red-600 focus:bg-red-50">
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
      className={`${isDragging ? "bg-green-50" : "hover:bg-green-50"} border-b border-green-100`}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="py-3">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({ data = sampleData }) {
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
    <div className="mx-4 lg:mx-6">
      {" "}
      {/* Added horizontal margins */}
      <Tabs defaultValue="alerts">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-green-50 rounded-t-lg border-b border-green-100">
          {/* Tabs - Stack on mobile, row on desktop */}
          <TabsList className="bg-green-100 w-full sm:w-auto">
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white w-full sm:w-auto text-sm sm:text-base px-3 py-1.5"
            >
              Price Alerts
            </TabsTrigger>
            <TabsTrigger
              value="markets"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white w-full sm:w-auto text-sm sm:text-base px-3 py-1.5"
            >
              Tracked Markets
            </TabsTrigger>
          </TabsList>

          {/* Buttons - Stack on mobile, row on desktop */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-100 w-full sm:w-auto justify-between sm:justify-start"
                >
                  <ColumnsIcon className="mr-0 sm:mr-2 size-4 text-green-600" />
                  <span className=" sm:inline">Columns</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-green-100 w-[200px]">
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
                      className="focus:bg-green-50 text-green-700 text-sm"
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto justify-between sm:justify-start">
              <PlusIcon className="mr-0 sm:mr-2 size-4" />
              <span className=" sm:inline">New Alert</span>
            </Button>
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
                        <TableHeader className="bg-green-50 sticky top-0 z-10">
                          {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                              key={headerGroup.id}
                              className="border-b border-green-100"
                            >
                              {headerGroup.headers.map((header) => (
                                <TableHead
                                  key={header.id}
                                  style={{ width: header.getSize() }}
                                  className="text-green-700 font-semibold py-3 bg-green-50"
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

          <div className="flex items-center justify-between p-4 bg-green-50 border-t border-green-100">
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
                  <SelectContent className="border-green-100">
                    {[10, 20, 30].map((size) => (
                      <SelectItem
                        key={size}
                        value={size.toString()}
                        className="focus:bg-green-50 text-green-700"
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
                  className="border-green-200 text-green-700 hover:bg-green-100"
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
                  className="border-green-200 text-green-700 hover:bg-green-100"
                >
                  <ChevronRightIcon className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="markets">
          {/* Tracked Markets Content */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TableCellViewer({ item }) {
  return (
    <div className="flex items-center gap-2">
      <WheatIcon className="size-5 text-green-600" />
      <span className="font-medium text-green-800">
        {item.crop || "Unknown Crop"}
      </span>
      {item.market && (
        <Badge
          variant="outline"
          className="ml-2 border-green-200 text-green-700 bg-green-50"
        >
          {item.market}
        </Badge>
      )}
    </div>
  );
}

// Error Boundary Component
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
