// On-device distress detection for free-text inputs. Pure, deterministic Hebrew
// pattern matching — nothing leaves the device (no network, no AI), so privacy
// is fully preserved. This is a gentle SAFETY NET, never a diagnosis: when a
// person writes something that may signal real distress, the app quietly
// surfaces human support. Tuned for high precision (genuine red flags) to avoid
// alarming someone who is only venting.

// High-signal phrases: suicidal ideation/intent, self-harm, and acute
// hopelessness with an exit wish. Kept specific on purpose.
const RED_FLAGS: RegExp[] = [
  // wanting to die / not wanting to live
  /רוצה למות/,
  /בא לי למות/,
  /מתחשק לי למות/,
  /לא רוצה (?:יותר )?לחיות/,
  /לא רוצה (?:יותר )?להמשיך לחיות/,
  /לא רוצה להתעורר/,
  /לא רוצה (?:יותר )?להיות (?:פה|כאן|בחיים|בעולם)/,
  /עדיף (?:לי )?(?:למות|לא להיות|שאמות|שלא אהיה)/,
  /טוב(?:ים)? יותר בלעד(?:יי|י)/,
  /(?:כולם|לכולם|העולם)[^.!?]{0,20}בלעד(?:יי|י)/,
  /אין (?:לי )?(?:סיבה|טעם|כוח) (?:אחת )?ל?(?:חיות|חיים)/,
  /(?:אין|איבדתי(?: את)?(?: כל)?(?: ה)?) ?(?:טעם|תקווה|סיבה)(?: לי)?(?: יותר)?(?: ל?חיים| ל?חיות)?/,
  /החיים (?:חסרי|בלי) טעם/,

  // ending it
  /לשים (?:סוף|קץ) (?:לחיים|לחיי|לסבל|לזה|להכול|לכל זה)/,
  /לסיים (?:את )?(?:החיים|חיי|הכול|הכל|הסבל)/,
  /לגמור עם (?:החיים|הכול|הכל)/,
  /להתאבד/,
  /אתאבד/,
  /מתאבד/,
  /אובדני/,
  /אובדנו(?:ת|יות)/,

  // self-harm
  /לפגוע (?:ב)?עצמי/,
  /פגיעה עצמית/,
  /לחתוך (?:את )?עצמי/,
  /חתכתי (?:את )?עצמי/,
  /לשרוף (?:את )?עצמי/,

  // harm to others
  /לפגוע ב(?:מישהו|מישהי|אחרים|כולם|בה|בו)/,
  /רוצה לרצוח/,
];

// Strip Hebrew niqqud and normalize whitespace, so spacing/vowels don't hide a
// match.
function normalize(text: string): string {
  return text
    .replace(/[֑-ׇ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function detectDistress(text: string | undefined | null): boolean {
  if (!text) return false;
  const t = normalize(text);
  if (t.length < 4) return false;
  return RED_FLAGS.some((re) => re.test(t));
}
