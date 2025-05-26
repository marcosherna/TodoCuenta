import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

const formSchema = z
  .object({
    name: z.string().min(6, "Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(10, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
    id_rol: z.string().min(1, "Role is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

interface Rol {
  id: string;
  name: string;
}

export default function RegisterView() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      id_rol: "1", // Default role
    },
  });

  const roles: Rol[] = [
    { id: "1", name: "User" },
    { id: "2", name: "Admin" },
    { id: "3", name: "Super Admin" },
  ];

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    navigate("/dashboard"); // Navigate to the dashboard after successful registration
  };

  return (
    <div className="flex h-screen pt-7 md:pt-0 md:items-center justify-center">
      <div className="flex flex-col w-full max-w-sm md:w-[350px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center uppercase">
              Register
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <span className="w-16 h-px bg-muted-foreground"></span>
              Create Account
              <span className="w-16 h-px bg-muted-foreground"></span>
            </CardDescription>

            <CardContent>
              <Form {...form}>
                <form
                  className="grid gap-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter your name"
                            autoComplete="name"
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>

                  <FormField
                    control={form.control}
                    name="id_rol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter your role (e.g., 1 for user)"
                          />
                        </FormControl>
                        <FormMessage /> */}
                      </FormItem>
                    )}
                  ></FormField>

                  <Button
                    type="submit" >
                    Submit
                  </Button>
                </form>
              </Form>
            </CardContent>
          </CardHeader>
        </Card>

        <span className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
}
