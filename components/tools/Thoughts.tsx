'use client';

import { useState } from 'react';
import { THOUGHTS_MODES } from '@/lib/guidance';
import { ThoughtsIcon, LeafIcon } from '../Icons';
import ToolFrame from './ToolFrame';
import StepFlow from './StepFlow';

export default function Thoughts({ onDone }: { onDone: () => void }) {
  const [modeId, setModeId] = useState<string | null>(null);
  const mode = THOUGHTS_MODES.find((m) => m.id === modeId);

  if (!mode) {
    return (
      <ToolFrame
        title="התבוננות במחשבות"
        subtitle="נלמד לראות מחשבה בלי להיאחז בה. בחרו דימוי שמדבר אליכם."
        onDone={onDone}
        doneLabel="אפשר לדלג כעת"
      >
        <div className="flex flex-1 flex-col justify-center gap-4">
          {THOUGHTS_MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setModeId(m.id)}
              className="press card flex items-center gap-4 p-5 text-right"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sage-soft text-sage-deep">
                {m.id === 'clouds' ? (
                  <ThoughtsIcon className="h-7 w-7" />
                ) : (
                  <LeafIcon className="h-7 w-7" />
                )}
              </span>
              <span>
                <span className="block font-semibold text-ink">{m.name}</span>
                <span className="mt-0.5 block text-[14px] leading-snug text-muted">
                  {m.intro}
                </span>
              </span>
            </button>
          ))}
        </div>
      </ToolFrame>
    );
  }

  const steps = [mode.intro, ...mode.lines];

  return (
    <ToolFrame
      title={mode.name}
      subtitle="אין צורך לעצור את המחשבות — רק להתבונן בהן חולפות. ואם מחשבה טעונה מדי — פִּקחו עיניים, הביטו סביב, ונשמו. אתם כאן, עכשיו."
      onDone={onDone}
    >
      <StepFlow
        total={steps.length}
        render={(i) => (
          <div className="text-center">
            <div className="mx-auto mb-6 grid h-20 w-20 animate-float place-items-center rounded-full bg-sky/15 text-sky">
              {mode.id === 'clouds' ? (
                <ThoughtsIcon className="h-9 w-9" />
              ) : (
                <LeafIcon className="h-9 w-9" />
              )}
            </div>
            <p className="mx-auto max-w-sm text-[18px] leading-relaxed text-ink">
              {steps[i]}
            </p>
          </div>
        )}
      />
    </ToolFrame>
  );
}
