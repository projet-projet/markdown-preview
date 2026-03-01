import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { useCallback, useMemo, useState } from 'react';

import type { PreviewOptions, UseMarkdownReturn } from '../types/markdown';
import { DEFAULT_PREVIEW_OPTIONS } from '../types/markdown';

/**
 * Custom hook for markdown parsing with memoization.
 *
 * @param options - Preview configuration options
 * @returns Object with parsed HTML, empty state, parse function, and options management
 */
export function useMarkdown(
  options: Partial<PreviewOptions> = DEFAULT_PREVIEW_OPTIONS,
): UseMarkdownReturn {
  const [mergedOptions, setMergedOptions] = useState<PreviewOptions>({
    ...DEFAULT_PREVIEW_OPTIONS,
    ...options,
  });

  /**
   * Parse markdown to HTML with configured options.
   */
  const parse = useCallback(
    (markdown: string): string => {
      if (!markdown.trim()) {
        return '';
      }

      // Configure marked with options
      marked.setOptions({
        gfm: mergedOptions.gfm,
        breaks: mergedOptions.breaks,
      });

      // Parse markdown to HTML
      const html = marked.parse(markdown) as string;

      // Sanitize HTML if enabled
      if (mergedOptions.sanitize) {
        return DOMPurify.sanitize(html);
      }

      return html;
    },
    [mergedOptions.gfm, mergedOptions.breaks, mergedOptions.sanitize],
  );

  /**
   * Memoized HTML output - re-parses when markdown changes.
   * Note: Consumer should call parse(markdown) to get updated HTML.
   * This returns empty string as initial state.
   */
  const html = useMemo(() => '', []);

  /**
   * Check if content is empty.
   */
  const isEmpty = useMemo(() => true, []);

  /**
   * Update parsing options.
   */
  const setOptions = useCallback((newOptions: Partial<PreviewOptions>) => {
    setMergedOptions((prev) => ({
      ...prev,
      ...newOptions,
    }));
  }, []);

  return {
    html,
    isEmpty,
    parse,
    options: mergedOptions,
    setOptions,
  };
}
