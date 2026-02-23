import { useEffect, useState } from 'react'

interface StatCardProps {
  label: string
  value: number
  delay?: number  // animasyon için gecikme (ms)
  suffix?: string
}

export default function StatCard({ label, value, delay = 0, suffix = '' }: StatCardProps) {
  const [displayed, setDisplayed] = useState(0)

  // sayıyı sıfırdan hedef değere kadar animate ediyoruz
  useEffect(() => {
    let current = 0
    const step = Math.max(1, Math.ceil(value / 50))

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += step
        if (current >= value) {
          setDisplayed(value)
          clearInterval(interval)
        } else {
          setDisplayed(current)
        }
      }, 25)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div
      className="
        relative border border-white/5 bg-white/[0.02] p-6
        flex flex-col items-center justify-center text-center
        hover:border-red-600/40 transition-all duration-300
        group overflow-hidden
      "
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* hover'da alttan ışık çıkıyor */}
      <div className="
        absolute bottom-0 left-0 right-0 h-px
        bg-gradient-to-r from-transparent via-red-600 to-transparent
        scale-x-0 group-hover:scale-x-100 transition-transform duration-500
      " />

      {/* sayı */}
      <div className="font-display text-4xl text-red-500 leading-none mb-2">
        {displayed.toLocaleString()}{suffix}
      </div>

      {/* etiket */}
      <div className="font-mono text-[10px] tracking-widest uppercase text-white/30">
        {label}
      </div>
    </div>
  )
}
