import React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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
import PaginateTable from "@/components/PaginateTable";
import { toast } from "sonner";

import { BranchTable, BranchColumns } from "./Table";
import { BranchForm } from "./Form";
import { BrancheType, ResponseApiSchema, TypeResponseApiSchema } from "./type";

import { END_POINTS, TANSTACK_KEY } from "@/utils/const";
import { axios } from "@/lib/axios";

export default function BranchesView() {
  const limit = 5;
  const [page, setPage] = React.useState(1);
  const [isOpen, setIsOpen] = React.useState(false);
  const [loadingForm, setLoadingForm] = React.useState(false);
  const [selectedBranch, setSelectedBranch] =
    React.useState<BrancheType | null>(null);

  const {
    data: paginateData,
    isLoading,
    refetch,
  } = useQuery<TypeResponseApiSchema, Error>({
    queryKey: [TANSTACK_KEY.GET_BRANCHES, page],
    queryFn: async () => {
      try {
        const response = await axios.get(END_POINTS.BRANCH.GET, {
          params: { page, limit },
        });
        return ResponseApiSchema.parse(response.data); // sin try/catch aquí
      } catch (error) {
        toast.error(
          "Error al obtener las sucursales: " + (error as Error).message
        );
      }
    },
    keepPreviousData: true,
    onError: (error: Error) => {
      console.error("Error fetching branches:", error);
    },
  } as UseQueryOptions<TypeResponseApiSchema, Error>);

  const handleFormOpen = (action: "edit" | "create", row?: BrancheType) => {
    if (action === "edit" && row) {
      setSelectedBranch(row);
      setIsOpen(true);
    } else {
      setSelectedBranch(null);
      setIsOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${END_POINTS.BRANCH.DELETE}/${id}`);
      if (response.status != 204) {
        throw new Error(
          response.data.message || "Error al eliminar la sucursal"
        );
      }
      toast.success("Sucursal eliminada correctamente");
      await refetch();
    } catch (error) {
      toast.error("Error al eliminar la sucursal: " + (error as Error).message);
    }
  };

  const columns: ColumnDef<BrancheType>[] = BranchColumns({
    onEdit: (branch) => handleFormOpen("edit", branch),
    onDelete: (id) => handleDelete(id),
  });

  const table = useReactTable({
    data: paginateData?.data ?? [],
    pageCount: paginateData?.pagination.totalPages ?? -1,
    columns,
    state: {
      pagination: {
        pageIndex: page,
        pageSize: limit,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const handleSubmit = async (data: BrancheType) => {
    try {
      setLoadingForm(true);
      const apiCall = selectedBranch
        ? axios.put(`${END_POINTS.BRANCH.PUT}/${selectedBranch.id}`, data)
        : axios.post(END_POINTS.BRANCH.POST, data);

      await apiCall;
      toast.success(
        `Sucursal ${selectedBranch ? "actualizada" : "creada"} correctamente`
      );
      setIsOpen(false);
      setSelectedBranch(null);
      refetch();
    } catch (error) {
      toast.error("Error al guardar la sucursal: " + (error as Error).message);
    } finally {
      setLoadingForm(false);
    }
  };

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
        <SpinnerWrapper loading={isLoading}>
          <BranchTable table={table} />
        </SpinnerWrapper>
      </ContentWrapper>

      <ContentFooter>
        <PaginateTable
          currentPage={paginateData?.pagination.currentPage ?? 1}
          totalPages={paginateData?.pagination.totalPages ?? 1}
          onPageChange={(p) => {
            if (p !== page) {
              console.log("Page changed", p);
              setPage(p);
            }
          }}
        />
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
