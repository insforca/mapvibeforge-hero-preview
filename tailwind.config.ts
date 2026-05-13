/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:    '#1B2A4A',
        gold:    '#C9A96E',
        surface: '#F5EDE4',
        canvas:  '#EEF0F3',
        darkest: '#141414',
      },
      fontFamily: {
        ui:     ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        serif:  ['"Playfair Display"', 'Georgia', 'serif'],
        coords: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        chip:  '8px',
        card:  '12px',
        modal: '20px',
        pill:  '40px',
      },
      boxShadow: {
        poster: '0 32px 80px rgba(0,0,0,0.55)',
        focus:  '0 0 0 3px rgba(26,63,207,0.25)',
      },
    },
  },
  plugins: [],
}
