/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          cream: '#F5F5DC',
          brown: '#8B4513',
          gold: '#DAA520',
          darkbrown: '#654321',
          lightbrown: '#D2B48C',
          sepia: '#704214'
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'vintage': ['Crimson Text', 'serif']
      },
      backgroundImage: {
        'vintage-paper': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23F5F5DC\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        vintage: {
          brown: '#8B4513',
          lightbrown: '#D2B48C',
          sepia: '#704214',
          gold: '#DAA520',
          cream: '#F5F5DC'
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out'
      },
      backdropBlur: {
        'xs': '2px'
      },
      typography: (theme) => ({
        vintage: {
          css: {
            '--tw-prose-body': theme('colors.vintage.sepia'),
            '--tw-prose-headings': theme('colors.vintage.brown'),
            '--tw-prose-links': theme('colors.vintage.brown'),
            '--tw-prose-bold': theme('colors.vintage.brown'),
            '--tw-prose-counters': theme('colors.vintage.sepia'),
            '--tw-prose-bullets': theme('colors.vintage.lightbrown'),
            '--tw-prose-hr': theme('colors.vintage.lightbrown'),
            '--tw-prose-quotes': theme('colors.vintage.brown'),
            '--tw-prose-quote-borders': theme('colors.vintage.gold'),
            '--tw-prose-captions': theme('colors.vintage.sepia'),
            '--tw-prose-code': theme('colors.vintage.brown'),
            '--tw-prose-pre-code': theme('colors.vintage.cream'),
            '--tw-prose-pre-bg': theme('colors.vintage.brown'),
            '--tw-prose-th-borders': theme('colors.vintage.lightbrown'),
            '--tw-prose-td-borders': theme('colors.vintage.lightbrown')
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
}
