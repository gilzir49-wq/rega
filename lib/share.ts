// The app's own public URL, derived at runtime from wherever it's served —
// so it automatically uses the live domain with zero code changes. Included in
// every share so it gently spreads to whoever might need it.
export function appUrl(): string {
  const fallback = 'https://gilzir49-wq.github.io/rega/';
  if (typeof window === 'undefined') return fallback;
  const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${window.location.origin}${bp}/`;
}

export function buildAppShareText(): string {
  return [
    'רגע — מרחב רגוע לנשום בו 🌿',
    'כלי חינמי וקטן להתמודדות עם חרדה: לתעד איך מרגישים, לעשות תרגול הרגעה קצר, ולבדוק שוב. בלי הרשמה, הכול נשאר אצלכם בטלפון.',
    '',
    appUrl(),
  ].join('\n');
}

// Native share sheet on mobile, clipboard fallback elsewhere.
// Returns a short status word for an optional toast.
export async function shareApp(): Promise<'shared' | 'copied' | 'failed'> {
  const text = buildAppShareText();
  const url = appUrl();
  try {
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      await (navigator as any).share({ title: 'רגע', text, url });
      return 'shared';
    }
  } catch {
    // user dismissed the sheet — fall through to clipboard
  }
  try {
    await navigator.clipboard.writeText(text);
    return 'copied';
  } catch {
    return 'failed';
  }
}
