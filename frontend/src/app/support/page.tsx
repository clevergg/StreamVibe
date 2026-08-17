'use client';

import { Mail, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import { FaqSection } from '@/components/home/FaqSection';

const CONTACTS = [
  { icon: Mail, title: 'Почта', value: 'support@streamvibe.ru' },
  { icon: Phone, title: 'Телефон', value: '8 (800) 000-00-00' },
  { icon: MessageCircle, title: 'Чат', value: 'Круглосуточно в приложении' },
];

export default function SupportPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="container py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold">Добро пожаловать в поддержку</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-grey-60">
              Мы на связи 24/7 и отвечаем в течение часа. Опишите проблему — поможем с оплатой,
              качеством видео, настройкой устройств и любыми другими вопросами.
            </p>
            <div className="mt-8 space-y-4">
              {CONTACTS.map(({ icon: Icon, title, value }) => (
                <div key={title} className="flex items-center gap-4 rounded-xl border border-black-15 bg-black-10 p-4">
                  <span className="rounded-lg bg-red-45/15 p-2.5">
                    <Icon className="h-5 w-5 text-red-45" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs text-grey-60">{title}</p>
                    <p className="text-sm font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Форма обращения (демо: без реальной отправки) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="h-fit rounded-xl border border-black-15 bg-black-10 p-6"
          >
            {sent ? (
              <div className="py-16 text-center">
                <p className="text-lg font-bold">Обращение отправлено ✅</p>
                <p className="mt-2 text-sm text-grey-60">Ответим на почту в течение часа.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Имя *" className="rounded-lg border border-black-15 bg-black-06 px-4 py-2.5 text-sm outline-none placeholder:text-grey-60 focus:border-red-45" />
                  <input required type="email" placeholder="Почта *" className="rounded-lg border border-black-15 bg-black-06 px-4 py-2.5 text-sm outline-none placeholder:text-grey-60 focus:border-red-45" />
                </div>
                <input placeholder="Тема обращения" className="mt-4 w-full rounded-lg border border-black-15 bg-black-06 px-4 py-2.5 text-sm outline-none placeholder:text-grey-60 focus:border-red-45" />
                <textarea required rows={5} placeholder="Опишите проблему *" className="mt-4 w-full rounded-lg border border-black-15 bg-black-06 px-4 py-2.5 text-sm outline-none placeholder:text-grey-60 focus:border-red-45" />
                <button type="submit" className="mt-4 w-full rounded-lg bg-red-45 py-3 text-sm font-semibold transition-colors hover:bg-red-40">
                  Отправить
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
