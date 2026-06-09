'use client';

import { ReactNode, useState } from 'react';

// A gentle, self-paced stepper used by the guided tools. The person taps
// "הבא" when they're ready — never on a timer. On the last step it invites them
// to finish with the "סיימתי" button below (provided by ToolFrame).
export default function StepFlow({
  total,
  render,
  lastHint = 'כשתהיו מוכנים — אפשר לסיים למטה.',
}: {
  total: number;
  render: (index: number) => ReactNode;
  lastHint?: string;
}) {
  const [i, setI] = useState(0);
  const last = i === total - 1;

  return (
    <div className="flex flex-1 flex-col">
      {/* progress dots */}
      <div className="mt-5 flex justify-center gap-1.5">
        {Array.from({ length: total }).map((_, n) => (
          <span
            key={n}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              n === i ? 'w-6 bg-sage' : n < i ? 'w-1.5 bg-sage/50' : 'w-1.5 bg-line'
            }`}
          />
        ))}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-8">
        <div key={i} className="w-full animate-fade-in">
          {render(i)}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setI((n) => Math.max(0, n - 1))}
          disabled={i === 0}
          className={`press rounded-full px-5 py-2.5 text-sm font-medium ${
            i === 0 ? 'invisible' : 'bg-surface text-muted shadow-card hairline'
          }`}
        >
          הקודם
        </button>

        {!last ? (
          <button
            onClick={() => setI((n) => Math.min(total - 1, n + 1))}
            className="press rounded-full bg-sage-deep px-8 py-2.5 text-sm font-medium text-white shadow-card"
          >
            הבא
          </button>
        ) : (
          <span className="px-2 text-center text-[13px] text-muted">
            {lastHint}
          </span>
        )}
      </div>
    </div>
  );
}
