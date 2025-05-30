import React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";

import {
  ManagerLayout,
  ManagerLayoutHeader,
  ContentWrapper,
  HeaderActions,
  ContentFooter,
} from "@/Layouts/ManagerLayout";
import { SpinnerWrapper } from "@/components/SpinnerWrapper";

import { BranchTable, BranchColumns } from "./Table";
import { BranchForm } from "./Form";
import { Branch } from "./type";

const branches: Branch[] = [
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

export default function BranchesView() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingForm, setLoadingForm] = React.useState(false);
  const [selectedBranch, setSelectedBranch] = React.useState<Branch | null>(
    null
  );

  const handleFormOpen = (action: "edit" | "create", row?: Branch) => {
    if (action === "edit" && row) {
      console.log("Editing branch:", row);
      setSelectedBranch(row);
      setIsOpen(true);
    } else {
      console.log("Creating new branch");
      setSelectedBranch(null);
      setIsOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Branch deleted:", id);
      setLoading(false);
      // Here you would typically call your API to delete the branch
      // After deletion, you might want to refresh the branches list
    }, 1000);  
  }

  const columns: ColumnDef<Branch>[] = BranchColumns({
    onEdit: (branch) => handleFormOpen("edit", branch),
    onDelete: (id) => handleDelete(id),
  });

  const table = useReactTable({
    data: branches,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  const handleSubmit = (data: Branch) => {
    setLoadingForm(true);
    setTimeout(() => {
      console.log("Submitted data:", data);
      setLoadingForm(false);
      setIsOpen(false);
      // Here you would typically send the data to your API
    }, 1000);
  }


  return (
    <ManagerLayout>
      <ManagerLayoutHeader
        title="Sucursales"
        description="Lista de sucursales"
        count={0}
      />

      <HeaderActions className="justify-between">
        <Button onClick={() => handleFormOpen("create")}>Nuevo</Button>

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
        <SpinnerWrapper loading={loading}>
          <BranchTable table={table} />
        </SpinnerWrapper>
      </ContentWrapper>

      <ContentFooter>
        <BranchForm
          open={isOpen}
          onOpenChange={setIsOpen}
          branch={selectedBranch ?? undefined}
          onSubmit={handleSubmit}
          loading={loadingForm}
        />
      </ContentFooter>
    </ManagerLayout>
  );
}
