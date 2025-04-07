// vite.config.ts
import {
  defineConfig,
  loadEnv
} from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/vite/dist/node/index.js'
import { fileURLToPath, URL } from 'node:url'
import { ElementPlusResolver } from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/unplugin-vue-components/dist/resolvers.js'
import vue from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import vueJsx from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs'
import AutoImport from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/unplugin-vue-components/dist/vite.js'
import Components from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/unplugin-vue-components/dist/vite.js'
import vueDevTools from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/vite-plugin-vue-devtools/dist/vite.mjs'
import basicSsl from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs'
import svgLoader from 'file:///D:/roflprojects/emerald-city-frontend/node_modules/vite-svg-loader/index.js'
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxyb2ZscHJvamVjdHNcXFxcZW1lcmFsZC1jaXR5LWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxyb2ZscHJvamVjdHNcXFxcZW1lcmFsZC1jaXR5LWZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9yb2ZscHJvamVjdHMvZW1lcmFsZC1jaXR5LWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcblxyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuaW1wb3J0IGJhc2ljU3NsIGZyb20gJ0B2aXRlanMvcGx1Z2luLWJhc2ljLXNzbCdcclxuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInXHJcblxyXG5jb25zdCBhdXRvSW1wb3J0Q29uZmlnID0gQXV0b0ltcG9ydCh7XHJcbiAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxufSlcclxuXHJcbmNvbnN0IGNvbXBvbmVudHNDb25maWcgPSBDb21wb25lbnRzKHtcclxuICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG59KVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSk6IFVzZXJDb25maWcgPT4ge1xyXG4gIFxyXG4gIGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBidWlsZDoge1xyXG4gICAgICB0YXJnZXQ6ICdlc25leHQnLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICBzdmdMb2FkZXIoKSxcclxuICAgICAgdnVlRGV2VG9vbHMoKSxcclxuICAgICAgc3ZnTG9hZGVyKCksXHJcbiAgICAgIGF1dG9JbXBvcnRDb25maWcsXHJcbiAgICAgIGNvbXBvbmVudHNDb25maWcsXHJcbiAgICAgIGJhc2ljU3NsKHtcclxuICAgICAgICAvKiogbmFtZSBvZiBjZXJ0aWZpY2F0aW9uICovXHJcbiAgICAgICAgbmFtZTogJ3Rlc3QnLFxyXG4gICAgICAgIC8qKiBjdXN0b20gdHJ1c3QgZG9tYWlucyAqL1xyXG4gICAgICAgIGRvbWFpbnM6IFsnKi5jdXN0b20uY29tJ10sXHJcbiAgICAgICAgLyoqIGN1c3RvbSBjZXJ0aWZpY2F0aW9uIGRpcmVjdG9yeSAqL1xyXG4gICAgICAgIGNlcnREaXI6ICcvVXNlcnMvLi4uLy5kZXZTZXJ2ZXIvY2VydCcsXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICBzdHlsZXM6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXNzZXRzL3N0eWxlcycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICdtb2NrLWltYWdlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9wdWJsaWMvbW9jay1pbWFnZXMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXHJcbiAgICAgICAgICAgIEB1c2UgXCJzdHlsZXMvdmFyaWFibGVzL2luZGV4LnNjc3NcIiBhcyAqO1xyXG4gICAgICAgICAgICBAdXNlIFwic3R5bGVzL21peGlucy9pbmRleC5zY3NzXCIgYXMgKjtcclxuICAgICAgICAgIGAsXHJcbiAgICAgICAgICBhcGk6ICdtb2Rlcm4tY29tcGlsZXInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgaHR0cHM6IHRydWUsXHJcbiAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgIHBvcnQ6IDgwODAsXHJcbiAgICB9LFxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UyxTQUFTLGNBQWMsZUFBMkI7QUFDelYsU0FBUyxlQUFlLFdBQVc7QUFDbkMsU0FBUywyQkFBMkI7QUFFcEMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUVuQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGNBQWM7QUFDckIsT0FBTyxlQUFlO0FBWGlLLElBQU0sMkNBQTJDO0FBYXhPLElBQU0sbUJBQW1CLFdBQVc7QUFBQSxFQUNsQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFDbkMsQ0FBQztBQUVELElBQU0sbUJBQW1CLFdBQVc7QUFBQSxFQUNsQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFDbkMsQ0FBQztBQUdELElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFrQjtBQUVwRCxVQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUUvQixTQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsTUFDQSxTQUFTO0FBQUE7QUFBQSxRQUVQLE1BQU07QUFBQTtBQUFBLFFBRU4sU0FBUyxDQUFDLGNBQWM7QUFBQTtBQUFBLFFBRXhCLFNBQVM7QUFBQSxNQUNYLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLFFBQ3BELFFBQVEsY0FBYyxJQUFJLElBQUksdUJBQXVCLHdDQUFlLENBQUM7QUFBQSxRQUNyRSxlQUFlLGNBQWMsSUFBSSxJQUFJLHdCQUF3Qix3Q0FBZSxDQUFDO0FBQUEsTUFDL0U7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUloQixLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUE7QUFBQSxNQUVOLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
