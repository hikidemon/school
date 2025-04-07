// vite.config.ts
import {
  defineConfig,
  loadEnv
} from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/vite/dist/node/index.js'
import { fileURLToPath, URL } from 'node:url'
import { ElementPlusResolver } from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/unplugin-vue-components/dist/resolvers.js'
import vue from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import vueJsx from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs'
import svgLoader from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/vite-svg-loader/index.js'
import AutoImport from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/unplugin-vue-components/dist/vite.js'
import Components from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/unplugin-vue-components/dist/vite.js'
import vueDevTools from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/vite-plugin-vue-devtools/dist/vite.mjs'
import basicSsl from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs'
var __vite_injected_original_import_meta_url = 'file:///D:/roflprojects/emerald-city-frontend/vite.config.ts'
var autoImportConfig = AutoImport({
  resolvers: [ElementPlusResolver()]
})
var componentsConfig = Components({
  resolvers: [ElementPlusResolver()]
})
var vite_config_default = defineConfig(({ mode }) => {
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
        '@': fileURLToPath(new URL('./src', __vite_injected_original_import_meta_url)),
        styles: fileURLToPath(new URL('./src/assets/styles', __vite_injected_original_import_meta_url)),
        'mock-images': fileURLToPath(new URL('./public/mock-images', __vite_injected_original_import_meta_url))
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
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxyb2ZscHJvamVjdHNcXFxcZW1lcmFsZC1jaXR5LWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxyb2ZscHJvamVjdHNcXFxcZW1lcmFsZC1jaXR5LWZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9yb2ZscHJvamVjdHMvZW1lcmFsZC1jaXR5LWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcblxyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuaW1wb3J0IGJhc2ljU3NsIGZyb20gJ0B2aXRlanMvcGx1Z2luLWJhc2ljLXNzbCdcclxuXHJcbmNvbnN0IGF1dG9JbXBvcnRDb25maWcgPSBBdXRvSW1wb3J0KHtcclxuICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG59KVxyXG5cclxuY29uc3QgY29tcG9uZW50c0NvbmZpZyA9IENvbXBvbmVudHMoe1xyXG4gIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbn0pXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KTogVXNlckNvbmZpZyA9PiB7XHJcbiAgXHJcbiAgbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJylcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIHRhcmdldDogJ2VzbmV4dCcsXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgdnVlSnN4KCksXHJcbiAgICAgIHN2Z0xvYWRlcigpLFxyXG4gICAgICB2dWVEZXZUb29scygpLFxyXG4gICAgICBhdXRvSW1wb3J0Q29uZmlnLFxyXG4gICAgICBjb21wb25lbnRzQ29uZmlnLFxyXG4gICAgICBiYXNpY1NzbCh7XHJcbiAgICAgICAgLyoqIG5hbWUgb2YgY2VydGlmaWNhdGlvbiAqL1xyXG4gICAgICAgIG5hbWU6ICd0ZXN0JyxcclxuICAgICAgICAvKiogY3VzdG9tIHRydXN0IGRvbWFpbnMgKi9cclxuICAgICAgICBkb21haW5zOiBbJyouY3VzdG9tLmNvbSddLFxyXG4gICAgICAgIC8qKiBjdXN0b20gY2VydGlmaWNhdGlvbiBkaXJlY3RvcnkgKi9cclxuICAgICAgICBjZXJ0RGlyOiAnL1VzZXJzLy4uLi8uZGV2U2VydmVyL2NlcnQnLFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICAgc3R5bGVzOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cy9zdHlsZXMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICAnbW9jay1pbWFnZXMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vcHVibGljL21vY2staW1hZ2VzJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYFxyXG4gICAgICAgICAgICBAdXNlIFwic3R5bGVzL3ZhcmlhYmxlcy9pbmRleC5zY3NzXCIgYXMgKjtcclxuICAgICAgICAgICAgQHVzZSBcInN0eWxlcy9taXhpbnMvaW5kZXguc2Nzc1wiIGFzICo7XHJcbiAgICAgICAgICBgLFxyXG4gICAgICAgICAgYXBpOiAnbW9kZXJuLWNvbXBpbGVyJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIGh0dHBzOiB0cnVlLFxyXG4gICAgICBob3N0OiB0cnVlLFxyXG4gICAgICBwb3J0OiA4MDgwLFxyXG4gICAgfSxcclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsU0FBUyxjQUFjLGVBQTJCO0FBQ3pWLFNBQVMsZUFBZSxXQUFXO0FBQ25DLFNBQVMsMkJBQTJCO0FBRXBDLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sY0FBYztBQVZrSyxJQUFNLDJDQUEyQztBQVl4TyxJQUFNLG1CQUFtQixXQUFXO0FBQUEsRUFDbEMsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQ25DLENBQUM7QUFFRCxJQUFNLG1CQUFtQixXQUFXO0FBQUEsRUFDbEMsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQ25DLENBQUM7QUFHRCxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBa0I7QUFFcEQsVUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFFL0IsU0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxNQUNaO0FBQUEsTUFDQTtBQUFBLE1BQ0EsU0FBUztBQUFBO0FBQUEsUUFFUCxNQUFNO0FBQUE7QUFBQSxRQUVOLFNBQVMsQ0FBQyxjQUFjO0FBQUE7QUFBQSxRQUV4QixTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxRQUNwRCxRQUFRLGNBQWMsSUFBSSxJQUFJLHVCQUF1Qix3Q0FBZSxDQUFDO0FBQUEsUUFDckUsZUFBZSxjQUFjLElBQUksSUFBSSx3QkFBd0Isd0NBQWUsQ0FBQztBQUFBLE1BQy9FO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFJaEIsS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBO0FBQUEsTUFFTixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
