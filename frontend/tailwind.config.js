/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'clash': ['Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        clash: {
          purple: {
            900: '#1a0b3d',
            800: '#2d1b69',
            700: '#402b95',
            600: '#533bc1',
            500: '#664bed',
            400: '#8b5cf6',
            300: '#a78bfa',
            200: '#c4b5fd',
            100: '#e0e7ff',
          },
          blue: {
            900: '#0f1c3f',
            800: '#1e3a5f',
            700: '#2d5a87',
            600: '#3c7aaf',
            500: '#4b9ad7',
            400: '#60a5fa',
            300: '#93c5fd',
            200: '#bfdbfe',
            100: '#dbeafe',
          },
          gold: {
            500: '#fbbf24',
            400: '#fcd34d',
            300: '#fde68a',
          }
        }
      },
      animation: {
        'elixir-pulse': 'elixir-pulse 2s infinite',
        'battle-glow': 'battle-glow 2s infinite',
        'card-reveal': 'card-reveal 0.6s ease-out',
        'crown-bounce': 'crown-bounce 2s infinite',
        'trophy-shimmer': 'trophy-shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'elixir-pulse': {
          '0%': {
            boxShadow: '0 0 0 0 rgba(139, 92, 246, 0.7)',
          },
          '70%': {
            boxShadow: '0 0 0 10px rgba(139, 92, 246, 0)',
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(139, 92, 246, 0)',
          },
        },
        'battle-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 165, 0, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(255, 165, 0, 0.8)',
          },
        },
        'card-reveal': {
          '0%': {
            transform: 'rotateY(90deg) scale(0.8)',
            opacity: '0',
          },
          '50%': {
            transform: 'rotateY(45deg) scale(0.9)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'rotateY(0deg) scale(1)',
            opacity: '1',
          },
        },
        'crown-bounce': {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0)',
          },
          '40%': {
            transform: 'translateY(-10px)',
          },
          '60%': {
            transform: 'translateY(-5px)',
          },
        },
        'trophy-shimmer': {
          '0%': {
            backgroundPosition: '-200px 0',
          },
          '100%': {
            backgroundPosition: 'calc(200px + 100%) 0',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translatey(0px)',
          },
          '50%': {
            transform: 'translatey(-10px)',
          },
        },
        'glow': {
          '0%': {
            boxShadow: '0 0 5px rgba(139, 92, 246, 0.5)',
          },
          '100%': {
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.8)',
          },
        },
      },
      backgroundImage: {
        'clash-gradient': 'linear-gradient(135deg, #1a0b3d 0%, #2d1b69 25%, #0f1c3f 50%, #1e3a5f 75%, #2d5a87 100%)',
        'royal-gradient': 'linear-gradient(45deg, #fbbf24, #f59e0b, #d97706)',
        'battle-gradient': 'linear-gradient(to bottom, #059669, #0d9488, #0f766e)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};