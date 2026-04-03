import { cn } from "@/lib/utils";

export default function SectionLabel({
  text,
  className,
  dotClassName,
  textClassName,
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "w-2 h-2 rounded-full bg-blue flex-shrink-0",
          dotClassName
        )}
      />
      <span className={cn("text-16 text-black font-medium", textClassName)}>
        {text}
      </span>
    </div>
  );
}
