/** @type {import('tailwindcss').Config} */
export default {
  // hangi dosyaları tarayacağını söylüyoruz tailwind'e
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // kendi renklerimizi ekliyoruz
      colors: {
        ember: {
          50:  '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        lava: '#ff2d00',
        plasma: '#ff6b35',
        void: '#080808',
        pit: '#0d0a08',
        coal: '#151210',
        ash: '#1e1a17',
        smoke: '#2a2420',
      },
      fontFamily: {
        // başlık fontu - çarpıcı olsun
        display: ['"Bebas Neue"', 'cursive'],
        // kod/mono font
        mono: ['"JetBrains Mono"', 'monospace'],
        // body font
        body: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'flicker':     'flicker 4s linear infinite',
        'ember-float': 'emberFloat 6s ease-in-out infinite',
        'slide-up':    'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':     'fadeIn 0.5s ease both',
        'count-up':    'countUp 0.4s ease both',
        'scan':        'scan 8s linear infinite',
        'glow-pulse':  'glowPulse 2s ease-in-out infinite',
        'glitch-1':    'glitch1 5s infinite',
        'glitch-2':    'glitch2 5s infinite',
      },
      keyframes: {
        flicker: {
          '0%,100%': { opacity: '1' },
          '92%':     { opacity: '1' },
          '93%':     { opacity: '0.4' },
          '94%':     { opacity: '1' },
          '96%':     { opacity: '0.6' },
          '97%':     { opacity: '1' },
        },
        emberFloat: {
          '0%,100%': { transform: 'translateY(0) scale(1)', opacity: '0.6' },
          '50%':     { transform: 'translateY(-20px) scale(1.2)', opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 10px #ff2d00, 0 0 30px rgba(255,45,0,0.3)' },
          '50%':     { boxShadow: '0 0 20px #ff2d00, 0 0 60px rgba(255,45,0,0.5)' },
        },
        glitch1: {
          '0%,88%,100%': { transform: 'translate(0)', opacity: '0' },
          '90%': { transform: 'translate(-5px, 2px)', opacity: '1' },
          '92%': { transform: 'translate(5px, -2px)', opacity: '1' },
          '94%': { transform: 'translate(-3px, 0)', opacity: '0.8' },
          '96%': { transform: 'translate(0)', opacity: '0' },
        },
        glitch2: {
          '0%,84%,100%': { transform: 'translate(0)', opacity: '0' },
          '86%': { transform: 'translate(5px, 3px)', opacity: '1' },
          '88%': { transform: 'translate(-5px, -3px)', opacity: '1' },
          '90%': { transform: 'translate(2px, 0)', opacity: '0.8' },
          '92%': { transform: 'translate(0)', opacity: '0' },
        },
      },
      backgroundImage: {
        // ateş gibi gradient
        'fire-gradient': 'linear-gradient(135deg, #ff2d00 0%, #ff6b35 50%, #ffb347 100%)',
        'ember-glow':    'radial-gradient(ellipse at center, rgba(255,45,0,0.15) 0%, transparent 70%)',
        'grid-pattern':  'linear-gradient(rgba(255,45,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,0,0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
