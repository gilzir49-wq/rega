'use client';

import { useState } from 'react';
import { CheckIn as CheckInData, EmotionTag, MoodScore } from '@/lib/types';
import {
  EMOTION_GROUPS,
  EMOTION_LABEL,
  LIGHT_EMOTIONS,
  MOOD_LABELS,
  MOOD_SCORES,
} from '@/lib/content';
import MoodFace from './MoodFace';

// The emotional check-in used both before (step 1) and after (step 3).
export default function CheckIn({
  title,
  subtitle,
  submitLabel,
  initial,
  onSubmit,
  onSkip,
  skipLabel,
}: {
  title: string;
  subtitle: string;
  submitLabel: string;
  initial?: CheckInData;
  onSubmit: (data: CheckInData) => void;
  onSkip?: () => void;
  skipLabel?: string;
}) {
  const [score, setScore] = useState<MoodScore | null>(initial?.score ?? null);
  const [tags, setTags] = useState<EmotionTag[]>(initial?.tags ?? []);
  const [note, setNote] = useState(initial?.note ?? '');

  const toggleTag = (t: EmotionTag) =>
    setTags((cur) =>
      cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t],
    );

  return (
    <div className="mx-auto w-full max-w-md animate-fade-up px-5 pb-40 pt-10">
      <h1 className="text-center text-2xl font-semibold text-ink">{title}</h1>
      <p className="mt-2 text-center text-[15px] leading-relaxed text-muted">
        {subtitle}
      </p>

      {/* 1–5 scale */}
      <div className="mt-8 flex items-end justify-center gap-2">
        {MOOD_SCORES.map((s) => {
          const active = score === s;
          return (
            <button
              key={s}
              onClick={() => setScore(s)}
              aria-label={MOOD_LABELS[s]}
              className={`press flex flex-1 flex-col items-center gap-2 rounded-2xl py-3 ${
                active
                  ? 'bg-sage text-white shadow-soft'
                  : 'bg-surface text-sage-deep hairline'
              }`}
            >
              <MoodFace score={s} className="h-7 w-7" />
              <span className="text-[11px] font-medium leading-tight">
                {MOOD_LABELS[s]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Emotion tags, in gentle clusters */}
      <p className="mt-9 mb-4 text-center text-sm font-medium text-muted">
        מה נוכח כרגע? (אפשר לבחור כמה, או לדלג)
      </p>
      <div className="space-y-3">
        {EMOTION_GROUPS.map((group, gi) => (
          <div key={gi}>
            {group.hint && (
              <p className="mb-2.5 mt-1 text-center text-[13px] text-muted/80">
                {group.hint}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-2">
              {group.ids.map((id) => {
                const active = tags.includes(id);
                const light = LIGHT_EMOTIONS.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggleTag(id)}
                    className={`press rounded-full px-4 py-2 text-sm ${
                      active
                        ? light
                          ? 'bg-clay text-white shadow-card'
                          : 'bg-sage-deep text-white shadow-card'
                        : 'bg-surface text-ink hairline'
                    }`}
                  >
                    {EMOTION_LABEL[id]}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Optional free text */}
      <div className="mt-7">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="ואם בא לכם — כמה מילים על מה שעובר עליכם (לא חובה)"
          className="w-full resize-none rounded-2xl bg-surface p-4 text-[15px] text-ink placeholder:text-muted/70 hairline focus:outline-none focus:ring-2 focus:ring-sage/40"
        />
      </div>

      {/* Submit (sticky-ish at bottom of flow) */}
      <div
        className="fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-bg via-bg to-transparent px-5 pt-5"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <button
          disabled={score === null}
          onClick={() =>
            score !== null &&
            onSubmit({ score, tags, note: note.trim() || undefined })
          }
          className={`btn-primary mx-auto block w-full max-w-md py-4 text-lg ${
            score === null ? 'opacity-40' : ''
          }`}
        >
          {submitLabel}
        </button>
        {onSkip && (
          <button
            onClick={onSkip}
            className="press mx-auto mt-2 block py-1 text-sm text-muted"
          >
            {skipLabel ?? 'לא עכשיו'}
          </button>
        )}
      </div>
    </div>
  );
}
