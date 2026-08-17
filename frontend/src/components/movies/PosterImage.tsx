'use client';

import { Clapperboard } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

function hueFromTitle(title: string): number {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash * 31 + title.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 360;
}

interface PosterImageProps {
  title: string;
  src?: string | null;
  className?: string;
  showTitle?: boolean;
}


export function PosterImage({ title, src, className, showTitle = true }: PosterImageProps) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={title}
        loading="lazy"
        onError={() => setFailed(true)}
        className={clsx('h-full w-full object-cover', className)}
      />
    );
  }

  const hue = hueFromTitle(title);
  return (
    <div
      className={clsx('flex h-full w-full flex-col items-center justify-center gap-3 p-4', className)}
      style={{
        background: `linear-gradient(160deg, hsl(${hue} 30% 24%) 0%, hsl(${(hue + 40) % 360} 45% 10%) 100%)`,
      }}
    >
      <Clapperboard className="h-8 w-8 text-white/40" aria-hidden />
      {showTitle && (
        <span className="line-clamp-3 text-center text-sm font-semibold leading-snug text-white/80">
          {title}
        </span>
      )}
    </div>
  );
}
