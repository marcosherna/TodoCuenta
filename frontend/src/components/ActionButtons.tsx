import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Edit2, Trash2 } from "lucide-react";

export interface ActionButtonsProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function EditButton({
  onClick,
  className,
  disabled,
}: ActionButtonsProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "h-8 w-8 text-blue-500 hover:bg-blue-100 focus:bg-blue-100 disabled:opacity-50 disabled:pointer-events-none bg-transparent border-1 border-blue-500 hover:border-blue-600 focus:border-blue-600 disabled:border-gray-300",
        className
      )}
      disabled={disabled}
    >
      <Edit2 />
    </Button>
  );
}

export function DeleteButton({
  onClick,
  className,
  disabled,
}: ActionButtonsProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "h-8 w-8 text-red-500 hover:bg-red-100 focus:bg-red-100 disabled:opacity-50 disabled:pointer-events-none bg-transparent border-1 border-red-500 hover:border-red-600 focus:border-red-600 disabled:border-gray-300",
        className
      )}
      disabled={disabled}
    >
      <Trash2 />
    </Button>
  );
}
