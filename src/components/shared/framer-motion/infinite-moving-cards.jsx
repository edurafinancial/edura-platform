// FIXED InfiniteMovingCards

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  imageSize = 120, // number OR tailwind class
  gap = 4,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const duplicated = Array.from(scrollerRef.current.children);

      duplicated.forEach((item) => {
        scrollerRef.current.appendChild(item.cloneNode(true));
      });

      updateDirection();
      updateSpeed();
      setStart(true);
    }
  }, []);

  const updateDirection = () => {
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const updateSpeed = () => {
    const durations = {
      fast: "20s",
      normal: "40s",
      slow: "80s",
    };

    containerRef.current.style.setProperty(
      "--animation-duration",
      durations[speed] || "40s"
    );
  };

  const isNumberSize = typeof imageSize === "number";

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20  overflow-hidden", "", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap py-4",
          `gap-${gap}`,
          start && "animate-scroll",
          pauseOnHover && "hover:paused"
        )}
      >
        {items.map((item, idx) => (
          <img
            key={item.src + idx}
            src={item.src}
            style={
              isNumberSize ? { width: imageSize, height: "auto" } : undefined
            }
            className={cn(
              !isNumberSize && imageSize,
              "object-contain pointer-events-none select-none"
            )}
            alt="Company logo"
          />
        ))}
      </ul>
    </div>
  );
};
