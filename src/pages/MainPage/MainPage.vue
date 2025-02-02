<template>
  <div class="main-page">
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
import { ref, defineExpose, onMounted } from 'vue'
import ProfileContent from '@/components/organisms/ProfileContent.vue'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/common/constants'

const router = useRouter()

onMounted(() => {
  router.push({ name: ROUTE_NAMES.NewsContent })
})


</script>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  display: flex;
  flex: 1;
}
</style>