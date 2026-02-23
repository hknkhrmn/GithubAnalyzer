import { GitHubRepo } from '../types/github'

// tarihi okunabilir hale getiriyoruz
const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' })

// dil rengini inline style olarak veriyoruz
const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572a5',
  HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', Go: '#00add8',
  Rust: '#dea584', Vue: '#41b883', PHP: '#4f5d95', Swift: '#fa7343',
}

interface RepoCardProps {
  repo: GitHubRepo
  index: number
}

export default function RepoCard({ repo, index }: RepoCardProps) {
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? '#ff6b35') : null

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="repo-card block border border-white/5 bg-white/[0.02] p-5 animate-slide-up relative overflow-hidden group"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {/* sol kenar çizgisi - hover'da çıkıyor */}
      <div className="
        absolute left-0 top-0 w-[2px] h-full
        bg-gradient-to-b from-red-600 to-orange-500
        scale-y-0 group-hover:scale-y-100
        transition-transform duration-400 origin-top
      " />

      {/* repo adı ve dil */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-display text-lg text-white/90 leading-tight break-all">
          {repo.name}
        </span>
        {repo.language && langColor && (
          <span
            className="text-[10px] font-mono px-2 py-1 border flex-shrink-0"
            style={{ color: langColor, borderColor: `${langColor}50` }}
          >
            {repo.language}
          </span>
        )}
      </div>

      {/* açıklama varsa göster */}
      {repo.description && (
        <p className="text-xs text-white/40 font-body leading-relaxed mb-4 line-clamp-2">
          {repo.description}
        </p>
      )}

      {/* alt bilgiler */}
      <div className="flex gap-4 text-[11px] font-mono text-white/30">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span className="ml-auto">{formatDate(repo.updated_at)}</span>
      </div>
    </a>
  )
}
