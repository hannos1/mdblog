module.exports = {
    content: [
      './components/**/*.{js,vue,ts}',
      './composables/**/*.{js,vue,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
      './App.{js,ts,vue}',
      './app.{js,ts,vue}'
    ],
    darkMode: 'class',
    theme: {
      screens: {
        xs: '540px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    },
    plugins: [
      require('@tailwindcss/typography')
    ],
}