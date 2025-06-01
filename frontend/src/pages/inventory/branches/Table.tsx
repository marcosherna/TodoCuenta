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

import { EditButton } from "@/components/ActionButtons";
import { ConfirmDeletePopover } from "@/components/ConfirmDeletePopover";

import { BrancheType } from "./type";

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
  onEdit: (branch: BrancheType) => void;
  onDelete: (id: number) => void;
}): ColumnDef<BrancheType>[] {
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
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ cell }) => {
        if (!cell.getValue()) return "N/A";
        const date = new Date(cell.getValue() as string);
        return date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ cell }) => {
        if (!cell.getValue()) return "N/A";
        const date = new Date(cell.getValue() as string);
        return date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2 justify-center ">
          <ConfirmDeletePopover
            message="¿Estás seguro de que deseas eliminar esta sucursal?"
            onConfirm={() => onDelete(row.original.id ?? 0)}
          />
          <EditButton onClick={() => onEdit(row.original)} />
          {/* <DeleteButton onClick={() => onDelete(row.original.id ?? 0)} /> */}
        </div>
      ),
    },
  ];
}
