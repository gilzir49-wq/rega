'use client';

import { useEffect, useRef, useState } from 'react';
import { BREATH_PATTERNS, BREATH_SAFETY, BreathPattern } from '@/lib/guidance';
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

      {/* The breathing circle — tap it to start / pause (no separate button to
          collide with the footer on short screens). */}
      <div className="relative mt-6 flex flex-1 flex-col items-center justify-center">
        <button
          onClick={running ? stop : start}
          aria-label={running ? 'עצרו' : 'התחילו'}
          className="relative grid h-56 w-56 place-items-center"
        >
          {/* soft outer halos */}
          <span
            className="absolute h-56 w-56 rounded-full bg-sage/15"
            style={{
              transform: `scale(${scale})`,
              transition: `transform ${dur}s ease-in-out`,
            }}
          />
          <span
            className="absolute h-44 w-44 rounded-full bg-sage/25"
            style={{
              transform: `scale(${scale})`,
              transition: `transform ${dur}s ease-in-out`,
            }}
          />
          <span
            className="grid h-32 w-32 place-items-center rounded-full bg-sage text-center text-white shadow-glow"
            style={{
              transform: `scale(${scale})`,
              transition: `transform ${dur}s ease-in-out`,
            }}
          >
            <span className="px-2 text-base font-medium leading-tight">
              {running ? (
                PHASE_LABEL[phase]
              ) : (
                <>
                  הקישו
                  <br />
                  כדי להתחיל
                </>
              )}
            </span>
          </span>
        </button>

        <p className="mt-5 h-5 text-sm text-muted">
          {running
            ? cycles > 0
              ? `${cycles} נשימות שלמות · הקישו כדי לעצור`
              : 'הקישו על העיגול כדי לעצור'
            : ''}
        </p>

        <p className="mt-3 max-w-xs text-center text-[12.5px] leading-relaxed text-muted/90">
          {BREATH_SAFETY}
        </p>
      </div>
    </ToolFrame>
  );
}
