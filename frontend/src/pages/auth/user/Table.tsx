import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";

import {
  ColumnDef,
  Table as TableType,
  flexRender,
} from "@tanstack/react-table";

import { UserType } from "./type";

import { EditButton } from "@/components/ActionButtons";
import { ConfirmDeletePopover } from "@/components/ConfirmDeletePopover";
import { RolType } from "@/utils/types";
import { cn } from "@/lib/utils";

interface UserTableProps<T> {
  table: TableType<T>;
}

interface ColumnMeta {
  className?: string;
}

export function UserTable<T>({ table }: UserTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className={cn(
                  (header.column.columnDef.meta as ColumnMeta)?.className
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
                  (cell.column.columnDef.meta as ColumnMeta)?.className
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

export function UserColumns({
  onEdit,
  onDelete,
  roles,
}: {
  onEdit: (user: UserType) => void;
  onDelete: (id: number) => void;
  roles?: RolType[];
}): ColumnDef<UserType>[] {
  const roleOptions =
    roles?.map((role) => ({
      value: role.id,
      label: role.name,
    })) || [];

  return [
    {
      accessorKey: "id",
      header: "ID",
      meta: {
        className: "text-center w-[80px] font-bold text-sm",
      },
      cell: ({ cell }) => cell.getValue(),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="flex flex-col ">
          <span className="">{row.original.name}</span>
          <span className="text-sm text-gray-500">{row.original.email}</span>
        </div>
      ),
      meta: {
        className: "w-[650px] text-left",
      },
    },
    {
      accessorKey: "id_rol",
      header: "Rol",
      cell: ({ cell }) => (
        <span className="text-sm">
          {roleOptions.find((role) => role.value === cell.getValue())?.label ||
            "N/A"}
        </span>
      ),
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
        <div className="flex items-center gap-2">
          <EditButton onClick={() => onEdit(row.original)} />
          <ConfirmDeletePopover
            message="Are you sure you want to delete this user?"
            onConfirm={() => onDelete(row.original.id ?? 0)}
          />
        </div>
      ),
    },
  ];
}
