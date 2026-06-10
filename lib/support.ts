// Single source of truth for the human support lines, shared by the Resources
// screen and the on-device safety net. Veteran-aware: נט"ל first.

export interface SupportLine {
  name: string;
  who: string;
  phone?: string;
  phoneLabel?: string;
  site?: string;
}

export const SUPPORT_LINES: SupportLine[] = [
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

export const EMERGENCY = { mda: '101', police: '100' };
