export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    script: [
      { src: 'https://apis.google.com/js/platform.js', async: true, defer: true }
    ],
    title: 'my-nuxt3-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/onesignal.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
  ],
  oneSignal: {
    init: {
      appId: 'cf0c077f-a156-4403-8230-c4fbf05e64cf', // Replace with your OneSignal App ID
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true
      }
    }
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    //    swURL: '/sw.js', // Path to our service worker
    manifest: {
      name: "Nuxt 3 PWA",
      lang: 'en',
      short_name: "Testing",
      description: "test",
      icons: [
        {
          src: 'icons/icon_64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'icons/icon_144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'icons/icon_192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/icon_512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY
  },

}
