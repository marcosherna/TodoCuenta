import { cn } from "@/lib/utils";
import {
  flexRender,
  Table as TableType,
  ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { EditButton, DeleteButton } from "@/components/ActionButtons";

import { Branch } from "./type";

interface DataTableProps<T> {
  table: TableType<T>;
}

export function BranchTable<T>({ table }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className={cn(
                  header.column.id === "id" &&
                    "w-[10px] rounded-tl-2xl rounded-bl-2xl",
                  header.column.id === "name" && "w-[200px] text-left",
                  header.column.id === "location" && "w-[700px] text-left",
                  header.column.id === "actions" &&
                    "w-[120px] rounded-tr-2xl rounded-br-2xl text-center"
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className={cn(
                  cell.column.id === "id" &&
                    "w-[10px] rounded-tl-2xl rounded-bl-2xl",
                  cell.column.id === "name" && "w-[200px] text-left",
                  cell.column.id === "location" && "w-[700px] text-left",
                  cell.column.id === "actions" &&
                    "w-[120px] rounded-tr-2xl rounded-br-2xl "
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function BranchColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (branch: Branch) => void;
  onDelete: (id: number) => void;
}): ColumnDef<Branch>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ cell }) => cell.getValue(),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ cell }) => cell.getValue(),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ cell }) => cell.getValue(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2 justify-center ">
          <EditButton onClick={() => onEdit(row.original)} />
          <DeleteButton onClick={() => onDelete(row.original.id ?? 0)} />
        </div>
      ),
    },
  ];
}
