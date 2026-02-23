import { useState, useRef } from 'react'
import { useGitHub } from './hooks/useGitHub'
import GlitchText from './components/GlitchText'
import ProfileCard from './components/ProfileCard'

// arka planda uçuşan kor parçacıkları için
const PARTICLE_COUNT = 18

export default function App() {
  const [input, setInput]     = useState('')
  const [searched, setSearched] = useState('')
  const inputRef              = useRef<HTMLInputElement>(null)

  const { user, repos, loading, error, fetchUser } = useGitHub()

  // forma submit edildiğinde çalışıyor
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const val = input.trim()
    if (!val) return
    setSearched(val)
    fetchUser(val)
  }

  return (
    <div className="relative min-h-screen grid-bg">

      {/* ARKA PLAN - parçacıklar */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <div
            key={i}
            className="ember-particle absolute rounded-full"
            style={{
              // rastgele pozisyon ve boyut
              left:              `${Math.random() * 100}%`,
              width:             `${2 + Math.random() * 3}px`,
              height:            `${2 + Math.random() * 3}px`,
              background:        i % 3 === 0 ? '#ff2d00' : i % 3 === 1 ? '#ff6b35' : '#ffb347',
              animationDelay:    `${Math.random() * 10}s`,
              animationDuration: `${7 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* tarama çizgisi efekti */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="scan-line absolute left-0 right-0 h-[2px] opacity-20"
          style={{ background: 'linear-gradient(90deg, transparent, #ff2d00, transparent)' }}
        />
      </div>

      {/* scanline doku */}
      <div
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)',
        }}
      />

      {/* ANA İÇERİK */}
      <div className="relative z-20 flex flex-col min-h-screen">

        {/* HERO BÖLÜMÜ */}
        <header className="text-center pt-20 pb-16 px-5 relative">
          {/* üst badge */}
          <div className="inline-flex items-center gap-3 border border-red-800/40 px-5 py-2 mb-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-900/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[11px] tracking-[4px] uppercase text-red-500/80">
              Github Analyzer — v2.0
            </span>
          </div>

          {/* ANA BAŞLIK - glitch efekti var */}
          <h1 className="font-display leading-none mb-2">
            <span className="block text-[clamp(60px,15vw,140px)] text-white">
              <GlitchText text="GITHUB" />
            </span>
            {/* ANALYZER da glitch efekti alıyor */}
            <span
              className="block text-[clamp(60px,15vw,140px)]"
              style={{
                WebkitTextStroke: '1px rgba(255,45,0,0.5)',
                color: 'transparent',
              }}
            >
              <GlitchText text="ANALYZER" />
            </span>
          </h1>

          <p className="font-mono text-xs tracking-[4px] uppercase text-white/25 mt-6 mb-12">
            kullanıcı adı gir — verileri gör
          </p>

          {/* ARAMA FORMU */}
          <form onSubmit={handleSubmit} className="flex max-w-lg mx-auto gap-2">
            <div className="
              flex-1 flex items-center border border-white/8 bg-white/[0.03]
              focus-within:border-red-600/60 focus-within:shadow-[0_0_0_3px_rgba(255,45,0,0.08)]
              transition-all duration-300
            ">
              {/* terminal prefix */}
              <span className="font-mono text-red-600 text-sm px-4 select-none">~/</span>
              <input
                ref={inputRef}
                type="text"
                placeholder="kullanıcı adı"
                value={input}
                onChange={e => setInput(e.target.value)}
                spellCheck={false}
                className="
                  flex-1 bg-transparent border-none outline-none
                  font-mono text-sm text-white/90 placeholder:text-white/20
                  py-4 pr-4
                "
              />
            </div>

            {/* ARAMA BUTONU */}
            <button
              type="submit"
              disabled={loading}
              className="
                relative px-8 bg-red-700 text-white font-mono text-xs tracking-widest uppercase
                hover:bg-red-600 active:bg-red-800
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 hover:-translate-y-px
                hover:shadow-[0_8px_24px_rgba(255,45,0,0.35)]
                overflow-hidden group
              "
            >
              {/* hover'da üstten ışık */}
              <div className="
                absolute inset-0 bg-gradient-to-b from-white/20 to-transparent
                translate-y-full group-hover:translate-y-0 transition-transform duration-300
              " />
              <span className="relative">
                {loading
                  ? <span className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="animate-bounce inline-block w-1 h-1 bg-white rounded-full"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </span>
                  : 'ARA →'
                }
              </span>
            </button>
          </form>
        </header>

        {/* SONUÇLAR */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-5 pb-20">

          {/* HATA MESAJI */}
          {error && (
            <div className="border border-red-800/50 bg-red-900/10 p-5 flex items-center gap-4 animate-fade-in">
              <span className="text-red-500 text-xl flex-shrink-0">⚠</span>
              <div>
                <p className="font-mono text-sm text-red-400">{error}</p>
                {searched && (
                  <p className="font-mono text-xs text-white/25 mt-1">
                    aranan: "{searched}"
                  </p>
                )}
              </div>
            </div>
          )}

          {/* PROFİL KARTI */}
          {user && <ProfileCard user={user} repos={repos} />}

          {/* henüz arama yapılmamışsa */}
          {!user && !error && !loading && (
            <div className="text-center py-20">
              <p className="font-mono text-[11px] tracking-[6px] uppercase text-white/10">
                bir kullanıcı adı ara
              </p>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/5 py-6 text-center">
          <p className="font-mono text-[10px] tracking-[3px] uppercase text-white/15">
            github public api — api key gerekmez
          </p>
        </footer>
      </div>
    </div>
  )
}
