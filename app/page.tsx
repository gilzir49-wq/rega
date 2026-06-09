'use client';

import { useState } from 'react';
import { CheckIn as CheckInData, Screen, Session, ToolId } from '@/lib/types';
import { MOOD_LABELS } from '@/lib/content';
import { ANICCA_CARDS, WISDOM_CARDS } from '@/lib/guidance';
import { newId, saveSession } from '@/lib/storage';
import { shareApp } from '@/lib/share';

import ThemeToggle from '@/components/ThemeToggle';
import CheckIn from '@/components/CheckIn';
import ToolPicker from '@/components/ToolPicker';
import Journal from '@/components/Journal';
import { JournalIcon, BackIcon, ShareIcon, CheckIcon } from '@/components/Icons';

import BreathTool from '@/components/tools/BreathTool';
import BodyScan from '@/components/tools/BodyScan';
import Grounding from '@/components/tools/Grounding';
import RainTool from '@/components/tools/RainTool';
import Thoughts from '@/components/tools/Thoughts';
import MettaTool from '@/components/tools/MettaTool';
import FreeWrite from '@/components/tools/FreeWrite';
import CardTool from '@/components/tools/CardTool';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [before, setBefore] = useState<CheckInData | null>(null);
  const [tool, setTool] = useState<ToolId | null>(null);
  const [after, setAfter] = useState<CheckInData | null>(null);
  const [writing, setWriting] = useState<string | undefined>(undefined);
  const [toast, setToast] = useState<string | null>(null);

  const reset = () => {
    setBefore(null);
    setTool(null);
    setAfter(null);
    setWriting(undefined);
  };

  const goHome = () => {
    reset();
    setScreen('welcome');
  };

  const onBefore = (data: CheckInData) => {
    setBefore(data);
    setScreen('pick');
  };

  const onPick = (id: ToolId) => {
    setTool(id);
    setScreen('tool');
  };

  const onToolDone = (w?: string) => {
    if (w) setWriting(w);
    setScreen('after');
  };

  const onAfter = (data: CheckInData) => {
    setAfter(data);
    if (before && tool) {
      const session: Session = {
        id: newId(),
        date: Date.now(),
        tool,
        before,
        after: data,
        writing,
      };
      saveSession(session);
    }
    setScreen('done');
  };

  const doShare = async () => {
    const res = await shareApp();
    if (res === 'copied') setToast('הקישור הועתק 🌿');
    else if (res === 'shared') setToast('תודה ששיתפתם');
    if (res !== 'shared') setTimeout(() => setToast(null), 2200);
  };

  const inFlow = screen !== 'welcome';

  return (
    <main className="relative min-h-[100dvh]">
      {/* Top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          {inFlow ? (
            <button
              onClick={goHome}
              aria-label="חזרה"
              className="press grid h-11 w-11 place-items-center rounded-full bg-surface text-sage-deep shadow-card hairline"
            >
              <BackIcon className="h-5 w-5" />
            </button>
          ) : (
            <span className="select-none text-lg font-semibold tracking-wide text-sage-deep">
              רגע
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {screen !== 'journal' && (
            <button
              onClick={() => setScreen('journal')}
              aria-label="היומן שלי"
              className="press grid h-11 w-11 place-items-center rounded-full bg-surface text-sage-deep shadow-card hairline"
            >
              <JournalIcon className="h-5 w-5" />
            </button>
          )}
          <ThemeToggle />
        </div>
      </header>

      {/* Screens */}
      {screen === 'welcome' && (
        <Welcome onStart={() => setScreen('before')} onShare={doShare} />
      )}

      {screen === 'before' && (
        <CheckIn
          title="איך אתם מרגישים עכשיו?"
          subtitle="קחו רגע לשים לב. אין תשובה נכונה — רק מה שיש."
          submitLabel="זה מה שיש כרגע"
          onSubmit={onBefore}
        />
      )}

      {screen === 'pick' && (
        <ToolPicker tags={before?.tags ?? []} onPick={onPick} />
      )}

      {screen === 'tool' && tool && (
        <ToolView id={tool} onDone={onToolDone} />
      )}

      {screen === 'after' && (
        <CheckIn
          title="ואיך אתם מרגישים עכשיו?"
          subtitle="אותה בדיקה עדינה, אחרי שעצרתם לרגע."
          submitLabel="סיימתי"
          onSubmit={onAfter}
        />
      )}

      {screen === 'done' && before && after && (
        <Done
          before={before}
          after={after}
          onJournal={() => setScreen('journal')}
          onAgain={() => {
            reset();
            setScreen('before');
          }}
          onHome={goHome}
        />
      )}

      {screen === 'journal' && <Journal />}

      {/* toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 z-30 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm text-bg shadow-soft">
          {toast}
        </div>
      )}
    </main>
  );
}

// ---- Welcome ----
function Welcome({
  onStart,
  onShare,
}: {
  onStart: () => void;
  onShare: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[82vh] w-full max-w-md flex-col items-center justify-center px-6 text-center">
      <div className="animate-fade-up">
        {/* breathing mark */}
        <div className="relative mx-auto mb-8 grid h-28 w-28 place-items-center">
          <span className="absolute h-28 w-28 animate-breathe rounded-full bg-sage/15" style={{ animationDuration: '8s' }} />
          <span className="absolute h-20 w-20 animate-breathe rounded-full bg-sage/25" style={{ animationDuration: '8s' }} />
          <span className="h-12 w-12 rounded-full bg-sage shadow-glow" />
        </div>

        <h1 className="text-4xl font-semibold tracking-wide text-ink">רגע</h1>
        <p className="mx-auto mt-4 max-w-xs text-[17px] leading-relaxed text-muted text-balance">
          יש לך כאן מקום לנשום בו.
          <br />
          לעצור רגע, לבדוק מה עובר עליך, ולמצוא קצת שקט.
        </p>

        <button
          onClick={onStart}
          className="press mt-10 w-full rounded-full bg-sage py-4 text-lg font-medium text-white shadow-soft"
        >
          אני כאן. בואו נתחיל
        </button>

        <button
          onClick={onShare}
          className="press mx-auto mt-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted"
        >
          <ShareIcon className="h-4 w-4" />
          שִתפו את רגע עם מי שצריך
        </button>
      </div>

      {/* Gentle safety note */}
      <div className="mt-12 max-w-sm">
        <p className="text-[12.5px] leading-relaxed text-muted/90">
          רגע נועד לתמוך ולהרגיע, והוא לא מחליף ליווי מקצועי. אם קשה לך מאוד,
          מותר ונכון לפנות לעזרה — ב<span className="font-medium text-muted">ער״ן</span>,
          עזרה ראשונה נפשית, בטלפון{' '}
          <a href="tel:1201" className="font-medium text-sage-deep underline-offset-2 hover:underline">
            1201
          </a>{' '}
          (בחינם, 24/7).
        </p>
      </div>
    </div>
  );
}

// ---- Tool switch ----
function ToolView({
  id,
  onDone,
}: {
  id: ToolId;
  onDone: (writing?: string) => void;
}) {
  switch (id) {
    case 'breath':
      return <BreathTool onDone={() => onDone()} />;
    case 'bodyscan':
      return <BodyScan onDone={() => onDone()} />;
    case 'grounding':
      return <Grounding onDone={() => onDone()} />;
    case 'rain':
      return <RainTool onDone={() => onDone()} />;
    case 'thoughts':
      return <Thoughts onDone={() => onDone()} />;
    case 'metta':
      return <MettaTool onDone={() => onDone()} />;
    case 'writing':
      return <FreeWrite onDone={onDone} />;
    case 'anicca':
      return (
        <CardTool
          title="חוכמת הארעיות"
          subtitle="רעיון קטן על כך שהכול חולף — גם הרגע הזה."
          cards={ANICCA_CARDS}
          accent="sage"
          onDone={() => onDone()}
        />
      );
    case 'wisdom':
      return (
        <CardTool
          title="קלף חוכמה"
          subtitle="משהו קטן ללכת איתו."
          cards={WISDOM_CARDS}
          accent="clay"
          onDone={() => onDone()}
        />
      );
    default:
      return null;
  }
}

// ---- Done (gentle comparison) ----
function Done({
  before,
  after,
  onJournal,
  onAgain,
  onHome,
}: {
  before: CheckInData;
  after: CheckInData;
  onJournal: () => void;
  onAgain: () => void;
  onHome: () => void;
}) {
  let message: string;
  if (after.score > before.score) {
    message = `לפני הרגשתם ”${MOOD_LABELS[before.score]}“, ועכשיו ”${MOOD_LABELS[after.score]}“. כל צעד קטן נחשב — ועצרתם בשבילו.`;
  } else if (after.score === before.score) {
    message =
      'נשארתם פחות או יותר באותו מקום, וגם זה בסדר גמור. עצם זה שעצרתם לרגע בשביל עצמכם — זו כבר מתנה.';
  } else {
    message =
      'לפעמים כשעוצרים, צפים דברים, וזה יכול להרגיש קצת יותר. זה אנושי לגמרי — שום דבר בכם לא שבור. עצם הנוכחות שלכם כאן חשובה, ואתם לא לבד.';
  }

  return (
    <div className="mx-auto flex min-h-[78vh] w-full max-w-md flex-col items-center justify-center px-6 text-center">
      <div className="animate-fade-up">
        <span className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-sage text-white shadow-glow">
          <CheckIcon className="h-10 w-10" />
        </span>
        <p className="mx-auto max-w-sm text-[18px] leading-relaxed text-ink text-balance">
          {message}
        </p>

        <div className="mt-10 space-y-3">
          <button
            onClick={onHome}
            className="press w-full rounded-full bg-sage py-4 text-lg font-medium text-white shadow-soft"
          >
            חזרה למסך הבית
          </button>
          <button
            onClick={onAgain}
            className="press w-full rounded-full bg-surface py-3.5 font-medium text-sage-deep shadow-card hairline"
          >
            עוד תרגול קטן
          </button>
          <button
            onClick={onJournal}
            className="press w-full rounded-full px-4 py-2 text-sm text-muted"
          >
            צפייה ביומן
          </button>
        </div>
      </div>
    </div>
  );
}
