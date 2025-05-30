import React from "react";
import { cn } from "@/lib/utils";

import { BarScaleMiddle } from "./Spinner";

interface SpinnerWrapperProps {
  children?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export function SpinnerWrapper({
  children,
  loading,
  className,
}: SpinnerWrapperProps) {
  return (
    <div data-slot="spinner-wrapper" className="relative">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <BarScaleMiddle />
        </div>
      )}
      {/* Content behind the spinner */}
      <div
        className={cn({ "opacity-50 pointer-events-none": loading }, className)}
      >
        {children}
      </div>
    </div>
  );
}
