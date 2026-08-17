'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { SectionTitle } from '@/components/ui/SectionTitle';

const PLANS = [
  {
    name: 'Базовый',
    monthly: 199,
    features: ['1 устройство', 'Качество до HD', 'Каталог фильмов и сериалов', 'С рекламой'],
    highlighted: false,
  },
  {
    name: 'Стандартный',
    monthly: 399,
    features: ['2 устройства', 'Качество Full HD', 'Без рекламы', 'Офлайн-загрузка'],
    highlighted: true,
  },
  {
    name: 'Премиум',
    monthly: 599,
    features: ['4 устройства', '4K + HDR', 'Без рекламы', 'Офлайн-загрузка', 'Приоритетная поддержка'],
    highlighted: false,
  },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="container py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          title="Выберите тариф под себя"
          subtitle="Прозрачные цены без скрытых платежей. Отмена в любой момент, первые 7 дней — бесплатно."
        />
        <div className="mb-8 flex w-fit shrink-0 rounded-xl border border-black-12 bg-black-06 p-1.5">
          {(['Ежемесячно', 'Ежегодно'] as const).map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setYearly(i === 1)}
              className={clsx(
                'rounded-lg px-4 py-2 text-sm transition-colors',
                (i === 1) === yearly ? 'bg-black-10 font-semibold text-white' : 'text-grey-60',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const price = yearly ? plan.monthly * 10 : plan.monthly;
          return (
            <div
              key={plan.name}
              className={clsx(
                'rounded-xl border p-8',
                plan.highlighted ? 'border-red-45/60 bg-black-10' : 'border-black-15 bg-black-06',
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-red-45/15 px-3 py-1 text-xs font-semibold text-red-45">
                    Популярный
                  </span>
                )}
              </div>
              <p className="mt-4">
                <span className="text-3xl font-extrabold">{price.toLocaleString('ru-RU')} ₽</span>
                <span className="text-sm text-grey-60"> / {yearly ? 'год' : 'месяц'}</span>
              </p>
              {yearly && <p className="mt-1 text-xs text-green-500">2 месяца в подарок</p>}

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-grey-70">
                    <Check className="h-4 w-4 shrink-0 text-red-45" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={clsx(
                  'mt-8 w-full rounded-lg py-3 text-sm font-semibold transition-colors',
                  plan.highlighted
                    ? 'bg-red-45 hover:bg-red-40'
                    : 'border border-black-15 bg-black-10 hover:bg-black-12',
                )}
              >
                Попробовать бесплатно
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
