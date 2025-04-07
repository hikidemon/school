// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/roflprojects/emerald-city-frontend/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
import { ElementPlusResolver } from "file:///D:/roflprojects/emerald-city-frontend/node_modules/unplugin-vue-components/dist/resolvers.js";
import vue from "file:///D:/roflprojects/emerald-city-frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/roflprojects/emerald-city-frontend/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///D:/roflprojects/emerald-city-frontend/node_modules/unplugin-vue-components/dist/vite.js";
import Components from "file:///D:/roflprojects/emerald-city-frontend/node_modules/unplugin-vue-components/dist/vite.js";
import vueDevTools from "file:///D:/roflprojects/emerald-city-frontend/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import basicSsl from "file:///D:/roflprojects/emerald-city-frontend/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs";
import svgLoader from "file:///D:/roflprojects/emerald-city-frontend/node_modules/vite-svg-loader/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/roflprojects/emerald-city-frontend/vite.config.ts";
var autoImportConfig = AutoImport({
  resolvers: [ElementPlusResolver()]
});
var componentsConfig = Components({
  resolvers: [ElementPlusResolver()]
});
var vite_config_default = defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), "");
  return {
    build: {
      target: "esnext"
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
        name: "test",
        /** custom trust domains */
        domains: ["*.custom.com"],
        /** custom certification directory */
        certDir: "/Users/.../.devServer/cert"
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
        styles: fileURLToPath(new URL("./src/assets/styles", __vite_injected_original_import_meta_url)),
        "mock-images": fileURLToPath(new URL("./public/mock-images", __vite_injected_original_import_meta_url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "styles/variables/index.scss" as *;
            @use "styles/mixins/index.scss" as *;
          `,
          api: "modern-compiler"
        }
      }
    },
    server: {
      // @ts-ignore
      https: true,
      host: true,
      port: 8080
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxyb2ZscHJvamVjdHNcXFxcZW1lcmFsZC1jaXR5LWZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxyb2ZscHJvamVjdHNcXFxcZW1lcmFsZC1jaXR5LWZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9yb2ZscHJvamVjdHMvZW1lcmFsZC1jaXR5LWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcblxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcbmltcG9ydCBiYXNpY1NzbCBmcm9tICdAdml0ZWpzL3BsdWdpbi1iYXNpYy1zc2wnXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcblxuY29uc3QgYXV0b0ltcG9ydENvbmZpZyA9IEF1dG9JbXBvcnQoe1xuICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldXG59KVxuXG5jb25zdCBjb21wb25lbnRzQ29uZmlnID0gQ29tcG9uZW50cyh7XG4gIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV1cbn0pXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KTogVXNlckNvbmZpZyA9PiB7XG4gIGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXG5cbiAgcmV0dXJuIHtcbiAgICBidWlsZDoge1xuICAgICAgdGFyZ2V0OiAnZXNuZXh0J1xuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICB2dWVKc3goKSxcbiAgICAgIHN2Z0xvYWRlcigpLFxuICAgICAgdnVlRGV2VG9vbHMoKSxcbiAgICAgIHN2Z0xvYWRlcigpLFxuICAgICAgYXV0b0ltcG9ydENvbmZpZyxcbiAgICAgIGNvbXBvbmVudHNDb25maWcsXG4gICAgICBiYXNpY1NzbCh7XG4gICAgICAgIC8qKiBuYW1lIG9mIGNlcnRpZmljYXRpb24gKi9cbiAgICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgICAvKiogY3VzdG9tIHRydXN0IGRvbWFpbnMgKi9cbiAgICAgICAgZG9tYWluczogWycqLmN1c3RvbS5jb20nXSxcbiAgICAgICAgLyoqIGN1c3RvbSBjZXJ0aWZpY2F0aW9uIGRpcmVjdG9yeSAqL1xuICAgICAgICBjZXJ0RGlyOiAnL1VzZXJzLy4uLi8uZGV2U2VydmVyL2NlcnQnXG4gICAgICB9KVxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgIHN0eWxlczogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9hc3NldHMvc3R5bGVzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgICdtb2NrLWltYWdlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9wdWJsaWMvbW9jay1pbWFnZXMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgfVxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYFxuICAgICAgICAgICAgQHVzZSBcInN0eWxlcy92YXJpYWJsZXMvaW5kZXguc2Nzc1wiIGFzICo7XG4gICAgICAgICAgICBAdXNlIFwic3R5bGVzL21peGlucy9pbmRleC5zY3NzXCIgYXMgKjtcbiAgICAgICAgICBgLFxuICAgICAgICAgIGFwaTogJ21vZGVybi1jb21waWxlcidcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBodHRwczogdHJ1ZSxcbiAgICAgIGhvc3Q6IHRydWUsXG4gICAgICBwb3J0OiA4MDgwXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UyxTQUFTLGNBQWMsZUFBMkI7QUFDelYsU0FBUyxlQUFlLFdBQVc7QUFDbkMsU0FBUywyQkFBMkI7QUFFcEMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUVuQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGNBQWM7QUFDckIsT0FBTyxlQUFlO0FBWGlLLElBQU0sMkNBQTJDO0FBYXhPLElBQU0sbUJBQW1CLFdBQVc7QUFBQSxFQUNsQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFDbkMsQ0FBQztBQUVELElBQU0sbUJBQW1CLFdBQVc7QUFBQSxFQUNsQyxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFDbkMsQ0FBQztBQUdELElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFrQjtBQUNwRCxVQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUUvQixTQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1Y7QUFBQSxNQUNBO0FBQUEsTUFDQSxTQUFTO0FBQUE7QUFBQSxRQUVQLE1BQU07QUFBQTtBQUFBLFFBRU4sU0FBUyxDQUFDLGNBQWM7QUFBQTtBQUFBLFFBRXhCLFNBQVM7QUFBQSxNQUNYLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLFFBQ3BELFFBQVEsY0FBYyxJQUFJLElBQUksdUJBQXVCLHdDQUFlLENBQUM7QUFBQSxRQUNyRSxlQUFlLGNBQWMsSUFBSSxJQUFJLHdCQUF3Qix3Q0FBZSxDQUFDO0FBQUEsTUFDL0U7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUloQixLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUE7QUFBQSxNQUVOLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
