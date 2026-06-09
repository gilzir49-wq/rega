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
// A full spectrum, organized into gentle clusters so naming a feeling stays
// calm rather than overwhelming. Naming what we feel is itself regulating.
export const EMOTIONS: { id: EmotionTag; label: string }[] = [
  // activating / difficult
  { id: 'anxiety', label: 'חרדה' },
  { id: 'fear', label: 'פחד' },
  { id: 'anger', label: 'כעס' },
  { id: 'frustration', label: 'תסכול' },
  { id: 'irritable', label: 'עצבנות' },
  { id: 'overwhelm', label: 'הצפה' },
  { id: 'restless', label: 'חוסר שקט' },
  { id: 'onedge', label: 'דריכות' },
  // heavy / down
  { id: 'sadness', label: 'עצב' },
  { id: 'loneliness', label: 'בדידות' },
  { id: 'emptiness', label: 'ריקנות' },
  { id: 'guilt', label: 'אשמה' },
  { id: 'shame', label: 'בושה' },
  { id: 'despair', label: 'ייאוש' },
  { id: 'numb', label: 'ניתוק' },
  { id: 'tired', label: 'עייפות' },
  { id: 'confusion', label: 'בלבול' },
  { id: 'future', label: 'מחשבות על העתיד' },
  // lighter
  { id: 'calm', label: 'רוגע' },
  { id: 'relief', label: 'הקלה' },
  { id: 'hope', label: 'תקווה' },
  { id: 'gratitude', label: 'הכרת תודה' },
  { id: 'joy', label: 'שמחה' },
];

export const EMOTION_LABEL: Record<EmotionTag, string> = EMOTIONS.reduce(
  (acc, e) => ((acc[e.id] = e.label), acc),
  {} as Record<EmotionTag, string>,
);

// Gentle clusters for the check-in UI. The lighter group is softly set apart so
// it's clear there's room for ease too, not only difficulty.
export const EMOTION_GROUPS: { hint?: string; ids: EmotionTag[] }[] = [
  {
    ids: [
      'anxiety',
      'fear',
      'anger',
      'frustration',
      'irritable',
      'overwhelm',
      'restless',
      'onedge',
    ],
  },
  {
    ids: [
      'sadness',
      'loneliness',
      'emptiness',
      'guilt',
      'shame',
      'despair',
      'numb',
      'tired',
      'confusion',
      'future',
    ],
  },
  {
    hint: 'ולצד זה, אולי גם —',
    ids: ['calm', 'relief', 'hope', 'gratitude', 'joy'],
  },
];

// Which tags belong to the "lighter" cluster — used to tint them warmly.
export const LIGHT_EMOTIONS: EmotionTag[] = [
  'calm',
  'relief',
  'hope',
  'gratitude',
  'joy',
];

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
    suits: ['anxiety', 'restless', 'overwhelm', 'fear', 'anger', 'frustration', 'irritable', 'onedge', 'tired'],
  },
  {
    id: 'grounding',
    name: 'עיגון בהווה · 5·4·3·2·1',
    blurb: 'חוזרים אל החושים, אל הרגע שקורה ממש עכשיו.',
    minutes: '3–5 דק׳',
    suits: ['anxiety', 'fear', 'overwhelm', 'future', 'onedge', 'numb', 'confusion', 'irritable'],
  },
  {
    id: 'bodyscan',
    name: 'סריקת גוף',
    blurb: 'מסע איטי מהראש ועד כפות הרגליים.',
    minutes: '3–5 דק׳',
    suits: ['restless', 'overwhelm', 'sadness', 'tired', 'numb'],
  },
  {
    id: 'rain',
    name: 'RAIN · מפגש עם רגש',
    blurb: 'ארבעה צעדים עדינים מול רגש קשה.',
    minutes: '3–5 דק׳',
    suits: ['sadness', 'fear', 'loneliness', 'anxiety', 'anger', 'guilt', 'shame'],
  },
  {
    id: 'thoughts',
    name: 'התבוננות במחשבות',
    blurb: 'מחשבות כעננים שחולפים, בלי להיאחז.',
    minutes: '2–4 דק׳',
    suits: ['future', 'restless', 'overwhelm', 'anxiety', 'frustration', 'confusion'],
  },
  {
    id: 'metta',
    name: 'חמלה ואהבה',
    blurb: 'משאלות טוב — לעצמכם, לאדם אהוב, ולכולם.',
    minutes: '3–4 דק׳',
    suits: ['loneliness', 'sadness', 'emptiness', 'shame', 'guilt', 'despair', 'gratitude'],
  },
  {
    id: 'anicca',
    name: 'חוכמת הארעיות',
    blurb: 'תזכורת רכה שהכול חולף — גם הרגע הזה.',
    minutes: '1–2 דק׳',
    suits: ['future', 'emptiness', 'sadness', 'fear', 'despair'],
  },
  {
    id: 'wisdom',
    name: 'קלף חוכמה',
    blurb: 'רעיון קטן ומרגיע ללכת איתו.',
    minutes: '1 דק׳',
    suits: ['emptiness', 'future', 'loneliness', 'despair', 'hope'],
  },
  {
    id: 'writing',
    name: 'כתיבה חופשית',
    blurb: 'דף ריק ושקט, לכתוב מה שעולה.',
    minutes: '3–5 דק׳',
    suits: ['sadness', 'loneliness', 'emptiness', 'overwhelm', 'guilt', 'shame', 'numb', 'confusion', 'anger'],
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
