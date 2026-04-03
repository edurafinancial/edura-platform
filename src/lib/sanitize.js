import sanitizeHtml from "sanitize-html";

export function sanitizePlainText(value) {
  return sanitizeHtml(String(value ?? ""), {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}

