import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, X } from "lucide-react";

export interface SearchBarProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  value?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDebouncedChange?: (value: string) => void;
  debounceDelay?: number;
  placeholder?: string;
  inputClassName?: string;
  buttonClassName?: string;
  clearable?: boolean;
  onSubmitEnter?: (e: React.FormEvent<HTMLFormElement>, value: string) => void;
}

export function SearchBar({
  value = "",
  onDebouncedChange,
  onInputChange,
  onSubmitEnter,
  placeholder = "Buscar...",
  debounceDelay = 500,
  className,
  inputClassName,
  buttonClassName,
  clearable = true,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onDebouncedChange) {
        onDebouncedChange(internalValue);
      }
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [internalValue, debounceDelay, onDebouncedChange]);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleClear = () => {
    setInternalValue("");
    if (onInputChange) {
      onInputChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    if (onDebouncedChange) {
      onDebouncedChange("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (onSubmitEnter) {
      onSubmitEnter(e, internalValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (onInputChange) {
      onInputChange(e);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={cn("flex", className)}
      {...props}
    >
      <div className="relative flex-1">
        <Input
          type="text"
          value={internalValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={cn(
            "pr-10 h-9 focus-visible:border-none focus-visible:ring-1 focus:outline-none rounded-r-none",
            inputClassName
          )}
        />
        {clearable && internalValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <Button
        type="submit"
        size="sm"
        className={cn("h-9 w-16 shrink-0 rounded-l-none", buttonClassName)}
        aria-label="Search"
      >
        <Search />
      </Button>
    </form>
  );
}
