'use client';

import { useState } from 'react';
import { randomFrom } from '@/lib/guidance';
import ToolFrame from './ToolFrame';

// Shared "draw a card" tool for the Anicca and Wisdom collections.
export default function CardTool({
  title,
  subtitle,
  cards,
  accent = 'sage',
  drawLabel = 'קלף נוסף',
  onDone,
}: {
  title: string;
  subtitle: string;
  cards: string[];
  accent?: 'sage' | 'clay';
  drawLabel?: string;
  onDone: () => void;
}) {
  const [text, setText] = useState(() => randomFrom(cards));
  const [tick, setTick] = useState(0);

  const draw = () => {
    let next = randomFrom(cards);
    // avoid repeating the same card twice in a row when possible
    if (cards.length > 1) {
      let guard = 0;
      while (next === text && guard < 8) {
        next = randomFrom(cards);
        guard++;
      }
    }
    setText(next);
    setTick((t) => t + 1);
  };

  const ring = accent === 'clay' ? 'before:bg-clay/15' : 'before:bg-sage/15';
  const bar = accent === 'clay' ? 'bg-clay' : 'bg-sage';

  return (
    <ToolFrame title={title} subtitle={subtitle} onDone={onDone}>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          key={tick}
          className={`relative w-full animate-fade-up overflow-hidden rounded-[2rem] bg-surface p-8 shadow-soft hairline before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:content-[''] ${ring}`}
        >
          <div className={`absolute inset-x-0 top-0 h-1.5 ${bar}`} />
          <p className="text-center text-[20px] leading-loose text-ink">
            {text}
          </p>
        </div>

        <button
          onClick={draw}
          className="press mt-7 rounded-full bg-surface px-7 py-3 font-medium text-sage-deep shadow-card hairline"
        >
          {drawLabel}
        </button>
      </div>
    </ToolFrame>
  );
}
