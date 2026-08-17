'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';

const FAQ = [
  { q: 'Что такое StreamVibe?', a: 'StreamVibe — онлайн-кинотеатр с тысячами фильмов и сериалов: новинки, классика и эксклюзивные подборки в одном сервисе.' },
  { q: 'Сколько стоит подписка?', a: 'Есть три тарифа: Базовый за 199 ₽, Стандартный за 399 ₽ и Премиум за 599 ₽ в месяц. При оплате за год — два месяца в подарок.' },
  { q: 'На каких устройствах можно смотреть?', a: 'Смартфоны, планшеты, ноутбуки, Smart TV, игровые консоли и VR-устройства. Прогресс просмотра синхронизируется между всеми.' },
  { q: 'Есть ли бесплатный период?', a: 'Да, новым пользователям доступно 7 дней бесплатного просмотра на любом тарифе. Отменить можно в любой момент.' },
  { q: 'Как отменить подписку?', a: 'В настройках профиля в один клик. Доступ сохранится до конца оплаченного периода, деньги за неиспользованные дни не сгорают при годовой оплате.' },
  { q: 'Можно ли скачивать фильмы?', a: 'На тарифах Стандартный и Премиум доступна загрузка для офлайн-просмотра в мобильном приложении.' },
  { q: 'Сколько человек могут смотреть одновременно?', a: 'Зависит от тарифа: 1 устройство на Базовом, 2 — на Стандартном и 4 — на Премиуме.' },
  { q: 'В каком качестве доступны фильмы?', a: 'До Full HD на Базовом и Стандартном тарифах и до 4K с HDR на Премиуме — качество подстраивается под скорость интернета.' },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container py-10">
      <SectionTitle
        title="Часто задаваемые вопросы"
        subtitle="Не нашли ответ? Загляните в раздел поддержки — мы на связи круглосуточно."
      />
      <div className="grid gap-x-10 lg:grid-cols-2">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-black-15">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-black-15 bg-black-10 text-sm font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-semibold">{item.q}</span>
                {isOpen ? (
                  <Minus className="h-5 w-5 shrink-0 text-red-45" aria-hidden />
                ) : (
                  <Plus className="h-5 w-5 shrink-0 text-grey-60" aria-hidden />
                )}
              </button>
              {isOpen && <p className="pb-5 pl-[60px] text-sm leading-relaxed text-grey-60">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
