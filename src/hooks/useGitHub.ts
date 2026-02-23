import { useState } from 'react'
import { GitHubUser, GitHubRepo } from '../types/github'

// github'dan veri çeken custom hook
// bu sayede App.tsx temiz kalıyor
export function useGitHub() {
  const [user, setUser]       = useState<GitHubUser | null>(null)
  const [repos, setRepos]     = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const fetchUser = async (username: string) => {
    // her aramada sıfırdan başlıyoruz
    setLoading(true)
    setError(null)
    setUser(null)
    setRepos([])

    try {
      // kullanıcı bilgisi ve repolar için aynı anda istek atıyoruz (daha hızlı)
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
      ])

      // kullanıcı bulunamazsa hata fırlatıyoruz
      if (!userRes.ok) throw new Error('Böyle bir kullanıcı bulunamadı 😅')

      const userData: GitHubUser  = await userRes.json()
      const reposData: GitHubRepo[] = await reposRes.json()

      setUser(userData)
      // fork'ları çıkarıyoruz, sadece kendi repoları kalsın
      setRepos(reposData.filter(r => !r.fork))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Bir şeyler ters gitti')
    } finally {
      setLoading(false)
    }
  }

  return { user, repos, loading, error, fetchUser }
}
