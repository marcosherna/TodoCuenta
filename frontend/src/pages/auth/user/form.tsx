import React from "react";
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";

import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ButtonWithLoading } from "@/components/ButtonWithLoadig";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { RolType } from "@/utils/types";

import { UserType, userSchema } from "./type";

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onSubmit?: (data: UserType) => void;
  loading?: boolean;
  roles: RolType[];
  user?: UserType | undefined;
}

export function UserForm({
  open,
  onOpenChange,
  title,
  description,
  onSubmit,
  loading = false,
  roles,
  user = undefined,
}: UserFormProps) {
  const [enabledEditPassword, setEnabledEditPassword] =
    React.useState<boolean>(false);

  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      id_rol: "1",
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        password: user.password,
        id_rol: user.id_rol.toString(),
      });
      setEnabledEditPassword(false);
    } else {
      form.reset({
        name: "",
        email: "",
        password: "",
        id_rol: "1",
      });
      setEnabledEditPassword(true);
    }
  }, [user, form]);

  const handleSubmit = (data: UserType) => {
    if (onSubmit) {
      onSubmit(data);
      form.reset();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title || "Nuevo Usuario"}</SheetTitle>
          <SheetDescription>
            {description || "Complete los campos para crear un nuevo usuario."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        className="input"
                        placeholder="Nombre"
                        {...field}
                        autoComplete="off"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        autoComplete="off"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        {...field}
                        autoComplete="new-password"
                        disabled={loading || !enabledEditPassword}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="id_rol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar Rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          {roles?.map((rol: RolType) => (
                            <SelectItem key={rol.id} value={`${rol.id}`}>
                              {rol.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ButtonWithLoading
                className="mt-5 w-full"
                type="submit"
                isLoading={loading}
              >
                Guardar
              </ButtonWithLoading>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
