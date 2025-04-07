import { defineConfig, loadEnv, UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-vue-components/vite'
import Components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import basicSsl from '@vitejs/plugin-basic-ssl'
import svgLoader from 'vite-svg-loader'

const autoImportConfig = AutoImport({
  resolvers: [ElementPlusResolver()]
})

const componentsConfig = Components({
  resolvers: [ElementPlusResolver()]
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  loadEnv(mode, process.cwd(), '')

  return {
    build: {
      target: 'esnext'
    },
    plugins: [
      vue(),
      vueJsx(),
      svgLoader(),
      vueDevTools(),
      svgLoader(),
      autoImportConfig,
      componentsConfig,
      basicSsl({
        /** name of certification */
        name: 'test',
        /** custom trust domains */
        domains: ['*.custom.com'],
        /** custom certification directory */
        certDir: '/Users/.../.devServer/cert'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        styles: fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
        'mock-images': fileURLToPath(new URL('./public/mock-images', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "styles/variables/index.scss" as *;
            @use "styles/mixins/index.scss" as *;
          `,
          api: 'modern-compiler'
        }
      }
    },
    server: {
      // @ts-ignore
      https: true,
      host: true,
      port: 8080
    }
  }
})
