# GitHub Profile Analyzer 🔥

Herhangi bir GitHub kullanıcısının profilini analiz eden uygulama.
Vite + React + TypeScript + Tailwind CSS ile yapıldı.

## Demo Link


## Özellikler

- Kullanıcı adı gir, profil bilgilerini gör
- Repo sayısı, takipçi, yıldız istatistikleri (sayı animasyonuyla)
- Dil dağılımı — renkli bar grafiği
- En popüler repolar — yıldıza göre sıralı
- Glitch efektli başlıklar (hem GITHUB hem ANALYZER)
- Kor parçacıkları ve tarama çizgisi animasyonları
- Siber-punk ateş teması — turuncu/kırmızı palet
- API key gerekmez, GitHub public API kullanıyor

## Teknolojiler

- **React 18** — UI
- **TypeScript** — tip güvenliği
- **Vite** — hızlı build aracı
- **Tailwind CSS** — stil
- **GitHub REST API** — veri

## Kurulum

```bash
npm install
npm run dev
```

## Deploy (Vercel)

```bash
npm run build
# dist klasörünü vercel'e sürükle ya da:
npx vercel
```

## Proje Yapısı

```
src/
├── components/
│   ├── GlitchText.tsx   → glitch efektli başlık
│   ├── StatCard.tsx     → sayı animasyonlu istatistik
│   ├── LangBar.tsx      → dil dağılım grafiği
│   ├── RepoCard.tsx     → repo kartı
│   └── ProfileCard.tsx  → ana profil bölümü
├── hooks/
│   └── useGitHub.ts     → api istekleri
├── types/
│   └── github.ts        → typescript tipleri
└── App.tsx              → ana uygulama
```
