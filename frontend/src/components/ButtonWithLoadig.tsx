import React from "react";

import { Button } from "./ui/button";
import { BarScaleMiddle } from "./Spinner";

interface ButtonWithLoadingProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
}

const ButtonWithLoading: React.FC<ButtonWithLoadingProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button {...props} disabled={isLoading}>
      <div className="flex items-center gap-2">
        {isLoading && <BarScaleMiddle />}
        {children}
      </div>
    </Button>
  );
};

export { ButtonWithLoading };
