import { ToolId } from '@/lib/types';

// A cohesive set of soft, rounded line icons (24×24, currentColor) — no emojis.
// strokeWidth 1.6, round caps/joins → calm, hand-drawn feel that inverts for
// free between selected (filled) and idle states.

type P = { className?: string };
const base = (className?: string) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className,
});

// ---- Tool icons ----
export const BreathIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="7.5" opacity="0.55" />
    <circle cx="12" cy="12" r="10.5" opacity="0.3" />
  </svg>
);

export const GroundingIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 3v10" />
    <path d="M8.5 6.5 12 3l3.5 3.5" />
    <path d="M5 13a7 7 0 0 0 14 0" />
    <path d="M12 13v7" />
  </svg>
);

export const BodyScanIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="5" r="2.2" />
    <path d="M12 7.2v7" />
    <path d="M7.5 10.5 12 9l4.5 1.5" />
    <path d="M12 14.2 9 21" />
    <path d="M12 14.2 15 21" />
  </svg>
);

export const RainIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M7 15a4 4 0 0 1 .6-7.95A5 5 0 0 1 17 7.5a3.5 3.5 0 0 1 .3 7" />
    <path d="M8 18.5v1.5" />
    <path d="M12 18.5v2" />
    <path d="M16 18.5v1.5" />
  </svg>
);

export const ThoughtsIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M6 13a3 3 0 0 1 .4-6 4 4 0 0 1 7.6-1.2A3.2 3.2 0 0 1 18 12H6z" opacity="0.85" />
    <path d="M7.5 17h7" opacity="0.5" />
    <path d="M9.5 20h4" opacity="0.35" />
  </svg>
);

export const MettaIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 20s-6.5-4.2-8.4-8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8.4 5c-1.9 3.8-8.4 8-8.4 8z" />
  </svg>
);

export const AniccaIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M6 4h12" />
    <path d="M6 20h12" />
    <path d="M7 4c0 4 4 5 5 8-1 3-5 4-5 8" opacity="0.85" />
    <path d="M17 4c0 4-4 5-5 8 1 3 5 4 5 8" opacity="0.85" />
  </svg>
);

export const WisdomIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 3l1.8 4.8L18.6 9 14 11.2 12 16l-2-4.8L5.4 9l4.8-1.2z" />
    <path d="M18 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" opacity="0.6" />
  </svg>
);

export const WritingIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 20h16" opacity="0.5" />
    <path d="M15.5 4.5a2 2 0 0 1 3 3L9 17l-4 1 1-4z" />
    <path d="M13.5 6.5l3 3" />
  </svg>
);

// ---- UI icons ----
export const SunIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
  </svg>
);

export const MoonIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M20 13.5A8 8 0 1 1 10.5 4a6.2 6.2 0 0 0 9.5 9.5z" />
  </svg>
);

export const JournalIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H18a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 18.5z" />
    <path d="M5 17.5A1.5 1.5 0 0 1 6.5 16H19" />
    <path d="M9 7.5h6M9 11h4" opacity="0.6" />
  </svg>
);

export const ShareIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="6" cy="12" r="2.4" />
    <circle cx="17.5" cy="6" r="2.4" />
    <circle cx="17.5" cy="18" r="2.4" />
    <path d="M8.1 10.9 15.4 7.1M8.1 13.1l7.3 3.8" />
  </svg>
);

export const TrashIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 7h16" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
    <path d="M6 7l1 12.5A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5L18 7" />
  </svg>
);

export const BackIcon = ({ className }: P) => (
  // RTL "back" points right (toward where you came from in a rtl flow)
  <svg {...base(className)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M5 12.5l4.5 4.5L19 6.5" />
  </svg>
);

export const SparkIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 4c.6 3.4 1.8 4.6 5.2 5.2-3.4.6-4.6 1.8-5.2 5.2-.6-3.4-1.8-4.6-5.2-5.2C10.2 8.6 11.4 7.4 12 4z" />
    <path d="M18 15c.3 1.5.8 2 2.3 2.3-1.5.3-2 .8-2.3 2.3-.3-1.5-.8-2-2.3-2.3 1.5-.3 2-.8 2.3-2.3z" opacity="0.6" />
  </svg>
);

export const LeafIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 13" />
    <path d="M5 19c3-5 6-7 9-8.5" opacity="0.6" />
  </svg>
);

const TOOL_ICON: Record<ToolId, (p: P) => JSX.Element> = {
  breath: BreathIcon,
  grounding: GroundingIcon,
  bodyscan: BodyScanIcon,
  rain: RainIcon,
  thoughts: ThoughtsIcon,
  metta: MettaIcon,
  anicca: AniccaIcon,
  wisdom: WisdomIcon,
  writing: WritingIcon,
};

export function ToolIcon({ id, className }: { id: ToolId; className?: string }) {
  const C = TOOL_ICON[id];
  return <C className={className} />;
}
