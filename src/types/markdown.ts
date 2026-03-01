/**
 * Represents the markdown content being edited.
 */
export interface MarkdownDocument {
  /** Raw markdown text input by the user */
  raw: string;
  /** Rendered HTML output from markdown parser */
  rendered: string;
  /** Timestamp of last edit (for potential future features) */
  lastModified?: number;
}

/**
 * Tracks the current state of the editor component.
 */
export interface EditorState {
  /** Current markdown content */
  content: string;
  /** Cursor/caret position in editor */
  cursorPosition: {
    line: number;
    column: number;
    offset: number;
  };
  /** Text selection range (if any) */
  selection: {
    start: number;
    end: number;
  } | null;
  /** Whether editor is currently focused */
  isFocused: boolean;
  /** Whether content has been modified since load */
  isDirty: boolean;
}

/**
 * Defines the layout mode based on available screen width.
 */
export type LayoutMode = 'split' | 'editor-only' | 'preview-only';

/**
 * Configuration for the viewport and layout behavior.
 */
export interface ViewportConfiguration {
  /** Current layout mode */
  mode: LayoutMode;
  /** Viewport width in pixels */
  viewportWidth: number;
  /** Viewport height in pixels */
  viewportHeight: number;
  /** Breakpoint for mobile layout (default: 768px) */
  mobileBreakpoint: number;
}

/**
 * Configuration for markdown rendering.
 */
export interface PreviewOptions {
  /** Enable GitHub Flavored Markdown */
  gfm: boolean;
  /** Convert line breaks to <br> */
  breaks: boolean;
  /** Sanitize HTML output */
  sanitize: boolean;
  /** Placeholder HTML when content is empty */
  emptyPlaceholder: string;
}

/**
 * Default preview options configuration.
 */
export const DEFAULT_PREVIEW_OPTIONS: PreviewOptions = {
  gfm: true,
  breaks: false,
  sanitize: true,
  emptyPlaceholder:
    '<p class="text-gray-400 italic">Start typing markdown...</p>',
};

/**
 * Props for the Editor component.
 */
export interface EditorProps {
  /** Current markdown content */
  value: string;
  /** Callback when content changes */
  onChange: (value: string) => void;
  /** Callback when cursor position changes */
  onCursorChange?: (position: {
    line: number;
    column: number;
    offset: number;
  }) => void;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Whether editor is disabled */
  disabled?: boolean;
  /** CSS class names */
  className?: string;
}

/**
 * Props for the Preview component.
 */
export interface PreviewProps {
  /** Markdown content to render */
  markdown: string;
  /** Rendering options */
  options?: Partial<PreviewOptions>;
  /** CSS class names */
  className?: string;
  /** Aria label for accessibility */
  ariaLabel?: string;
}

/**
 * Props for the Layout component.
 */
export interface LayoutProps {
  /** Editor and Preview components */
  children: React.ReactNode;
  /** Current layout mode */
  mode: LayoutMode;
  /** Callback to toggle view mode (mobile) */
  onToggleView?: () => void;
  /** CSS class names */
  className?: string;
}

/**
 * Return type for the useMarkdown hook.
 */
export interface UseMarkdownReturn {
  /** Parsed HTML from markdown */
  html: string;
  /** Whether content is empty */
  isEmpty: boolean;
  /** Parse markdown manually (for testing) */
  parse: (markdown: string) => string;
  /** Current parsing options */
  options: PreviewOptions;
  /** Update parsing options */
  setOptions: (options: Partial<PreviewOptions>) => void;
}
