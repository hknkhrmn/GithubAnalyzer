// her iki başlık için de kullandığım glitch efekti
// css'de ::before ve ::after için data-text özelliği gereklidir.

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
