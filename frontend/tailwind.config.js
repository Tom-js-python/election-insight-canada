/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        party: {
          liberal: '#d71920',
          conservative: '#0f2d52',
          ndp: '#f28000',
          bloc: '#87cefa',
          green: '#20a242',
          rhinoceros: '#d8bfd8',
          animalProtection: '#336033',
          independent: '#ededed',
          ppc: '#6f5d9a',
          communist: '#ff6347',
          libertarian: '#f2ba00',
          marxistLeninist: '#da251e',
          canadianFuture: '#ffd063',
          centrist: '#065391',
          noAffiliation: '#a9a9a9',
          christianHeritage: '#7c2348',
          united: '#cc9900',
          marijuana: '#d2b48c',
        },
      },
    },
  },
  plugins: [],
}
