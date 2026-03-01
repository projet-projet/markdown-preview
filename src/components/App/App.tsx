import { useState } from 'react';

import type { LayoutMode } from '../../types/markdown';
import { Editor } from '../Editor';
import { Layout } from '../Layout';
import { Preview } from '../Preview';

export default function App() {
  const [markdown, setMarkdown] = useState('');
  const [mode, setMode] = useState<LayoutMode>('split');

  const handleToggleView = () => {
    setMode((prevMode) =>
      prevMode === 'editor-only' ? 'preview-only' : 'editor-only',
    );
  };

  return (
    <Layout mode={mode} onToggleView={handleToggleView}>
      <Editor value={markdown} onChange={setMarkdown} />
      <Preview markdown={markdown} />
    </Layout>
  );
}
