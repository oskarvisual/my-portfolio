import React from 'react';
import remoteLiveWebp from '../assets/images/remote-live.webp';
import { getCdnImageUrl } from '../utils/cdn';

interface GameItem {
  id: string;
  title: string;
  description: string; // Max 150 chars
  url: string;
  imageSrc: string;
}

const GAMES: GameItem[] = [
  {
    id: 'remote-life',
    title: 'Remote Life',
    description:
      'Chaotic 2D pixel-art survival simulator: balance remote dev work, family chaos, and sanity without getting fired.',
    url: 'https://oskarvisual.github.io/Remote-Life/',
    imageSrc: getCdnImageUrl(remoteLiveWebp, 'remote-live.webp'),
  },
];

export const Games: React.FC = () => {
  return (
    <section
      id="games"
      className="relative bg-paper py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-ink/10 selection:bg-accent/20"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-accent" />
            <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
              INTERACTIVE &amp; PLAYABLE EXPERIMENTS
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-ink tracking-tight">
            My games.
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GAMES.map((game) => (
            <a
              key={game.id}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl border border-ink/15 bg-warm-50/70 hover:bg-warm-100/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-ink/30 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Screenshot Thumbnail */}
              <div className="w-full aspect-[16/9] bg-ink overflow-hidden border-b border-ink/10 relative">
                <img
                  src={game.imageSrc}
                  alt={`${game.title} screenshot`}
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Body: Only Title, Short Description (<=150 chars), and Play Link */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-ink tracking-tight group-hover:text-accent transition-colors">
                      {game.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-ink text-paper group-hover:bg-accent transition-colors shrink-0">
                      <span>Play</span>
                      <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </span>
                  </div>

                  <p className="font-sans text-ink-muted text-sm leading-relaxed mt-2.5">
                    {game.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
