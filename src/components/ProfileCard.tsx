import { GitHubUser, GitHubRepo, LangStat } from '../types/github'
import GlitchText from './GlitchText'
import StatCard from './StatCard'
import LangBar from './LangBar'
import RepoCard from './RepoCard'

// dil istatistiklerini hesaplıyoruz
function calcLangStats(repos: GitHubRepo[]): LangStat[] {
  const counts: Record<string, number> = {}

  repos.forEach(r => {
    if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1
  })

  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 7)
    .map(([lang, count]) => ({
      lang,
      count,
      pct: Math.round((count / total) * 100),
    }))
}

// tarihi formatla
const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })

interface ProfileCardProps {
  user: GitHubUser
  repos: GitHubRepo[]
}

export default function ProfileCard({ user, repos }: ProfileCardProps) {
  const langStats  = calcLangStats(repos)
  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0)
  // en çok yıldız alan 6 repo
  const topRepos   = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)

  return (
    <div className="animate-fade-in">

      {/* PROFİL BAŞLIĞI */}
      <div className="relative border border-white/5 bg-white/[0.02] p-8 mb-3 overflow-hidden">
        {/* üst kırmızı şerit */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-700 via-orange-500 to-red-700" />

        <div className="flex gap-8 items-start flex-wrap">
          {/* avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 object-cover"
              style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))' }}
            />
            {/* parlayan çerçeve */}
            <div
              className="absolute inset-[-4px] -z-10"
              style={{
                background: 'linear-gradient(135deg, #ff2d00, #ff6b35)',
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
              }}
            />
          </div>

          {/* kullanıcı bilgileri */}
          <div className="flex-1 min-w-0">
            {/* isim - glitch efekti burada da var! */}
            <h2 className="font-display text-4xl mb-1">
              <GlitchText text={user.name ?? user.login} />
            </h2>

            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-red-500 hover:text-orange-400 transition-colors mb-3 inline-block"
            >
              @{user.login}
            </a>

            {user.bio && (
              <p className="text-sm text-white/50 font-body leading-relaxed max-w-lg mb-4">
                {user.bio}
              </p>
            )}

            {/* etiketler */}
            <div className="flex flex-wrap gap-2">
              {user.location && (
                <span className="text-[11px] font-mono text-white/40 border border-white/10 px-3 py-1">
                  📍 {user.location}
                </span>
              )}
              {user.company && (
                <span className="text-[11px] font-mono text-white/40 border border-white/10 px-3 py-1">
                  🏢 {user.company}
                </span>
              )}
              {user.blog && (
                <a
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-mono text-red-500/70 border border-red-900/30 px-3 py-1 hover:border-red-600/50 transition-colors"
                >
                  🔗 {user.blog}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* İSTATİSTİKLER */}
      <div className="grid grid-cols-4 gap-[2px] mb-3">
        <StatCard label="Repositories" value={user.public_repos} delay={0}   />
        <StatCard label="Followers"    value={user.followers}    delay={100} />
        <StatCard label="Following"    value={user.following}    delay={200} />
        <StatCard label="Total Stars"  value={totalStars}        delay={300} />
      </div>

      {/* DİL DAĞILIMI */}
      <div className="border border-white/5 bg-white/[0.02] p-8 mb-3">
        {langStats.length > 0 && <LangBar stats={langStats} />}

        {/* kayıt tarihi */}
        <p className="font-mono text-[11px] text-white/20 tracking-widest uppercase">
          // github'a katılım: {formatDate(user.created_at)}
        </p>
      </div>

      {/* TOP REPOLAR */}
      <div className="mb-3">
        <p className="font-mono text-[11px] tracking-[4px] uppercase text-white/30 mb-4 px-1">
          // en popüler repolar
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          {topRepos.map((repo, i) => (
            <RepoCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
