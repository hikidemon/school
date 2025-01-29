<template>
  <div class="main-page">
    <Header />
    <div class="content">
      <side-bar />
      <news-content />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/organisms/Header.vue'
import SideBar from '@/components/organisms/SideBar.vue'
import NewsContent from '@/components/organisms/NewsContent.vue'

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