import { useEffect, useState } from 'react';

import type { LayoutMode } from '../../types/markdown';
import { Editor } from '../Editor';
import { Layout } from '../Layout';
import { Preview } from '../Preview';

const MOBILE_BREAKPOINT = 768;

export default function App() {
  const [markdown, setMarkdown] = useState('');
  const [mode, setMode] = useState<LayoutMode>('split');
  const [userToggleMode, setUserToggleMode] = useState<LayoutMode | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;

      // When resizing to mobile, hide preview and only show via toggle
      if (mobile && mode === 'split') {
        setMode('editor-only');
      }

      // When resizing back to desktop, restore split view
      if (!mobile && mode !== 'split' && !userToggleMode) {
        setMode('split');
      }
    };

    // Initial check
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [mode, userToggleMode]);

  const handleToggleView = () => {
    const newMode = mode === 'editor-only' ? 'preview-only' : 'editor-only';
    setMode(newMode);
    setUserToggleMode(newMode);
  };

  return (
    <Layout mode={mode} onToggleView={handleToggleView}>
      <Editor value={markdown} onChange={setMarkdown} />
      <Preview markdown={markdown} />
    </Layout>
  );
}
