import type { ReactNode } from 'react';
import { useState } from 'react';

import type { LayoutProps } from '../../types/markdown';

/**
 * Layout component for responsive editor/preview arrangement.
 * Supports split view (desktop) and toggle view (mobile).
 */
export function Layout({ children, mode, onToggleView }: LayoutProps) {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  );

  const isEditorOnly = mode === 'editor-only';
  const isPreviewOnly = mode === 'preview-only';
  const isSplit = mode === 'split';

  const toggleLabel = isEditorOnly ? 'Show Preview' : 'Show Editor';

  const handleToggleDark = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  // Convert children to array for selective rendering
  const childrenArray = Array.isArray(children) ? children : [children];
  const editorPane = childrenArray[0] as ReactNode;
  const previewPane = childrenArray[1] as ReactNode;

  return (
    <div data-testid="layout-container" className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-gray-50 px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Markdown Preview
        </h1>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/remarkablemark/markdown-preview"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View repository on GitHub"
            title="View repository on GitHub"
            className="rounded bg-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <button
            type="button"
            onClick={handleToggleDark}
            aria-pressed={isDark ? 'true' : 'false'}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded bg-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {isDark ? '🌙' : '☀️'}
          </button>
          <button
            type="button"
            onClick={onToggleView}
            aria-pressed={isEditorOnly ? 'false' : 'true'}
            className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none md:hidden"
          >
            {toggleLabel}
          </button>
        </div>
      </header>

      {/* Editor and Preview Panes */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Editor Pane */}
        <div
          className={`flex-1 overflow-auto border-r border-gray-200 dark:border-gray-700 ${isPreviewOnly ? 'hidden' : ''} ${
            isSplit ? 'md:w-1/2' : 'w-full'
          }`}
        >
          {editorPane}
        </div>

        {/* Preview Pane */}
        <div
          className={`flex-1 overflow-auto ${isEditorOnly ? 'hidden' : ''} ${
            isSplit ? 'md:w-1/2' : 'w-full'
          }`}
        >
          {previewPane}
        </div>
      </div>
    </div>
  );
}
