"use client";
import { cnFilter } from "@/lib/utils";

export const CanvasRevealEffect = ({
  containerClassName,
}) => {
  return (
    <div className={cnFilter("h-full relative bg-latte-base dark:bg-transparent w-full", containerClassName)} />
  );
};
