import React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar"; 

import {
  ManagerLayout,
  ManagerLayoutHeader,
  ContentWrapper,
  HeaderActions,
} from "@/Layouts/ManagerLayout";

import { BranchTable, BranchColumns, BranchesProps } from "./Table";

const branches: BranchesProps[] = [
  {
    id: 1,
    name: "Branch 1",
    location: "Location 1",
  },
  {
    id: 2,
    name: "Branch 2",
    location: "Location 2",
  },
  {
    id: 3,
    name: "Branch 3",
    location: "Location 3",
  },
];
  

const columns: ColumnDef<BranchesProps>[] = BranchColumns({
  onEdit: (branch) => console.log("Edit", branch),
  onDelete: (id) => console.log("Delete", id),
});

export default function BranchesView() {
  const table = useReactTable({
    data: branches,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <ManagerLayout>
      <ManagerLayoutHeader
        title="Sucursales"
        description="Lista de sucursales"
        count={0}
      />

      <HeaderActions className="justify-between">
        <Button onClick={() => console.log("Add New Branch")}>
          Agregar Sucursal
        </Button>

        <SearchBar
          clearable
          placeholder="Buscar sucursal"
          onSubmitEnter={(
            e: React.FormEvent<HTMLFormElement>,
            value: string
          ) => {
            e.preventDefault();
            console.log("Search submitted:", value);
          }}
        />
      </HeaderActions>

      <ContentWrapper>
        <BranchTable table={table} />
      </ContentWrapper>
    </ManagerLayout>
  );
}
