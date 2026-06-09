'use client';

import { useState } from 'react';
import ToolFrame from './ToolFrame';

// A quiet blank page. Whatever is written is handed back to be saved in the
// journal alongside the session.
export default function FreeWrite({
  onDone,
}: {
  onDone: (writing?: string) => void;
}) {
  const [text, setText] = useState('');

  return (
    <ToolFrame
      title="כתיבה חופשית"
      subtitle="דף ריק ושקט. כתבו מה שעולה — בלי כללים, בלי שיפוט. רק אתם והמילים."
      onDone={() => onDone(text.trim() || undefined)}
    >
      <div className="flex flex-1 flex-col py-6">
        <textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="מה עובר עליכם עכשיו?…"
          className="min-h-[40vh] flex-1 resize-none rounded-3xl bg-surface p-6 text-[17px] leading-relaxed text-ink placeholder:text-muted/60 hairline focus:outline-none focus:ring-2 focus:ring-sage/40"
        />
        <p className="mt-3 text-center text-[13px] text-muted">
          מה שתכתבו יישמר ביומן האישי שלכם, רק במכשיר הזה.
        </p>
      </div>
    </ToolFrame>
  );
}
