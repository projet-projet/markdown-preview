import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_MARKDOWN,
  URL_PARAM_KEY,
  URL_UPDATE_DEBOUNCE_MS,
} from 'src/constants';
import type { UseUrlPersistenceReturn } from 'src/types/urlPersistence.types';
import {
  checkUrlLength,
  decodeMarkdown,
  encodeMarkdown,
} from 'src/utils/urlEncoder';

function debounce(
  fn: (content: string) => void,
  delay: number,
): ((content: string) => void) & { cancel: () => void; flush: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: [string] | null = null;

  const debouncedFn = ((content: string) => {
    lastArgs = [content];

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      /* v8 ignore start */
      if (lastArgs) {
        fn(...lastArgs);
      }
      /* v8 ignore end */

      timeoutId = null;
      lastArgs = null;
    }, delay);
  }) as ((content: string) => void) & { cancel: () => void; flush: () => void };

  /* v8 ignore start */
  debouncedFn.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
      lastArgs = null;
    }
  };
  /* v8 ignore end */

  debouncedFn.flush = () => {
    if (timeoutId !== null && lastArgs !== null) {
      clearTimeout(timeoutId);
      fn(...lastArgs);
      timeoutId = null;
      lastArgs = null;
    }
  };

  return debouncedFn;
}

export function useUrlPersistence(
  initialMarkdown?: string,
): UseUrlPersistenceReturn {
  const [markdown, setMarkdownState] = useState<string>('');
  const [loadedFromUrl, setLoadedFromUrl] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get(URL_PARAM_KEY);

    let initialContent = initialMarkdown ?? DEFAULT_MARKDOWN;
    let wasLoadedFromUrl = false;

    if (encoded) {
      const result = decodeMarkdown(encoded);
      if (result.success) {
        initialContent = result.decoded;
        wasLoadedFromUrl = true;
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMarkdownState(initialContent);
    setLoadedFromUrl(wasLoadedFromUrl);
  }, [initialMarkdown]);

  const debouncedSync = useMemo(
    () =>
      debounce((content: string) => {
        const result = encodeMarkdown(content);
        const check = checkUrlLength(result.encoded);

        if (check.exceedsLimit) {
          // eslint-disable-next-line no-console
          console.warn(
            `Encoded markdown exceeds URL length limit ` +
              `(${String(check.actualLength)} > ${String(check.maxLength)})`,
          );
        }

        const url = new URL(window.location.href);
        url.searchParams.set(URL_PARAM_KEY, result.encoded);
        window.history.replaceState(null, '', url.toString());
      }, URL_UPDATE_DEBOUNCE_MS),
    [],
  );

  const setMarkdown = useCallback(
    (value: string) => {
      setMarkdownState(value);
      debouncedSync(value);
    },
    [debouncedSync],
  );

  const syncToUrl = useCallback(() => {
    debouncedSync.flush();
  }, [debouncedSync]);

  return {
    markdown,
    setMarkdown,
    loadedFromUrl,
    syncToUrl,
  };
}
