import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent, 
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { axios } from "@/lib/axios";
import { END_POINTS } from "@/utils/const";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginView() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => { 
    try {
      const response = await axios.post(END_POINTS.AUTH.LOGIN, data);
      console.log("Login successful:", response.data);
      navigate("/dashboard");
    } catch (error) { 
      toast.error("Login failed: " + (error as Error).message);
    } 
  };

  return (
    <>
      <div className="flex h-screen pt-7 md:pt-0 md:items-center justify-center">
        <div className="w-full max-w-sm md:w-[325px]">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center uppercase">
                Todo Cuenta
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <span className="w-16 h-px bg-muted-foreground"></span>
                Sign In
                <span className="w-16 h-px bg-muted-foreground"></span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" autoComplete="email" />
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
                            autoComplete="current-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>

                  <Button type="submit" className="w-full mt-4">
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="mt-4 text-center text-sm">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
