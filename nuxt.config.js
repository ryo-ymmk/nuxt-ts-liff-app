import fs from 'fs'
import path from 'path'
import ip from 'ip'

// Env(process.envからどこからでも見えるやつ)に投げる設定
const Settings = {
  // Liff app id
  liffId: '1655655645-yMPbMPbX',

  // 鯖建てる時のhost(0.0.0.0だと自動でip解決済みのlocalhostにしてくれる)
  host: '0.0.0.0',

  // port
  port: 22222,
}

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

    // dotenvのやつ
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // host=0.0.0.0設定時、Nuxt自体はいい感じに自動でIPを設定してくれるのに、
    // axiosはその辺うまいこと設定されずlocalhostとか叩きに行ってCORS死する
    // なのでhost=0.0.0.0の場合、自前でipを解決して設定してあげる
    browserBaseURL:
      Settings.host === '0.0.0.0'
        ? `https://${ip.address()}:${Settings.port}`
        : undefined,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // 設定周りは全部ここに書く(ここ以外に散らかすと色々めんどい)
  env: Settings,

  // 鯖設定
  server: {
    port: Settings.port,
    host: Settings.host,
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
