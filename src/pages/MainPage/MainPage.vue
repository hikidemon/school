<template>
  <div :class="['main-page', isDarkTheme ? 'dark-theme' : 'light-theme']">
    <Header />
    <div class="content">
      <side-bar />
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/organisms/Header.vue'
import SideBar from '@/components/organisms/SideBar.vue'
import NewsContent from '@/components/organisms/NewsContent.vue'
import { ref, defineExpose, onMounted, inject } from 'vue'
import ProfileContent from '@/components/organisms/ProfileContent.vue'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/common/constants'
import('@/assets/styles/_dark-theme.scss')

const router = useRouter()
const isDarkTheme = inject('isDarkTheme')

onMounted(() => {
  router.push({ name: ROUTE_NAMES.NewsContent })
})
</script>

<style scoped lang="scss">
html,
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.main-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
}

.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.main-content {
  flex: 1;
  overflow: auto;
  scrollbar-width: none;
}

.main-content::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  background: transparent;
}

* {
  scrollbar-width: none;
}
</style>
