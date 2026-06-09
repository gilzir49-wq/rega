import { MoodScore } from '@/lib/types';

// A soft, abstract face — not a loud emoji. A gentle circle whose mouth curve
// (and a faint color tint) shifts with the score. Calm, non-judgmental.
export default function MoodFace({
  score,
  className = '',
}: {
  score: MoodScore;
  className?: string;
}) {
  // mouth control-point y: lower number = smile, higher = downturn
  const mouth: Record<MoodScore, string> = {
    1: 'M8 16 Q12 13 16 16', // gentle downturn
    2: 'M8 15.5 Q12 14 16 15.5',
    3: 'M8 15 H16', // neutral
    4: 'M8 15 Q12 17 16 15',
    5: 'M8 14.5 Q12 17.5 16 14.5', // soft smile
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={24}
      height={24}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="10" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="0.6" fill="currentColor" stroke="none" />
      <path d={mouth[score]} />
    </svg>
  );
}
