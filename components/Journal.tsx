'use client';

import { useEffect, useMemo, useState } from 'react';
import { Session } from '@/lib/types';
import { deleteSession, loadSessions } from '@/lib/storage';
import { EMOTION_LABEL, MOOD_LABELS, TOOL_BY_ID } from '@/lib/content';
import { ToolIcon, TrashIcon } from './Icons';
import MoodFace from './MoodFace';

function formatDate(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
  }) + ' · ' + d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
}

// A soft trend line of how settled people felt (after-score, or before if no
// after) across recent sessions. Gentle, not clinical.
function Trend({ sessions }: { sessions: Session[] }) {
  const points = useMemo(() => {
    const recent = [...sessions].reverse().slice(-14); // oldest→newest
    return recent.map((s) => s.after?.score ?? s.before.score);
  }, [sessions]);

  if (points.length < 2) return null;

  const w = 300;
  const h = 80;
  const pad = 10;
  const stepX = (w - pad * 2) / (points.length - 1);
  const y = (v: number) => h - pad - ((v - 1) / 4) * (h - pad * 2);
  const coords = points.map((v, i) => [pad + i * stepX, y(v)] as const);
  const path = coords
    .map(([x, yy], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${yy.toFixed(1)}`)
    .join(' ');
  const area = `${path} L${coords[coords.length - 1][0].toFixed(1)} ${h - pad} L${coords[0][0].toFixed(1)} ${h - pad} Z`;

  return (
    <div className="card mb-5 p-5">
      <p className="mb-3 text-sm font-medium text-muted">
        איך הרגשתם לאורך הזמן
      </p>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
        <path d={area} fill="var(--sage)" opacity="0.12" />
        <path
          d={path}
          fill="none"
          stroke="var(--sage)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map(([x, yy], i) => (
          <circle key={i} cx={x} cy={yy} r="2.6" fill="var(--sage)" />
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[11px] text-muted">
        <span>סוער</span>
        <span>שקט</span>
      </div>
    </div>
  );
}

export default function Journal() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    setSessions(loadSessions());
  }, []);

  const remove = (id: string) => {
    deleteSession(id);
    setSessions(loadSessions());
  };

  return (
    <div className="mx-auto w-full max-w-md animate-fade-up px-5 pb-16 pt-4">
      <h1 className="text-center text-2xl font-semibold text-ink">היומן שלי</h1>
      <p className="mt-2 mb-6 text-center text-[14px] leading-relaxed text-muted">
        כל רגע שעצרתם בו. הכול נשמר רק במכשיר הזה.
      </p>

      {sessions.length === 0 ? (
        <div className="card mt-8 p-8 text-center">
          <p className="text-[15px] leading-relaxed text-muted">
            כאן יופיעו הרגעים שתעצרו בהם.
            <br />
            כשתסיימו תרגול ראשון — הוא יחכה לכם כאן.
          </p>
        </div>
      ) : (
        <>
          <Trend sessions={sessions} />
          <div className="space-y-3">
            {sessions.map((s) => {
              const tool = TOOL_BY_ID[s.tool];
              return (
                <div key={s.id} className="card p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage-soft text-sage-deep">
                      <ToolIcon id={s.tool} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-ink">
                        {tool.name}
                      </p>
                      <p className="text-[12px] text-muted">
                        {formatDate(s.date)}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(s.id)}
                      aria-label="מחיקה"
                      className="press grid h-9 w-9 place-items-center rounded-lg text-muted hover:text-clay"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* before → after */}
                  <div className="mt-3 flex items-center justify-center gap-3 rounded-2xl bg-surface-2 py-2.5">
                    <div className="flex items-center gap-1.5 text-muted">
                      <MoodFace score={s.before.score} className="h-5 w-5" />
                      <span className="text-[13px]">
                        {MOOD_LABELS[s.before.score]}
                      </span>
                    </div>
                    {s.after && (
                      <>
                        <span className="text-muted">←</span>
                        <div className="flex items-center gap-1.5 text-sage-deep">
                          <MoodFace score={s.after.score} className="h-5 w-5" />
                          <span className="text-[13px] font-medium">
                            {MOOD_LABELS[s.after.score]}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* tags */}
                  {s.before.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {s.before.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-surface-2 px-2.5 py-1 text-[12px] text-muted"
                        >
                          {EMOTION_LABEL[t]}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* notes / writing */}
                  {(s.before.note || s.writing) && (
                    <div className="mt-3 space-y-2">
                      {s.before.note && (
                        <p className="rounded-xl bg-surface-2 p-3 text-[14px] leading-relaxed text-ink/80">
                          {s.before.note}
                        </p>
                      )}
                      {s.writing && (
                        <p className="whitespace-pre-wrap rounded-xl bg-surface-2 p-3 text-[14px] leading-relaxed text-ink/80">
                          {s.writing}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
