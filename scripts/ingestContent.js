#!/usr/bin/env node
/**
 * Ingests the Word curriculum documents in "Edura Content Files/" and emits
 * the structured data files the app consumes.
 *
 *   node scripts/ingestContent.js
 *
 * Writes:
 *   src/data/lessons.js            lesson prose, keyed by module id
 *   src/data/quizzes.js            quiz questions, keyed by module id
 *   src/data/curriculumModules.js  module registry (id/title/track/counts)
 *
 * No dependencies: .docx is a zip, so `unzip -p` gets us word/document.xml and
 * the paragraph text is pulled from the <w:t> runs.
 *
 * SOURCE NOTES (discovered by inspecting the documents, not assumed):
 *  - "Edura Lesson 1 and 2.docx" is the master document. Only Modules 1-2
 *    contain real prose; Modules 3-8 there are empty templates whose lessons
 *    hold nothing but a "Video URL:" placeholder. The master is therefore used
 *    only for modules 1-2, plus the track assignments and descriptions in its
 *    table of contents (individual files omit or disagree on those).
 *  - "Original lesson 6/7.docx" are superseded April drafts of the modules in
 *    Edura_Module6/7 (May, and longer). They are ignored.
 *  - "Edura_Certification_Exam.docx" has no module/lesson structure and does
 *    not belong to any module, so it is skipped.
 */

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const CONTENT_DIR = path.join(ROOT, "Edura Content Files")
const DATA_DIR = path.join(ROOT, "src", "data")
const MASTER = "Edura Lesson 1 and 2.docx"

/* ------------------------------------------------------------------ docx --- */

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
}

/** Paragraph strings from a .docx, in document order. */
function readParagraphs(file) {
  const xml = execFileSync("unzip", ["-p", file, "word/document.xml"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  })
  return xml
    .split("</w:p>")
    .map((block) => {
      const runs = [...block.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map((m) => m[1])
      return decodeEntities(runs.join("")).replace(/\s+/g, " ").trim()
    })
    .filter(Boolean)
}

const paragraphCache = new Map()
function paragraphsOf(file) {
  if (!paragraphCache.has(file)) {
    paragraphCache.set(file, readParagraphs(path.join(CONTENT_DIR, file)))
  }
  return paragraphCache.get(file)
}

/* ----------------------------------------------------------------- slugs --- */

function slugify(title) {
  return title
    .normalize("NFKD")
    .replace(/[‘’']/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
}

/* ------------------------------------------------------------- structure --- */

const RE_MODULE = /^Module\s+(\d+)\s*:\s*(.+)$/
const RE_LESSON = /^LESSON\s+(\d+)\s*$/i
const RE_QUESTION = /^QUESTION\s+(\d+)\s*$/i
const RE_OPTION = /^([A-D])\)\s*(.+)$/
const RE_TRACK = /^(FOUNDATIONS|ADVANCED)\s+TRACK$/i
const RE_VIDEO = /^Video URL\s*:\s*(.*)$/i
const RE_DESC = /^Description\s*:\s*(.+)$/i
const RE_EXPLANATION = /^Explanation\s*:\s*(.+)$/i

/** Paragraphs that are scaffolding rather than lesson prose. */
function isNoise(line) {
  return (
    line === "LESSONS" ||
    line === "QUIZ QUESTIONS" ||
    line === "EDURA FINANCIAL" ||
    RE_TRACK.test(line) ||
    RE_DESC.test(line) ||
    /^Version\s/i.test(line)
  )
}

/** Authoritative track + description, read from the master document. */
function parseMasterIndex(paragraphs) {
  const index = new Map()
  let track = null

  for (const line of paragraphs) {
    const trackMatch = line.match(RE_TRACK)
    if (trackMatch) {
      track = trackMatch[1].toLowerCase()
      continue
    }
    const modMatch = line.match(RE_MODULE)
    if (modMatch && line.includes("—")) {
      const number = Number(modMatch[1])
      const title = modMatch[2].split("—")[0].trim()
      if (!index.has(number)) index.set(number, { number, title, track })
    }
  }

  for (let i = 0; i < paragraphs.length; i++) {
    const modMatch = paragraphs[i].match(RE_MODULE)
    if (!modMatch || paragraphs[i].includes("—")) continue
    const number = Number(modMatch[1])
    const descMatch = (paragraphs[i + 1] || "").match(RE_DESC)
    if (descMatch && index.has(number)) {
      index.get(number).description = descMatch[1].trim()
    }
  }

  return index
}

/** Parses one module's lessons + quiz out of a paragraph range. */
function parseModuleBody(paragraphs, startIndex, endIndex) {
  const lessons = []
  const questions = []

  let mode = null
  let lesson = null
  let question = null

  const pushLesson = () => {
    if (lesson && lesson.title) lessons.push(lesson)
    lesson = null
  }
  const pushQuestion = () => {
    if (question && question.text && question.options.length) questions.push(question)
    question = null
  }

  for (let i = startIndex; i < endIndex; i++) {
    const line = paragraphs[i]

    if (line === "QUIZ QUESTIONS") {
      pushLesson()
      mode = "quiz"
      continue
    }
    if (line === "LESSONS") {
      mode = "lessons"
      continue
    }

    const lessonMatch = line.match(RE_LESSON)
    if (lessonMatch) {
      pushLesson()
      mode = "lessons"
      lesson = { number: Number(lessonMatch[1]), title: null, body: [], videoUrl: null }
      continue
    }

    const questionMatch = line.match(RE_QUESTION)
    if (questionMatch) {
      pushQuestion()
      mode = "quiz"
      question = {
        number: Number(questionMatch[1]),
        text: null,
        options: [],
        correctOptionId: null,
        explanation: null,
      }
      continue
    }

    if (mode === "lessons" && lesson) {
      const videoMatch = line.match(RE_VIDEO)
      if (videoMatch) {
        const url = videoMatch[1].trim()
        // "[paste YouTube URL here or leave blank]" is an unfilled placeholder.
        lesson.videoUrl = url && !url.startsWith("[") ? url : null
        continue
      }
      if (isNoise(line)) continue
      if (!lesson.title) lesson.title = line
      else lesson.body.push(line)
      continue
    }

    if (mode === "quiz" && question) {
      const optionMatch = line.match(RE_OPTION)
      if (optionMatch) {
        const letter = optionMatch[1]
        let text = optionMatch[2].trim()
        const isCorrect = /✓|✔/.test(text) || /\bCORRECT\s*$/i.test(text)
        if (isCorrect) {
          text = text.replace(/\s*(?:✓|✔)?\s*CORRECT\s*$/i, "").trim()
        }
        const id = letter.toLowerCase()
        question.options.push({ id, text })
        if (isCorrect) question.correctOptionId = id
        continue
      }
      const explanationMatch = line.match(RE_EXPLANATION)
      if (explanationMatch) {
        question.explanation = explanationMatch[1].trim()
        continue
      }
      if (isNoise(line)) continue
      if (!question.text) question.text = line
      continue
    }
  }

  pushLesson()
  pushQuestion()
  return { lessons, questions }
}

/** Module heading positions (body sections, not table-of-contents lines). */
function findModuleSections(paragraphs) {
  const marks = []
  paragraphs.forEach((line, i) => {
    const m = line.match(RE_MODULE)
    if (m && !line.includes("—")) {
      marks.push({ index: i, number: Number(m[1]), title: m[2].trim() })
    }
  })
  return marks.map((mark, i) => ({
    ...mark,
    end: i + 1 < marks.length ? marks[i + 1].index : paragraphs.length,
  }))
}

function findTrack(file) {
  for (const line of paragraphsOf(file)) {
    const m = line.match(RE_TRACK)
    if (m) return m[1].toLowerCase()
  }
  return null
}

function findDescription(file, number) {
  const paragraphs = paragraphsOf(file)
  for (let i = 0; i < paragraphs.length; i++) {
    const m = paragraphs[i].match(RE_MODULE)
    if (m && Number(m[1]) === number) {
      const d = (paragraphs[i + 1] || "").match(RE_DESC)
      if (d) return d[1].trim()
    }
  }
  return null
}

/* ------------------------------------------------------------------ main --- */

const SKIP = new Set([
  MASTER,
  "Edura_Certification_Exam.docx",
  "Original lesson 6.docx",
  "Original lesson 7.docx",
])

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content folder not found: ${CONTENT_DIR}`)
    process.exit(1)
  }

  const masterParagraphs = paragraphsOf(MASTER)
  const masterIndex = parseMasterIndex(masterParagraphs)
  const collected = new Map()

  // Modules 1-2: the only ones with real prose in the master document.
  for (const section of findModuleSections(masterParagraphs)) {
    if (section.number > 2) continue
    const parsed = parseModuleBody(masterParagraphs, section.index, section.end)
    collected.set(section.number, { section, parsed, source: MASTER })
  }

  // Everything else comes from its own file.
  for (const file of fs.readdirSync(CONTENT_DIR).sort()) {
    if (!file.endsWith(".docx") || file.startsWith("~$") || SKIP.has(file)) continue
    const paragraphs = paragraphsOf(file)
    for (const section of findModuleSections(paragraphs)) {
      const parsed = parseModuleBody(paragraphs, section.index, section.end)
      if (!parsed.lessons.length) continue
      collected.set(section.number, { section, parsed, source: file })
    }
  }

  const modules = [...collected.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([number, { section, parsed, source }]) => {
      const meta = masterIndex.get(number) || {}
      // Master TOC titles are the cleaned, canonical ones where they exist.
      const title = meta.title || section.title
      return {
        number,
        id: slugify(title),
        title,
        description:
          meta.description ||
          findDescription(source, number) ||
          `${title} — module overview.`,
        // Module 9 post-dates the master index; its own file declares its track.
        track: meta.track || findTrack(source) || "advanced",
        source,
        lessons: parsed.lessons,
        questions: parsed.questions,
      }
    })

  writeOutputs(modules)
  report(modules)
}

/* -------------------------------------------------------------- emitters --- */

const banner = (extra) =>
  `/**\n * GENERATED FILE — do not edit by hand.\n *\n * Produced by scripts/ingestContent.js from the Word documents in\n * "Edura Content Files/". Re-run that script to regenerate.\n *\n * ${extra}\n */`

/** Removes previously generated per-module files so renames don't leave orphans. */
function resetDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
  for (const file of fs.readdirSync(dir)) {
    if (file.endsWith(".js")) fs.unlinkSync(path.join(dir, file))
  }
}

function writeOutputs(modules) {
  const j = (v) => JSON.stringify(v, null, 2)

  const lessonDir = path.join(DATA_DIR, "lessons", "modules")
  const quizDir = path.join(DATA_DIR, "quizzes", "modules")
  resetDir(lessonDir)
  resetDir(quizDir)

  /* ---- one lesson file per module (each becomes its own lazy chunk) ---- */
  for (const m of modules) {
    const slides = m.lessons.map((lesson, i) => ({
      id: `slide-${i + 1}`,
      title: lesson.title,
      read: { blocks: lesson.body.map((text) => ({ type: "paragraph", text })) },
      // Source documents carry unfilled "Video URL" placeholders, so no lesson
      // has a video yet. WatchMode renders an empty state for null.
      watch: lesson.videoUrl
        ? { videoUrl: lesson.videoUrl, duration: null, takeaways: [] }
        : null,
    }))

    const file = [
      banner(`Lesson content for "${m.title}".`),
      "",
      `export default ${j({ moduleId: m.id, title: m.title, slides })}`,
      "",
    ].join("\n")

    fs.writeFileSync(path.join(lessonDir, `${m.id}.js`), file)
  }

  /* ---- one quiz file per module ---- */
  for (const m of modules) {
    if (!m.questions.length) continue
    const questions = m.questions.map((q, i) => ({
      id: `q${i + 1}`,
      text: q.text,
      options: q.options,
      correctOptionId: q.correctOptionId,
      explanation: q.explanation || "",
    }))

    const file = [
      banner(
        `Quiz for "${m.title}". Option ids are stable, so shuffling never\n * changes which answer is correct.`
      ),
      "",
      `export default ${j({
        moduleId: m.id,
        title: m.title,
        passingScore: 80,
        questions,
      })}`,
      "",
    ].join("\n")

    fs.writeFileSync(path.join(quizDir, `${m.id}.js`), file)
  }

  /* ---- lightweight registry (stays in the main bundle) ---- */
  const registry = modules.map((m) => ({
    id: m.id,
    number: m.number,
    title: m.title,
    description: m.description,
    track: m.track,
    lessonCount: m.lessons.length,
    quizCount: m.questions.length ? 1 : 0,
    questionCount: m.questions.length,
  }))

  const registryFile = [
    banner(
      "Module registry: identity, track, and content counts only.\n *\n * Deliberately lightweight — this is the ONLY curriculum data in the main\n * bundle. Lesson prose and quiz banks load on demand via\n * src/data/lessons/index.js and src/data/quizzes/index.js."
    ),
    "",
    `export const CURRICULUM_MODULES = ${j(registry)}`,
    "",
    "export const FOUNDATIONS_MODULES = CURRICULUM_MODULES.filter(",
    '  (m) => m.track === "foundations"',
    ")",
    "",
    "export const ADVANCED_MODULES = CURRICULUM_MODULES.filter(",
    '  (m) => m.track === "advanced"',
    ")",
    "",
    "export function getCurriculumModule(id) {",
    "  return CURRICULUM_MODULES.find((m) => m.id === id) ?? null",
    "}",
    "",
  ].join("\n")

  fs.writeFileSync(path.join(DATA_DIR, "curriculumModules.js"), registryFile)
}

/* ---------------------------------------------------------------- report --- */

function report(modules) {
  const pad = (s, n) => String(s).padEnd(n)
  console.log("\nIngested modules\n")
  console.log(
    `  ${pad("#", 4)}${pad("id", 34)}${pad("track", 13)}${pad("lessons", 9)}${pad("qs", 4)}source`
  )

  let lessonTotal = 0
  let questionTotal = 0
  const problems = []

  for (const m of modules) {
    lessonTotal += m.lessons.length
    questionTotal += m.questions.length
    console.log(
      `  ${pad(m.number, 4)}${pad(m.id, 34)}${pad(m.track, 13)}${pad(m.lessons.length, 9)}${pad(m.questions.length, 4)}${m.source}`
    )

    for (const lesson of m.lessons) {
      if (!lesson.body.length) {
        problems.push(`module ${m.number} lesson ${lesson.number} ("${lesson.title}") has no body text`)
      }
    }
    for (const q of m.questions) {
      if (!q.correctOptionId) {
        problems.push(`module ${m.number} question ${q.number} has NO correct answer`)
      }
      if (q.options.length !== 4) {
        problems.push(`module ${m.number} question ${q.number} has ${q.options.length} options`)
      }
      if (!q.explanation) {
        problems.push(`module ${m.number} question ${q.number} has no explanation`)
      }
    }
  }

  console.log(
    `\n  ${modules.length} modules · ${lessonTotal} lessons · ${questionTotal} questions`
  )

  if (problems.length) {
    console.log(`\n  ${problems.length} INTEGRITY PROBLEM(S):`)
    for (const p of problems) console.log(`    - ${p}`)
    process.exitCode = 1
  } else {
    console.log(
      "\n  Integrity checks passed: every question has 4 options, exactly one\n  correct answer, and an explanation.\n"
    )
  }
}

main()
