import type { Metadata } from 'next';
import { Check, X } from 'lucide-react';
import { CtaBanner } from '@/components/home/CtaBanner';
import { PricingSection } from '@/components/home/PricingSection';

export const metadata: Metadata = {
  title: 'Подписки — StreamVibe',
};

const ROWS: { feature: string; values: (string | boolean)[] }[] = [
  { feature: 'Цена в месяц', values: ['199 ₽', '399 ₽', '599 ₽'] },
  { feature: 'Устройств одновременно', values: ['1', '2', '4'] },
  { feature: 'Максимальное качество', values: ['HD', 'Full HD', '4K + HDR'] },
  { feature: 'Без рекламы', values: [false, true, true] },
  { feature: 'Офлайн-загрузка', values: [false, true, true] },
  { feature: 'Приоритетная поддержка', values: [false, false, true] },
  { feature: 'Бесплатный период', values: ['7 дней', '7 дней', '7 дней'] },
  { feature: 'Отмена в любой момент', values: [true, true, true] },
];

export default function SubscriptionsPage() {
  return (
    <>
      <PricingSection />

      <section className="container py-10">
        <h2 className="mb-6 text-2xl font-bold">Сравнение тарифов</h2>
        <div className="overflow-x-auto rounded-xl border border-black-15">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-black-15 bg-black-10 text-left">
                <th className="px-6 py-4 font-semibold">Возможности</th>
                <th className="px-6 py-4 font-semibold">Базовый</th>
                <th className="px-6 py-4 font-semibold text-red-45">Стандартный</th>
                <th className="px-6 py-4 font-semibold">Премиум</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-black-12 last:border-0">
                  <td className="px-6 py-4 text-grey-70">{row.feature}</td>
                  {row.values.map((value, i) => (
                    <td key={i} className="px-6 py-4">
                      {typeof value === 'boolean' ? (
                        value ? (
                          <Check className="h-4 w-4 text-green-500" aria-label="Да" />
                        ) : (
                          <X className="h-4 w-4 text-black-25" aria-label="Нет" />
                        )
                      ) : (
                        <span className="font-semibold">{value}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
