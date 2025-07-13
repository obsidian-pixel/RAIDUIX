"use client";
import { Skeleton } from "@/components/ui/skeleton";
export default function ThemedSkeleton({ width = 80, height = 20, ...props }) {
  return <Skeleton style={{ width, height }} {...props} />;
}
