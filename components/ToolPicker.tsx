'use client';

import { EmotionTag, ToolId } from '@/lib/types';
import { TOOLS, suggestTool } from '@/lib/content';
import { ToolIcon, SparkIcon } from './Icons';

export default function ToolPicker({
  tags,
  onPick,
}: {
  tags: EmotionTag[];
  onPick: (id: ToolId) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-md animate-fade-up px-5 pb-16 pt-8">
      <h1 className="text-center text-2xl font-semibold text-ink">
        מה ירגיע אתכם עכשיו?
      </h1>
      <p className="mt-2 text-center text-[15px] leading-relaxed text-muted">
        בחרו כלי אחד. אין נכון או לא נכון — אפשר תמיד לנסות אחר.
      </p>

      {/* Surprise me */}
      <button
        onClick={() => onPick(suggestTool(tags))}
        className="press mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-clay/90 py-3.5 text-[15px] font-medium text-white shadow-soft"
      >
        <SparkIcon className="h-5 w-5" />
        הפתיעו אותי
      </button>

      <div className="mt-5 grid grid-cols-1 gap-3">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => onPick(t.id)}
            className="press card flex items-center gap-4 p-4 text-right"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage-soft text-sage-deep">
              <ToolIcon id={t.id} className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="font-semibold text-ink">{t.name}</span>
                <span className="shrink-0 text-[11px] text-muted">
                  {t.minutes}
                </span>
              </span>
              <span className="mt-0.5 block text-[13px] leading-snug text-muted">
                {t.blurb}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
