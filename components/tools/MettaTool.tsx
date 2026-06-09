'use client';

import { METTA_STEPS } from '@/lib/guidance';
import { MettaIcon } from '../Icons';
import ToolFrame from './ToolFrame';
import StepFlow from './StepFlow';

export default function MettaTool({ onDone }: { onDone: () => void }) {
  return (
    <ToolFrame
      title="חמלה ואהבה"
      subtitle="משאלות טוב, במעגלים מתרחבים. אמרו כל שורה לאט בלב. ואם דווקא עולים כאן כאב או התנגדות — זה אנושי ושכיח לגמרי; אפשר להניח יד על הלב ולהמשיך ברכּוּת."
      onDone={onDone}
    >
      <StepFlow
        total={METTA_STEPS.length}
        render={(i) => {
          const s = METTA_STEPS[i];
          return (
            <div className="text-center">
              <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-clay/15 text-clay">
                <MettaIcon className="h-8 w-8" />
              </span>
              <p className="text-sm font-medium uppercase tracking-wide text-muted">
                {s.target}
              </p>
              <div className="mx-auto mt-4 max-w-sm space-y-2.5">
                {s.lines.map((l, n) => (
                  <p
                    key={n}
                    className="text-[18px] leading-relaxed text-ink"
                  >
                    {l}
                  </p>
                ))}
              </div>
            </div>
          );
        }}
      />
    </ToolFrame>
  );
}
