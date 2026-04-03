import React from "react";
import { cn } from "@/lib/utils";
import { OrbitingCircles } from "./OrbitingCircles";

const AnimationWrap = ({
  children,
  radius = 220,
  duration = 24,
  iconSize = 180,
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        className
      )}
    >
      <OrbitingCircles
        path={false}
        iconSize={iconSize}
        radius={radius}
        duration={duration}
      >
        {children}
      </OrbitingCircles>
    </div>
  );
};

export default AnimationWrap;
