'use client';

import { ReactNode } from 'react';
import { CheckIcon } from '../Icons';

// Shared calm layout for every tool: a title, the guided content, and a soft
// "סיימתי" button. Leaving early is always allowed (the top bar handles exit) —
// no tool has to be finished.
export default function ToolFrame({
  title,
  subtitle,
  children,
  onDone,
  doneLabel = 'סיימתי',
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onDone: () => void;
  doneLabel?: string;
}) {
  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col px-5 pb-28 pt-6">
      <div className="animate-fade-in text-center">
        <h1 className="text-xl font-semibold text-ink">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-1.5 max-w-sm text-[14px] leading-relaxed text-muted">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col">{children}</div>

      <div className="fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-bg via-bg to-transparent px-5 pb-7 pt-5">
        <button
          onClick={onDone}
          className="press mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-sage py-4 text-lg font-medium text-white shadow-soft"
        >
          <CheckIcon className="h-5 w-5" />
          {doneLabel}
        </button>
        <p className="mt-2.5 text-center text-[12px] text-muted/80">
          אפשר לעצור בכל רגע — אין כאן כישלון.
        </p>
      </div>
    </div>
  );
}
