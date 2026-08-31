import { Quote } from "lucide-react"

function Block({ block }) {
  switch (block.type) {
    case "heading":
      return (
        <h3 className="mt-8 text-xl font-semibold text-navy first:mt-0">
          {block.text}
        </h3>
      )

    case "list":
      return (
        <ul className="my-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-navy-500">
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case "callout":
      return (
        <div className="my-6 flex gap-3 rounded-xl border-l-4 border-gold bg-gold-50/60 p-4">
          <Quote className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
          <p className="text-[15px] leading-relaxed text-navy">{block.text}</p>
        </div>
      )

    case "paragraph":
    default:
      return (
        <p className="my-4 leading-relaxed text-navy-500">{block.text}</p>
      )
  }
}

export default function ReadMode({ slide }) {
  return (
    <article className="max-w-prose">
      <h2 className="font-display text-2xl text-navy sm:text-3xl">
        {slide.title}
      </h2>
      <div className="mt-5 text-[17px]">
        {slide.read.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </article>
  )
}
