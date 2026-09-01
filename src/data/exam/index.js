/**
 * On-demand loader for the certification exam.
 *
 * The 40-question bank is a separate chunk — most sessions never open the exam,
 * so it should not cost anything on first load.
 */

let cached = null

/** @returns {Promise<object>} the exam definition */
export async function loadCertificationExam() {
  if (!cached) {
    const loaded = await import("./certificationExam.js")
    cached = loaded.default
  }
  return cached
}
