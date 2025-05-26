import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginView() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-sm md:w-[325px]">
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
            <form>
              <div className="grid gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full">Login</Button>

            <div className="mt-4 text-center text-sm">
              <span>Don't have an account? </span>
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
