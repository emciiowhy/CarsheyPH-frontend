// frontend/postcss.config.js
export default {
  plugins: {
    // Tailwind v4 requires the separate PostCSS wrapper package
    // Install with: npm i -D @tailwindcss/postcss
    '@tailwindcss/postcss': {},
    autoprefixer: {}
  }
}
