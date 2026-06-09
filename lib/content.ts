import { EmotionTag, MoodScore, ToolId } from './types';

// ---- The 1–5 settledness scale (soft, not clinical) ----
export const MOOD_LABELS: Record<MoodScore, string> = {
  1: 'סוער מאוד',
  2: 'לא רגוע',
  3: 'באמצע',
  4: 'די רגוע',
  5: 'שקט',
};

export const MOOD_SCORES: MoodScore[] = [1, 2, 3, 4, 5];

// ---- Emotion tags a person can pick at check-in ----
export const EMOTIONS: { id: EmotionTag; label: string }[] = [
  { id: 'anxiety', label: 'חרדה' },
  { id: 'fear', label: 'פחד' },
  { id: 'overwhelm', label: 'הצפה' },
  { id: 'restless', label: 'חוסר שקט' },
  { id: 'sadness', label: 'עצב' },
  { id: 'loneliness', label: 'בדידות' },
  { id: 'emptiness', label: 'ריקנות' },
  { id: 'future', label: 'מחשבות על העתיד' },
];

export const EMOTION_LABEL: Record<EmotionTag, string> = EMOTIONS.reduce(
  (acc, e) => ((acc[e.id] = e.label), acc),
  {} as Record<EmotionTag, string>,
);

// ---- The toolbox ----
export interface ToolMeta {
  id: ToolId;
  name: string;
  blurb: string;
  minutes: string;
  // emotions this tool tends to help with — used by "הפתיעו אותי".
  suits: EmotionTag[];
}

export const TOOLS: ToolMeta[] = [
  {
    id: 'breath',
    name: 'נשימה מודעת',
    blurb: 'עיגול שמתרחב ומתכווץ, ואתם נושמים יחד איתו.',
    minutes: '2–4 דק׳',
    suits: ['anxiety', 'restless', 'overwhelm', 'fear'],
  },
  {
    id: 'grounding',
    name: 'עיגון בהווה · 5·4·3·2·1',
    blurb: 'חוזרים אל החושים, אל הרגע שקורה ממש עכשיו.',
    minutes: '3–5 דק׳',
    suits: ['anxiety', 'fear', 'overwhelm', 'future'],
  },
  {
    id: 'bodyscan',
    name: 'סריקת גוף',
    blurb: 'מסע איטי מהראש ועד כפות הרגליים.',
    minutes: '3–5 דק׳',
    suits: ['restless', 'overwhelm', 'sadness'],
  },
  {
    id: 'rain',
    name: 'RAIN · מפגש עם רגש',
    blurb: 'ארבעה צעדים עדינים מול רגש קשה.',
    minutes: '3–5 דק׳',
    suits: ['sadness', 'fear', 'loneliness', 'anxiety'],
  },
  {
    id: 'thoughts',
    name: 'התבוננות במחשבות',
    blurb: 'מחשבות כעננים שחולפים, בלי להיאחז.',
    minutes: '2–4 דק׳',
    suits: ['future', 'restless', 'overwhelm', 'anxiety'],
  },
  {
    id: 'metta',
    name: 'חמלה ואהבה',
    blurb: 'משאלות טוב — לעצמכם, לאדם אהוב, ולכולם.',
    minutes: '3–4 דק׳',
    suits: ['loneliness', 'sadness', 'emptiness'],
  },
  {
    id: 'anicca',
    name: 'חוכמת הארעיות',
    blurb: 'תזכורת רכה שהכול חולף — גם הרגע הזה.',
    minutes: '1–2 דק׳',
    suits: ['future', 'emptiness', 'sadness', 'fear'],
  },
  {
    id: 'wisdom',
    name: 'קלף חוכמה',
    blurb: 'רעיון קטן ומרגיע ללכת איתו.',
    minutes: '1 דק׳',
    suits: ['emptiness', 'future', 'loneliness'],
  },
  {
    id: 'writing',
    name: 'כתיבה חופשית',
    blurb: 'דף ריק ושקט, לכתוב מה שעולה.',
    minutes: '3–5 דק׳',
    suits: ['sadness', 'loneliness', 'emptiness', 'overwhelm'],
  },
];

export const TOOL_BY_ID: Record<ToolId, ToolMeta> = TOOLS.reduce(
  (acc, t) => ((acc[t.id] = t), acc),
  {} as Record<ToolId, ToolMeta>,
);

// Pick a tool that suits the chosen emotions; fall back to any tool.
export function suggestTool(tags: EmotionTag[], avoid?: ToolId): ToolId {
  const pool = TOOLS.filter((t) => t.id !== avoid);
  const matches = pool.filter((t) => t.suits.some((s) => tags.includes(s)));
  const from = matches.length ? matches : pool;
  return from[Math.floor(Math.random() * from.length)].id;
}
