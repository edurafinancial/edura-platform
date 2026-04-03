import React from "react";
import { cn } from "@/lib/utils";

export default function BadgeWithIcon({
  icon: Icon,
  label,
  className,
  bg = "bg-white",
  iconBg = "bg-[#B4FF8B]",
  padding = "p-2",
  iconPadding = "p-2.5",
  textClass = "text-body-18",
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-full",
        bg,
        padding,
        className
      )}
    >
      <div className={cn("rounded-full", iconBg, iconPadding)}>
        {Icon && <Icon className="w-4.5 h-4.5 text-black" />}
      </div>
      <span className={textClass}>{label}</span>
    </div>
  );
}
