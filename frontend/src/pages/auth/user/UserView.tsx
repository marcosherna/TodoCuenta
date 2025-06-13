import React from "react";
import {
  ManagerLayout,
  ManagerLayoutHeader,
  HeaderActions,
  ContentFooter,
  ContentWrapper,
} from "@/Layouts/ManagerLayout";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { SpinnerWrapper } from "@/components/SpinnerWrapper";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { END_POINTS, TANSTACK_KEY } from "@/utils/const";
import { axios } from "@/lib/axios";

import { UserForm } from "./form";
import { UserType } from "./type";
import { UserTable, UserColumns } from "./Table";
import { DataTablePagination } from "@/components/DataTablePagination";

export default function UserView() {
  const [loadingForm, setLoadingForm] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserType | undefined>(
    undefined
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5, 
  });

  const handleOpenForm = (action: "edit" | "create", row?: UserType) => {
    if (action === "edit" && row) {
      setSelectedUser(row); 
    } else {
      setSelectedUser(undefined);
      console.log(selectedUser) 
    }
    setOpenForm(true);
  };

  const { data: roles } = useQuery({
    queryKey: [TANSTACK_KEY.GET_ROLES],
    queryFn: async () => {
      try {
        const response = await axios.get(END_POINTS.ROLES.GET);
        return response.data ?? [];
      } catch (error) {
        toast.error("Error al obtener los roles: " + (error as Error).message);
      }
    },
  });

  const { data: users, refetch } = useQuery({
    queryKey: [TANSTACK_KEY.GET_USERS],
    queryFn: async () => {
      try {
        const response = await axios.get(END_POINTS.USERS.GET);
        return response.data ?? [];
      } catch (error) {
        toast.error(
          "Error al obtener los usuarios: " + (error as Error).message
        );
      }
    },
  });

  const handleSubmit = async (data: UserType) => {
    try {
      setLoadingForm(true);

      console.log(data);

      data.id = selectedUser?.id;
      const apiCall = selectedUser
        ? axios.put(`${END_POINTS.USERS.PUT}/${selectedUser.id}`, data)
        : axios.post(END_POINTS.USERS.POST, data);

      await apiCall;
      toast.success(
        `Usuario ${selectedUser ? "actualizado" : "creado"} correctamente`
      );
      setOpenForm(false);
      setSelectedUser(undefined);
      refetch();
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      toast.error("Error al guardar el usuario: " + (error as Error).message);
    } finally {
      setLoadingForm(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${END_POINTS.USERS.DELETE}/${id}`);
      if (response.status != 204) {
        throw new Error(
          response.data.message || "Error al eliminar el usuario"
        );
      }
      toast.success("Usuario eliminado  correctamente");
      await refetch();
    } catch (error) {
      toast.error("Error al eliminar el usuario: " + (error as Error).message);
    }
  };

  const columns: ColumnDef<UserType>[] = UserColumns({
    onEdit: (user) => handleOpenForm("edit", user),
    onDelete: (id) => handleDelete(id),
    roles: roles ?? [],
  });

  const table = useReactTable({
    data: users ?? [],
    columns: columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination, 
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <ManagerLayout>
      <ManagerLayoutHeader
        count={0}
        title="Usuarios"
        description="This is a test description"
      ></ManagerLayoutHeader>

      <HeaderActions className="justify-between">
        <Button onClick={() => handleOpenForm("create")} className="w-fit">
          Nuevo
        </Button>

        <SearchBar></SearchBar>
      </HeaderActions>

      <ContentWrapper>
        <SpinnerWrapper loading={false}>
          <UserTable table={table} />

          <DataTablePagination table={table} />
        </SpinnerWrapper>
      </ContentWrapper>

      <ContentFooter>
        <UserForm
          roles={roles ?? []}
          user={selectedUser}
          loading={loadingForm}
          open={openForm}
          onSubmit={handleSubmit}
          onOpenChange={setOpenForm}
          title="Nuevo Usuario"
          description="Complete los campos para crear un nuevo usuario."
        />
      </ContentFooter>
    </ManagerLayout>
  );
}
