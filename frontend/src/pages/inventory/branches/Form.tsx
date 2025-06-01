import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BarScaleMiddle } from "@/components/Spinner";

import { BranchSchema, BrancheType } from "./type";

interface BranchFormProps {
  onSubmit?: (data: BrancheType) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  branch?: BrancheType;
  loading?: boolean;
}

export function BranchForm({
  onSubmit,
  open,
  onOpenChange,
  branch,
  loading,
}: BranchFormProps) {
  const form = useForm<BrancheType>({
    resolver: zodResolver(BranchSchema),
    defaultValues: {
      id: 0,
      name: "",
      location: "",
    },
  });

  const handleSubmit = (data: BrancheType) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  React.useEffect(() => {
    if (branch) {
      form.reset(branch);
    } else {
      form.reset({
        name: "",
        location: "",
      });
    }
  }, [branch, form]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Branch Form</SheetTitle>
          <SheetDescription>
            Use this form to create or edit a branch.
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="input"
                        placeholder="Branch Name"
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="input"
                        placeholder="Branch Location"
                        autoComplete="off"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                <div className="flex items-center gap-2">
                  {loading && <BarScaleMiddle />}
                  Submit
                </div>
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
