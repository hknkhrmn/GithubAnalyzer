// glitch effect I used for both titles
// data-text attribute is required for ::before and ::after in css

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
