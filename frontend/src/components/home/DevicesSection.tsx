import { Gamepad2, Laptop, MonitorPlay, Smartphone, Tablet, Tv } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

const DEVICES = [
  { icon: Smartphone, title: 'Смартфоны', text: 'Приложение для Android и iOS — фильмы всегда с собой, даже офлайн.' },
  { icon: Tablet, title: 'Планшеты', text: 'Удобный просмотр на большом экране планшета в дороге и дома.' },
  { icon: Laptop, title: 'Ноутбуки', text: 'Смотрите в браузере без установки — достаточно войти в аккаунт.' },
  { icon: Tv, title: 'Smart TV', text: 'Поддержка Samsung, LG, Android TV и других платформ.' },
  { icon: Gamepad2, title: 'Игровые консоли', text: 'PlayStation и Xbox — кино там же, где и игры.' },
  { icon: MonitorPlay, title: 'VR-устройства', text: 'Эффект личного кинозала в очках виртуальной реальности.' },
];

export function DevicesSection() {
  return (
    <section className="container py-10">
      <SectionTitle
        title="Смотрите на любых устройствах"
        subtitle="Начните фильм на телевизоре и продолжите на телефоне — прогресс синхронизируется автоматически."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEVICES.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-xl border border-black-15 bg-gradient-to-br from-black-10 to-black-06 p-6"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-red-45/15 p-2.5">
                <Icon className="h-5 w-5 text-red-45" aria-hidden />
              </span>
              <h3 className="font-bold">{title}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-grey-60">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
