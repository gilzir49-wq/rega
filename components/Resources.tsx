'use client';

// Reachable support resources. Veteran-aware: נט"ל is Israel's line for trauma
// on a national/security background (soldiers, reservists, terror & war). Always
// gentle, never alarming — just quietly here if it's needed.

interface Resource {
  name: string;
  who: string;
  phone?: string;
  phoneLabel?: string;
  site?: string;
}

const RESOURCES: Resource[] = [
  {
    name: 'נט״ל',
    who: 'תמיכה בנפגעי טראומה על רקע לאומי וביטחוני — חיילים, מילואימניקים ומשפחות. שיחה חינמית וחסויה.',
    phone: '1800363363',
    phoneLabel: '1-800-363-363',
    site: 'https://www.natal.org.il',
  },
  {
    name: 'ער״ן',
    who: 'עזרה ראשונה נפשית, בכל שעה, לכל אדם. אנונימי וחינמי, 24/7.',
    phone: '1201',
    phoneLabel: '1201',
    site: 'https://www.eran.org.il',
  },
  {
    name: 'סה״ר',
    who: 'סיוע והקשבה ברשת — אם נוח לכם יותר בכתב מאשר בטלפון.',
    site: 'https://sahar.org.il',
  },
];

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
        {RESOURCES.map((r) => (
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
        <a href="tel:101" className="font-semibold text-clay">
          101
        </a>{' '}
        (מד״א) או{' '}
        <a href="tel:100" className="font-semibold text-clay">
          100
        </a>{' '}
        (משטרה).
      </p>
    </div>
  );
}
