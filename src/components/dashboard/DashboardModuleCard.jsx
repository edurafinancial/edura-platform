import { ArrowRight, Lock } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function DashboardModuleCard({
  mod,
  completed,
  hasContent,
  isActive,
  onSelect,
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="relative group">
        <div className="absolute -left-[35px] top-1/2 z-10 -translate-y-1/2 sm:-left-12 lg:-left-[46px]">
          {isActive ? (
            <div className="bg-surface border-primary flex size-6 items-center justify-center rounded-full border-[3px] md:size-9">
              <div className="bg-primary size-1.5 animate-pulse rounded-full md:size-2" />
            </div>
          ) : (
            <div className="bg-surface-container-low border-outline-variant/70 flex size-6 items-center justify-center rounded-full border-2 md:size-9">
              <Lock className="text-on-surface-variant/60 h-2.5 w-2.5 md:h-3.5 md:w-3.5" />
            </div>
          )}
        </div>
        <motion.div
          whileHover={hasContent ? { scale: 1.01, y: -2 } : {}}
          whileTap={hasContent ? { scale: 0.99 } : {}}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Card
            className={cn(
              "bg-surface-container-lowest ring-outline-variant/20 shadow-[0_10px_30px_rgba(26,28,27,0.06)] ring-1",
              hasContent ? "cursor-pointer" : "cursor-not-allowed",
            )}
            onClick={() => hasContent && onSelect(mod)}
          >
            <CardContent className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:px-5 md:py-4">
              <div className="flex flex-1 items-center">
                <div className="lg:mr-6 hidden h-5 w-5 items-center justify-center lg:flex">
                  <div
                    className={
                      hasContent
                        ? "bg-primary h-2.5 w-2.5 animate-pulse rounded-full shadow-[0_0_0_5px_rgba(42,157,143,0.18)]"
                        : "bg-outline-variant/60 h-2.5 w-2.5 rounded-full"
                    }
                  />
                </div>
                <div>
                  <h4
                    className={
                      hasContent
                        ? "font-body text-secondary text-lg font-semibold"
                        : "font-body text-on-surface-variant/70 text-lg font-semibold"
                    }
                  >
                    {mod.title}
                  </h4>
                  <p
                    className={
                      hasContent
                        ? "text-on-surface-variant mt-0.5 text-sm"
                        : "text-on-surface-variant/60 mt-0.5 text-sm"
                    }
                  >
                    {mod.description}
                  </p>
                </div>
              </div>
              {hasContent ? (
                <Button
                  className="bg-primary text-white flex items-center rounded-sm px-7 py-5 text-sm font-semibold shadow-md transition-all hover:shadow-lg"
                  onClick={() => onSelect(mod)}
                >
                  {completed ? "Review" : "Start"}
                  <ArrowRight data-icon="inline-end" className="ml-2" />
                </Button>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-surface-container-high text-on-surface-variant/70 rounded-sm px-4 py-3 text-[9px] font-bold uppercase tracking-[0.2em]"
                >
                  Coming soon
                </Badge>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
