import { cn } from "@/lib/utils";
import React from "react";

interface ManagerLayoutHeaderProps {
  title: string;
  label?: string;
  count?: number;
  description?: string;
}

export function ManagerLayoutHeader({
  title,
  label,
  count,
  description,
}: ManagerLayoutHeaderProps) {
  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            {title}
          </h2>
          {count !== undefined && (
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {count} {label ?? title.toLowerCase()}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export function HeaderActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center mt-4 gap-x-3", className)}
      {...props}
    />
  );
}

export function ContentWrapper({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="flex flex-col mt-6">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            data-slot="table-wrapper"
            className={cn(
              "overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg",
              className
            )}
            {...props}
          ></div>
        </div>
      </div>
    </div>
  );
}

export function ContentFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-footer"
      className={cn(
        "mt-6 sm:flex sm:items-center sm:justify-between",
        className
      )}
      {...props}
    />
  );
}

export function ManagerLayout({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="manager-layout"
      className={cn("container px-4 mx-auto", className)}
      {...props}
    />
  );
}
