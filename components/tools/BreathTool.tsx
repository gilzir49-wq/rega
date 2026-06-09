'use client';

import { useEffect, useRef, useState } from 'react';
import { BREATH_PATTERNS, BreathPattern } from '@/lib/guidance';
import ToolFrame from './ToolFrame';

type Phase = 'inhale' | 'hold' | 'exhale' | 'holdAfter';

const PHASE_LABEL: Record<Phase, string> = {
  inhale: 'שאיפה',
  hold: 'החזקה',
  exhale: 'נשיפה',
  holdAfter: 'מנוחה',
};

export default function BreathTool({ onDone }: { onDone: () => void }) {
  const [pattern, setPattern] = useState<BreathPattern>(BREATH_PATTERNS[0]);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [scale, setScale] = useState(0.62);
  const [cycles, setCycles] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build the ordered, non-zero phases for the current pattern.
  const sequence = (p: BreathPattern): { phase: Phase; secs: number }[] =>
    (
      [
        { phase: 'inhale', secs: p.inhale },
        { phase: 'hold', secs: p.hold },
        { phase: 'exhale', secs: p.exhale },
        { phase: 'holdAfter', secs: p.holdAfter },
      ] as { phase: Phase; secs: number }[]
    ).filter((s) => s.secs > 0);

  useEffect(() => {
    if (!running) return;
    const seq = sequence(pattern);
    let i = 0;

    const run = () => {
      const step = seq[i];
      setPhase(step.phase);
      // target size for this phase
      if (step.phase === 'inhale') setScale(1);
      else if (step.phase === 'exhale') setScale(0.62);
      // hold phases keep the current scale
      timer.current = setTimeout(() => {
        if (step.phase === 'exhale' || (step.phase === 'holdAfter' && i === seq.length - 1)) {
          setCycles((c) => c + 1);
        }
        i = (i + 1) % seq.length;
        run();
      }, step.secs * 1000);
    };
    run();

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [running, pattern]);

  const start = () => {
    setCycles(0);
    setScale(0.62);
    setPhase('inhale');
    setRunning(true);
  };
  const stop = () => {
    setRunning(false);
    if (timer.current) clearTimeout(timer.current);
    setScale(0.62);
  };

  // transition duration matches the active phase length for a smooth glide
  const dur =
    phase === 'inhale'
      ? pattern.inhale
      : phase === 'exhale'
        ? pattern.exhale
        : 0.4;

  return (
    <ToolFrame
      title="נשימה מודעת"
      subtitle="תנו לעיגול להוביל. שאפו כשהוא גדל, נשפו כשהוא קטֵן."
      onDone={onDone}
    >
      {/* Pattern picker */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {BREATH_PATTERNS.map((p) => {
          const active = p.id === pattern.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                stop();
                setPattern(p);
              }}
              className={`press rounded-2xl px-3 py-2.5 text-center ${
                active
                  ? 'bg-sage text-white shadow-card'
                  : 'bg-surface text-ink hairline'
              }`}
            >
              <div className="text-sm font-semibold">{p.name}</div>
              <div
                className={`mt-0.5 text-[11px] leading-tight ${active ? 'text-white/85' : 'text-muted'}`}
              >
                {p.blurb}
              </div>
            </button>
          );
        })}
      </div>

      {/* The breathing circle */}
      <div className="relative mt-8 flex flex-1 flex-col items-center justify-center">
        <div className="relative grid h-64 w-64 place-items-center">
          {/* soft outer halos */}
          <div
            className="absolute h-64 w-64 rounded-full bg-sage/15"
            style={{
              transform: `scale(${scale})`,
              transition: `transform ${dur}s ease-in-out`,
            }}
          />
          <div
            className="absolute h-48 w-48 rounded-full bg-sage/25"
            style={{
              transform: `scale(${scale})`,
              transition: `transform ${dur}s ease-in-out`,
            }}
          />
          <div
            className="grid h-36 w-36 place-items-center rounded-full bg-sage text-white shadow-glow"
            style={{
              transform: `scale(${scale})`,
              transition: `transform ${dur}s ease-in-out`,
            }}
          >
            <span className="text-lg font-medium">
              {running ? PHASE_LABEL[phase] : 'מוכנים?'}
            </span>
          </div>
        </div>

        {running && cycles > 0 && (
          <p className="mt-6 text-sm text-muted">{cycles} נשימות שלמות</p>
        )}

        <div className="mt-6">
          {!running ? (
            <button
              onClick={start}
              className="press rounded-full bg-surface px-8 py-3 font-medium text-sage-deep shadow-card hairline"
            >
              התחילו
            </button>
          ) : (
            <button
              onClick={stop}
              className="press rounded-full bg-surface px-8 py-3 font-medium text-muted shadow-card hairline"
            >
              עצרו
            </button>
          )}
        </div>
      </div>
    </ToolFrame>
  );
}
