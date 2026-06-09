'use client';

import { RAIN_STEPS } from '@/lib/guidance';
import ToolFrame from './ToolFrame';
import StepFlow from './StepFlow';

export default function RainTool({ onDone }: { onDone: () => void }) {
  return (
    <ToolFrame
      title="RAIN · מפגש עם רגש"
      subtitle="ארבעה צעדים עדינים מול רגש קשה. אפשר להישאר בכל צעד כמה שצריך."
      onDone={onDone}
    >
      <StepFlow
        total={RAIN_STEPS.length}
        render={(i) => {
          const s = RAIN_STEPS[i];
          return (
            <div className="text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-sky/20 text-sky">
                <span className="text-3xl font-semibold">{s.letter}</span>
              </div>
              <p className="mt-5 text-lg font-semibold text-ink">{s.title}</p>
              <p className="mx-auto mt-2 max-w-sm text-[17px] leading-relaxed text-ink/90">
                {s.body}
              </p>
            </div>
          );
        }}
      />
    </ToolFrame>
  );
}
