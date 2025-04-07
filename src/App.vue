<template>
  <div class="main-page">
    <theme-provider>
      <el-config-provider :locale="ru">
        <layout-default>
          <router-view v-loading="isGlobalLoading" />
        </layout-default> </el-config-provider
    ></theme-provider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeProvider from './components/atoms/ThemeProvider.vue'
// @ts-ignore todo: исправить
import ru from 'element-plus/es/locale/lang/ru.mjs'

const isGlobalLoading = ref(false)
</script>

<style scoped lang="scss">
html,
body {
  overflow: hidden;
}

.main-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  display: flex;
  flex: 1;
}

.main-page::-webkit-scrollbar {
  display: none;
}
</style>
