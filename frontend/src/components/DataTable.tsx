import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  TableHead,
} from "./ui/table";

interface DataTableProps<T> { 
  data?: T[];
  columns?: Array<{ header: string; accessor: keyof T }>;
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns?.map((column) => (
            <TableHead key={column.accessor}>{column.header}</TableHead>
          ))}   
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns?.map((column) => (
              <TableCell key={column.accessor}>{row[column.accessor]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
