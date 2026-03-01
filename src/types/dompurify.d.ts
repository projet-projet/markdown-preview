import DOMPurify from 'dompurify';

export type SanitizedHTML = ReturnType<typeof DOMPurify.sanitize>;

declare module 'dompurify' {
  export function sanitize(html: string): SanitizedHTML;
}
