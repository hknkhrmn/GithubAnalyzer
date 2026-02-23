// her iki başlık için de kullandığım glitch efekti
// data-text attribute'u css'te ::before ve ::after için gerekiyor

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <span
      className={`glitch-wrap ${className}`}
      data-text={text}
    >
      {text}
    </span>
  )
}
