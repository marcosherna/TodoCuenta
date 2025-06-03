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

import { UserForm } from "./form";
import { UserType } from "./type";
import { UserTable, UserColumns } from "./Table";

const user: UserType[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    id_rol: 1,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password123",
    id_rol: 2,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "password123",
    id_rol: 3,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    password: "password123",
    id_rol: 4,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
];


export default function UserView() {
  const [loadingForm, setLoadingForm] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  const handleSubmit = (data: UserType) => {
    setLoadingForm(true);
    // Simulate an API call
    setTimeout(() => {
      console.log("User data submitted:", data);
      setLoadingForm(false);
      setOpenForm(false);
    }, 2000);
  };

  const columns: ColumnDef<UserType>[] = UserColumns({
    onEdit: (user) => {
      console.log("Edit user:", user);
      setOpenForm(true);
    },
    onDelete: (user) => {
      console.log("Delete user:", user);
      // Implement delete logic here
    },
  });
 

  const table = useReactTable({
    data: user,
    columns: columns,
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
        <Button onClick={handleOpenForm} className="w-fit">
          Nuevo
        </Button>

        <SearchBar></SearchBar>
      </HeaderActions>

      <ContentWrapper>
        <SpinnerWrapper loading={false}>
          <UserTable table={table} />
        </SpinnerWrapper>
      </ContentWrapper>

      <ContentFooter>
        <UserForm
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
