import type { Metadata, Viewport } from 'next';
import { Heebo } from 'next/font/google';
import './globals.css';
import ServiceWorker from '@/components/ServiceWorker';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heebo',
  display: 'swap',
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'רגע — מרחב רגוע לנשום בו',
  description:
    'רגע הוא מרחב שקט ופשוט להתמודדות עם חרדה: לתעד איך אתם מרגישים, לעשות תרגול הרגעה קצר, ולבדוק שוב. נשימה, סריקת גוף, עיגון בהווה, חמלה עצמית ועוד.',
  manifest: `${basePath}/manifest.json`,
  applicationName: 'רגע',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'רגע',
  },
  icons: {
    icon: `${basePath}/icons/icon-192.png`,
    apple: `${basePath}/icons/icon-192.png`,
  },
};

export const viewport: Viewport = {
  themeColor: '#f4efe4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable} suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before paint to avoid a day/night flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('rega.theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        style={{
          ['--font-app' as any]:
            'var(--font-heebo), system-ui, sans-serif',
        }}
      >
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
