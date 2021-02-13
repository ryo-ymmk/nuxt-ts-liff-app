import fs from 'fs'
import path from 'path'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'liff-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // 鯖設定 デプって試す時は丸っと変える
  server: {
    port: 3001,
    host: 'localhost',
    https:
      process.env.NODE_ENV === 'production'
        ? {}
        : {
            // test時はこっちの設定読む
            key: fs.readFileSync(path.resolve(__dirname, 'cert/cert.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'cert/cert.crt')),
          },
  },

  // api endpointを作る
  serverMiddleware: [
    { path: '/api', handler: '~/server-middleware/server.ts' },
  ],
}
