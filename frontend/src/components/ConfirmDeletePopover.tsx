import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { DeleteButton } from "./ActionButtons";

interface ConfirmDeletePopoverProps {
  onConfirm?: () => void;
  message?: string;
  labelButton?: string;
}

export function ConfirmDeletePopover({
  onConfirm,
  message,
  labelButton = "Confirm",
}: ConfirmDeletePopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }

    handleClose();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <DeleteButton onClick={handleOpen} />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[250px]">
        <p className="pb-4">{message}</p>
        <div className="flex space-x-3">
          <Button onClick={handleConfirm}>{labelButton}</Button>
          <Button onClick={handleClose} variant="outline">
            Cancel
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
