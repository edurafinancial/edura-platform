import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/** Stand-in for screens still to be built out. */
export default function PagePlaceholder({ title, description, meta }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-4 px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-500">
            <Construction className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-display text-3xl text-navy">{title}</h1>
            <p className="mt-2 max-w-md text-muted-foreground">{description}</p>
            {meta ? (
              <p className="text-stat mt-3 text-sm text-teal">{meta}</p>
            ) : null}
          </div>
          <Button asChild variant="outline" className="gap-1.5">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
