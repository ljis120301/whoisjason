"use client";
import { cn } from "@/lib/utils";
import { Canvas } from "@react-three/fiber";
import React from "react";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  colors = [[0, 255, 255]],
  dotSize = 3,
  containerClassName,
}) => {
  return (
    <div className={cn("h-full relative", containerClassName)}>
      <Canvas className="absolute inset-0">
        {/* Your shader or effect logic here */}
      </Canvas>
    </div>
  );
};
