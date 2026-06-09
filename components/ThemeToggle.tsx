'use client';

import { useEffect, useState } from 'react';
import { applyTheme, getTheme, Theme } from '@/lib/storage';
import { SunIcon, MoonIcon } from './Icons';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'מצב יום' : 'מצב לילה'}
      className="press grid h-11 w-11 place-items-center rounded-full bg-surface text-sage-deep shadow-card hairline"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
