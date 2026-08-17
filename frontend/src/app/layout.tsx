import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LiveProvider } from '@/components/live/LiveProvider';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'StreamVibe — фильмы и сериалы онлайн',
  description:
    'StreamVibe — онлайн-кинотеатр: лучшие фильмы, сериалы и новинки в одном месте. Смотрите на любых устройствах.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <LiveProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LiveProvider>
      </body>
    </html>
  );
}
