/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#06B6D4',
        canvas: '#0B0F19'
      },
      boxShadow: {
        glass: '0 20px 80px rgba(15, 23, 42, 0.45)',
        glow: '0 0 30px rgba(99, 102, 241, 0.35)'
      },
      backgroundImage: {
        aurora:
          'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.28), transparent 24%), radial-gradient(circle at 80% 10%, rgba(6,182,212,0.18), transparent 20%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.18), transparent 25%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-18px) translateX(8px)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(99, 102, 241, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)' }
        }
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
