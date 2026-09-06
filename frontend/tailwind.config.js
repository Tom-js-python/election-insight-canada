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
        'liberal-red': '#d71920',
        'liberal-grey': '#58595b',
        'conservative-blue': '#0f2d52',
        'conservative-red': '#ea0029',
        'ndp-orange': '#f28000',
        'ndp-dark-grey': '#58595b',
        'ndp-light-grey': '#e2e3e4',
        'ndp-blue': '#00A0dc',
        'ndp-gold': '#fdb913',
        'bloc-light-blue': '#87cefa',
        'bloc-sky-blue': '#33b2cc',
        'green-digital': '#20a242',
        'green-print': '#24b24a',
        'green-moss': '#1a402e',
        'green-sunrise': '#e84a26',
        'green-egg': '#f5f5f0',
        'rhinoceros-thistle': '#d8bfd8',
        'rhioceros-dark-brown': '#3f2204',
        'animal-protection-dark-green': '#336033',
        'independent-light-grey': '#ededed',
        'ppc-purple': '#6f5d9a',
        'ppc-burgundy': '#710039',
        'communist-bright-red': '#ff6347',
        'libertarian-goldenrod': '#f2ba00',
        'libertarian-gold-yellow': '#ffd100',
        'marxist-leninist-red': '#da251e',
        'canadian-future-gold': '#ffd063',
        'centrist-blue': '#065391',
        'no-affiliation-dark-grey': '#a9a9a9',
        'christian-heritage': '#7c2348',
        'united-party-goldenrod': '#cc9900',
        'marijuana-light-brown': '#d2b48c',
      },
    },
  },
  plugins: [],
}
