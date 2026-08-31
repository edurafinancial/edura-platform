/**
 * On-demand loader for quiz banks, plus the randomisation helpers.
 *
 * Each module's questions live in their own generated file under ./modules/,
 * so a quiz bank is only fetched when a student starts that quiz.
 */

const QUIZ_LOADERS = import.meta.glob("./modules/*.js")

const keyFor = (moduleId) => `./modules/${moduleId}.js`

/** True when a module has an authored quiz. */
export function hasQuiz(moduleId) {
  return Boolean(QUIZ_LOADERS[keyFor(moduleId)])
}

/**
 * Fetches one module's quiz.
 *
 * @param {string} moduleId
 * @returns {Promise<object|null>}
 */
export async function loadQuiz(moduleId) {
  const loader = QUIZ_LOADERS[keyFor(moduleId)]
  if (!loader) return null
  const loaded = await loader()
  return loaded.default
}

/** Fisher-Yates. Returns a new array; never mutates the source data. */
export function shuffle(items) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Builds a randomized run of a quiz: question order shuffled, and the options
 * shuffled independently within each question.
 *
 * Call once per attempt so the order stays stable across re-renders.
 */
export function buildQuizRun(quiz) {
  if (!quiz) return null
  return {
    ...quiz,
    questions: shuffle(quiz.questions).map((question) => ({
      ...question,
      options: shuffle(question.options),
    })),
  }
}
