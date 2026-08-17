'use client';

import { MessageSquareText, X } from 'lucide-react';
import { useEffect } from 'react';
import { useLiveStore } from '@/store/live';

export function LiveProvider({ children }: { children: React.ReactNode }) {
  const connect = useLiveStore((s) => s.connect);
  const lastReview = useLiveStore((s) => s.lastReview);
  const clearLastReview = useLiveStore((s) => s.clearLastReview);

  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (!lastReview) return;
    const timer = setTimeout(clearLastReview, 6000);
    return () => clearTimeout(timer);
  }, [lastReview, clearLastReview]);

  return (
    <>
      {children}
      {lastReview && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-[100] w-80 rounded-xl border border-black-15 bg-black-10 p-4 shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <span className="rounded-lg bg-red-45/15 p-2">
              <MessageSquareText className="h-4 w-4 text-red-45" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Новый отзыв</p>
              <p className="mt-0.5 truncate text-xs text-grey-60">
                {lastReview.author}
                {lastReview.movieTitle ? ` — «${lastReview.movieTitle}»` : ''} · {lastReview.rating}/10
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-grey-70">{lastReview.text}</p>
            </div>
            <button
              type="button"
              onClick={clearLastReview}
              aria-label="Закрыть уведомление"
              className="text-grey-60 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
