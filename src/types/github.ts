// github api'den gelen kullanıcı verisi
export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  company: string | null
  blog: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  html_url: string
}

// github api'den gelen repo verisi
export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  fork: boolean
}

// dil istatistikleri için kullandığımız tip
export interface LangStat {
  lang: string
  count: number
  pct: number
}
