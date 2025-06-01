import { Skeleton } from "@repo/ui/components/skeleton";
import { cn } from "@repo/ui/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = {
  isLoading: boolean;
  fullWidth?: boolean;
} & PropsWithChildren;

const SkeletonWapper: React.FC<Props> = ({
  children,
  isLoading,
  fullWidth = true,
}) => {
  if (!isLoading) return children;
  return (
    <Skeleton className={cn(fullWidth && "w-full")}>
      <div className="opacity-10">{children}</div>
    </Skeleton>
  );
};

export default SkeletonWapper;
