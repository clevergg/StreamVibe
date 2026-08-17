'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';
import { api } from '@/lib/api';
import type { Review } from '@/lib/types';
import { SectionTitle } from '@/components/ui/SectionTitle';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function ReviewsSection({ movieId, initialReviews }: { movieId: number; initialReviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(8);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const review = await api.createReview(movieId, {
        author,
        location: location || undefined,
        rating,
        text,
      });
      setReviews((prev) => [review, ...prev]);
      setAuthor('');
      setLocation('');
      setText('');
      setRating(8);
    } catch {
      setError('Не удалось отправить отзыв. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container py-10">
      <SectionTitle title="Отзывы" subtitle="Поделитесь впечатлением — отзыв мгновенно увидят все, кто сейчас на сайте." />

      <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-black-15 bg-black-10 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            minLength={2}
            maxLength={60}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ваше имя *"
            className="rounded-lg border border-black-15 bg-black-06 px-4 py-2.5 text-sm outline-none placeholder:text-grey-60 focus:border-red-45"
          />
          <input
            value={location}
            maxLength={80}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Город (необязательно)"
            className="rounded-lg border border-black-15 bg-black-06 px-4 py-2.5 text-sm outline-none placeholder:text-grey-60 focus:border-red-45"
          />
        </div>

        <div className="mt-4 flex items-center gap-2" role="radiogroup" aria-label="Оценка">
          <span className="mr-2 text-sm text-grey-60">Оценка:</span>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} из 10`}
              onClick={() => setRating(value)}
              className="p-0.5"
            >
              <Star
                className={
                  value <= rating ? 'h-5 w-5 fill-yellow-400 text-yellow-400' : 'h-5 w-5 text-black-25'
                }
                aria-hidden
              />
            </button>
          ))}
          <span className="ml-1 text-sm font-semibold">{rating}/10</span>
        </div>

        <textarea
          required
          minLength={3}
          maxLength={2000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ваш отзыв *"
          rows={3}
          className="mt-4 w-full rounded-lg border border-black-15 bg-black-06 px-4 py-2.5 text-sm outline-none placeholder:text-grey-60 focus:border-red-45"
        />

        {error && <p className="mt-3 text-sm text-red-45">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 rounded-lg bg-red-45 px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-red-40 disabled:opacity-50"
        >
          {submitting ? 'Отправляем…' : 'Отправить отзыв'}
        </button>
      </form>

      {reviews.length === 0 ? (
        <p className="text-sm text-grey-60">Отзывов пока нет — станьте первым!</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-xl border border-black-15 bg-black-10 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{review.author}</p>
                  <p className="text-xs text-grey-60">
                    {review.location ? `${review.location} · ` : ''}
                    {formatDate(review.createdAt)}
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-full border border-black-15 px-3 py-1 text-sm font-semibold">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" aria-hidden />
                  {review.rating}/10
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-grey-70">{review.text}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
