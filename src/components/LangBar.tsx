import { LangStat } from '../types/github'


// github api renk vermiyor, elle yazdım
// linguist reposundan baktım renklere

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python:     '#3572a5',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Java:       '#b07219',
  'C#':       '#178600',
  Go:         '#00add8',
  Rust:       '#dea584',
  Vue:        '#41b883',
  Ruby:       '#701516',
  PHP:        '#4f5d95',
  Swift:      '#fa7343',
  Kotlin:     '#a97bff',
  Shell:      '#89e051',
  Dart:       '#00b4ab',
  'C++':      '#f34b7d',
}

// listede yoksa turuncu dönüyor

const getColor = (lang: string) => LANG_COLORS[lang] ?? '#ff6b35'

interface LangBarProps {
  stats: LangStat[]
}

export default function LangBar({ stats }: LangBarProps) {
  return (
    <div className="mb-12">
      <p className="font-mono text-[11px] tracking-[4px] uppercase text-white/30 mb-5">
        // kullanılan diller
      </p>

        {/* her dil kendi yüzdesi kadar yer kaplıyor */}
      <div className="flex h-2 gap-[2px] mb-5 overflow-hidden">
        {stats.map(({ lang, pct }) => (
          <div
            key={lang}
            style={{ width: `${pct}%`, background: getColor(lang) }}
            className="h-full transition-all duration-1000 hover:scale-y-150"
            title={`${lang}: ${pct}%`}
          />
        ))}
      </div>

      {/* renkli nokta + isim + yüzde */}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {stats.map(({ lang, pct }) => (
          <div key={lang} className="flex items-center gap-2 text-xs font-mono">
            {/* flex-shrink-0 olmazsa nokta eziliyor */}
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: getColor(lang) }}
            />
            <span className="text-white/70">{lang}</span>
            <span className="text-white/30">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
