import * as React from "react";

import { cn } from "@/lib/utils";

/** Centered page-width wrapper with responsive horizontal padding. */
function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

export { Container };
