module.exports = {
    content: [
      "./components/*.{js,vue,ts}",
      "./layouts/*.vue",
      "./pages/*.vue",
      "./plugins/*.{js,ts}",
      "./nuxt.config.{js,ts}",
    ],
    theme: {
      backgroundColor: (theme) => ({
        ...theme('colors'),
        primary: '#9c7474',
        button: '#bec1a6',
      }),
    },
    plugins: [],
  }