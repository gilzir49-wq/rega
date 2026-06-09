'use client';

import { BODY_SCAN_STEPS } from '@/lib/guidance';
import { BodyScanIcon } from '../Icons';
import ToolFrame from './ToolFrame';
import StepFlow from './StepFlow';

export default function BodyScan({ onDone }: { onDone: () => void }) {
  return (
    <ToolFrame
      title="סריקת גוף"
      subtitle="מסע איטי מהראש ועד כפות הרגליים. אין למהר — קחו את הזמן בכל שלב."
      onDone={onDone}
    >
      <StepFlow
        total={BODY_SCAN_STEPS.length}
        render={(i) => (
          <div className="text-center">
            <span className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-sage-soft text-sage-deep">
              <BodyScanIcon className="h-8 w-8" />
            </span>
            <p className="mx-auto max-w-sm text-[19px] leading-relaxed text-ink">
              {BODY_SCAN_STEPS[i]}
            </p>
          </div>
        )}
      />
    </ToolFrame>
  );
}
