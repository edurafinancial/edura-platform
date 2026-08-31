/**
 * On-demand loader for lesson prose.
 *
 * Each module's lessons live in their own generated file under ./modules/, and
 * `import.meta.glob` turns every one into a separate lazy chunk. Nothing here
 * pulls prose into the main bundle — a student downloads only the module they
 * actually open.
 */

const LESSON_LOADERS = import.meta.glob("./modules/*.js")

const keyFor = (moduleId) => `./modules/${moduleId}.js`

/** True when a module has authored lesson content. */
export function hasLesson(moduleId) {
  return Boolean(LESSON_LOADERS[keyFor(moduleId)])
}

/** Placeholder lesson so a module without authored content still opens. */
function buildFallbackLesson(module) {
  return {
    moduleId: module.id,
    title: module.title,
    isPlaceholder: true,
    slides: [
      {
        id: "slide-1",
        title: "Overview",
        read: {
          blocks: [
            {
              type: "paragraph",
              text: module.summary || module.description || "",
            },
            {
              type: "callout",
              text: "Full lesson content for this module is still being written.",
            },
          ],
        },
        watch: null,
      },
    ],
  }
}

/**
 * Fetches one module's lesson content.
 *
 * @param {string} moduleId
 * @param {object} [module]  Registry entry, used for the fallback lesson.
 * @returns {Promise<object|null>}
 */
export async function loadLesson(moduleId, module) {
  const loader = LESSON_LOADERS[keyFor(moduleId)]
  if (!loader) return module ? buildFallbackLesson(module) : null
  const loaded = await loader()
  return loaded.default
}
