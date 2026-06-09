'use client';

import { GROUNDING_STEPS } from '@/lib/guidance';
import ToolFrame from './ToolFrame';
import StepFlow from './StepFlow';

export default function Grounding({ onDone }: { onDone: () => void }) {
  return (
    <ToolFrame
      title="עיגון בהווה · 5·4·3·2·1"
      subtitle="חוזרים אל החושים, אל מה שקורה ממש עכשיו."
      onDone={onDone}
    >
      <StepFlow
        total={GROUNDING_STEPS.length}
        render={(i) => {
          const s = GROUNDING_STEPS[i];
          return (
            <div className="text-center">
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-sage text-white shadow-glow">
                <span className="text-4xl font-light">{s.count}</span>
              </div>
              <p className="mt-5 text-lg font-semibold text-sage-deep">
                דברים ש{s.sense}
              </p>
              <p className="mx-auto mt-2 max-w-sm text-[17px] leading-relaxed text-ink">
                {s.prompt}
              </p>
            </div>
          );
        }}
      />
    </ToolFrame>
  );
}
