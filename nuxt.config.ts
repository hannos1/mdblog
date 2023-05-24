import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    ssr: true,
    modules: [
      '@vueuse/nuxt',
      '@pinia/nuxt',
      '@nuxtjs/tailwindcss'
    ],
    runtimeConfig:{
        public:{
            apiBaseUrl:'https://nid-node.ninghao.co'
        }
    },
    build: {
      transpile:
        process.env.NODE_ENV === 'production'
          ? ['naive-ui', "vueuc", '@css-render/vue3-ssr', '@juggle/resize-observer']
          : ['@juggle/resize-observer']
    },
    vite: {
      ssr: {
        noExternal: ['naive-ui']
      },
      plugins: [
        Components({
          resolvers: [NaiveUiResolver()]
        }),
      ],
      optimizeDeps: {
        include:
          process.env.NODE_ENV === "development"
            ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
            : []
      }
    }
  });
