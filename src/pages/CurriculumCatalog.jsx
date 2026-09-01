import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ModuleCard from "@/components/curriculum/ModuleCard"
import { useModules, useTrackFilters } from "@/hooks/useCurriculum"

export default function CurriculumCatalog() {
  const [track, setTrack] = useState("all")
  const allModules = useModules()
  const filters = useTrackFilters()
  const modules =
    track === "all" ? allModules : allModules.filter((m) => m.trackId === track)

  return (
    <div className="space-y-8">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <h1 className="font-display text-3xl text-navy sm:text-4xl">
          Course Curriculum
        </h1>
        <p className="mt-1.5 max-w-2xl text-muted-foreground">
          Every module across the Edura pathway. Start with Foundations to build
          core money skills, then move into Advanced topics as you're ready.
        </p>
      </motion.header>

      <Tabs value={track} onValueChange={setTrack}>
        <TabsList className="bg-muted">
          {filters.map((filter) => (
            <TabsTrigger
              key={filter.id}
              value={filter.id}
              className="data-[state=active]:bg-white data-[state=active]:text-teal"
            >
              {filter.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <section aria-label="Modules">
        <p className="sr-only" role="status">
          Showing {modules.length} modules
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
