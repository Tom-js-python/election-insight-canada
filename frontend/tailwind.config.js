/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

const partyColors = {
  liberal: '#d71920',
  conservative: '#0f2d52',
  ndp: '#f28000',
  bloc: '#87cefa',
  green: '#20a242',
  rhinoceros: '#d8bfd8',
  'animal-protection': '#336033',
  independent: '#ededed',
  ppc: '#6f5d9a',
  communist: '#ff6347',
  libertarian: '#f2ba00',
  'marxist-leninist': '#da251e',
  'canadian-future': '#ffd063',
  centrist: '#065391',
  'no-affiliation': '#a9a9a9',
  'christian-heritage': '#7c2348',
  united: '#cc9900',
  marijuana: '#d2b48c',
}

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  safelist: Object.keys(partyColors).map((partyKey) => `bg-party-${partyKey}`),
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        party: partyColors,
      },
    },
  },
  plugins: [],
}
