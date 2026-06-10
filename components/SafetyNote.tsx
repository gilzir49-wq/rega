'use client';

import { SUPPORT_LINES, EMERGENCY } from '@/lib/support';

// A gentle, non-blocking support card shown when the on-device safety net
// notices possible distress in free text. Warm, never alarming, and dismissible
// — the person stays in control. Shows the two phone lines + emergency.
export default function SafetyNote({ onDismiss }: { onDismiss: () => void }) {
  const lines = SUPPORT_LINES.filter((l) => l.phone);
  return (
    <div className="mt-4 animate-fade-in rounded-2xl bg-surface-2 p-5 hairline">
      <p className="text-[15px] font-semibold text-ink">
        נראה שאולי ממש קשה לך עכשיו.
      </p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
        אתם לא לבד, ויש מי שאפשר לדבר איתו עכשיו — בלי שיפוט, בכל שעה. לפנות זה
        אומץ, לא חולשה.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {lines.map((l) => (
          <a
            key={l.name}
            href={`tel:${l.phone}`}
            className="press rounded-full bg-sage px-4 py-2.5 text-sm font-medium text-white shadow-card"
          >
            {l.name} · {l.phoneLabel}
          </a>
        ))}
        <a
          href={`tel:${EMERGENCY.mda}`}
          className="press rounded-full bg-surface px-4 py-2.5 text-sm font-medium text-clay shadow-card hairline"
        >
          חירום · {EMERGENCY.mda}
        </a>
      </div>

      <button
        onClick={onDismiss}
        className="press mt-3 text-[13px] text-muted underline-offset-2 hover:underline"
      >
        תודה, הבנתי
      </button>
    </div>
  );
}
