'use client';

// Reachable support resources. Veteran-aware: נט"ל is Israel's line for trauma
// on a national/security background (soldiers, reservists, terror & war). Always
// gentle, never alarming — just quietly here if it's needed.

import { SUPPORT_LINES, EMERGENCY } from '@/lib/support';

export default function Resources() {
  return (
    <div className="mx-auto w-full max-w-md animate-fade-up px-5 pb-20 pt-4">
      <h1 className="text-center text-2xl font-semibold text-ink">
        עוד דרכים לעזרה
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-center text-[15px] leading-relaxed text-muted">
        רגע יכול ללוות ולהרגיע, אבל יש רגעים שטוב לדבר עם אדם. לפנות לעזרה זו לא
        חולשה — זו אומץ. אתם לא לבד.
      </p>

      <div className="mt-7 space-y-3">
        {SUPPORT_LINES.map((r) => (
          <div key={r.name} className="card p-5">
            <p className="text-lg font-semibold text-ink">{r.name}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-muted">
              {r.who}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.phone && (
                <a
                  href={`tel:${r.phone}`}
                  className="press rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-white shadow-card"
                >
                  חיוג · {r.phoneLabel}
                </a>
              )}
              {r.site && (
                <a
                  href={r.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press rounded-full bg-surface-2 px-5 py-2.5 text-sm font-medium text-sage-deep hairline"
                >
                  לאתר
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-7 max-w-sm rounded-2xl bg-surface-2 p-4 text-center text-[13.5px] leading-relaxed text-muted">
        אם יש סכנה מיידית לכם או למישהו אחר — חייגו{' '}
        <a href={`tel:${EMERGENCY.mda}`} className="font-semibold text-clay">
          {EMERGENCY.mda}
        </a>{' '}
        (מד״א) או{' '}
        <a href={`tel:${EMERGENCY.police}`} className="font-semibold text-clay">
          {EMERGENCY.police}
        </a>{' '}
        (משטרה).
      </p>
    </div>
  );
}
