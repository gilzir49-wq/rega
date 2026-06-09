// Domain types for רגע.

// 1–5 gentle scale of how settled a person feels right now.
// 1 = very stormy, 5 = quite calm.
export type MoodScore = 1 | 2 | 3 | 4 | 5;

export type EmotionTag =
  | 'anxiety'
  | 'fear'
  | 'loneliness'
  | 'restless'
  | 'sadness'
  | 'emptiness'
  | 'future'
  | 'overwhelm';

export type ToolId =
  | 'breath'
  | 'bodyscan'
  | 'grounding'
  | 'rain'
  | 'thoughts'
  | 'anicca'
  | 'metta'
  | 'writing'
  | 'wisdom';

export interface CheckIn {
  score: MoodScore;
  tags: EmotionTag[];
  note?: string;
}

export interface Session {
  id: string;
  date: number; // epoch ms
  tool: ToolId;
  before: CheckIn;
  after?: CheckIn;
  // free-form text produced by the writing tool (kept separate from the note)
  writing?: string;
}

// The screens of the three-step cycle + supporting screens.
export type Screen =
  | 'welcome'
  | 'before'
  | 'pick'
  | 'tool'
  | 'after'
  | 'done'
  | 'journal';
