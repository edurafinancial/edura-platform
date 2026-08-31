import { Lightbulb, PlayCircle, VideoOff } from "lucide-react"
import { Button } from "@/components/ui/button"

/** Shown when a lesson has no video yet — the source docs leave these blank. */
function NoVideoState({ onSwitchToRead }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/40 px-6 py-12 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-muted-foreground">
        <VideoOff className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 font-medium text-navy">No video for this lesson yet</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
        The full written lesson is available now — video is still in production.
      </p>
      <Button variant="outline" className="mt-5" onClick={onSwitchToRead}>
        Read the article instead
      </Button>
    </div>
  )
}

export default function WatchMode({ slide, onSwitchToRead }) {
  const watch = slide.watch

  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl text-navy sm:text-3xl">
        {slide.title}
      </h2>

      {!watch ? (
        <div className="mt-5">
          <NoVideoState onSwitchToRead={onSwitchToRead} />
        </div>
      ) : (
        <>
          {/* Responsive 16:9 embed */}
          <div className="mt-5 overflow-hidden rounded-xl border border-border bg-navy shadow-sm">
            <div className="relative aspect-video">
              {watch.videoUrl ? (
                <iframe
                  src={watch.videoUrl}
                  title={slide.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/80">
                  <PlayCircle className="h-14 w-14 text-white/90" aria-hidden="true" />
                  <p className="text-sm font-medium text-white">Video placeholder</p>
                </div>
              )}
            </div>
          </div>

          {watch.takeaways?.length ? (
            <section
              aria-labelledby="key-takeaways"
              className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <h3
                id="key-takeaways"
                className="flex items-center gap-2 text-base font-semibold text-navy"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-50 text-gold-500">
                  <Lightbulb className="h-4 w-4" aria-hidden="true" />
                </span>
                Key Takeaways
              </h3>
              <ul className="mt-4 space-y-3">
                {watch.takeaways.map((point, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed text-navy-500">
                    <span className="text-stat mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal">
                      {i + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <button
            type="button"
            onClick={onSwitchToRead}
            className="mt-5 text-sm text-muted-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Prefer to read? Switch to article
          </button>
        </>
      )}
    </div>
  )
}
