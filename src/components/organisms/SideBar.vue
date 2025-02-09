<template>
  <el-aside class="sidebar">
    <div class="sidebar-header">
      <h2>Меню</h2>
    </div>
    <side-bar-item v-for="item in items" :key="item.id" :title="item.title" :icon="item.icon"
      :active="activeItem === item.id" @click="handleItemClick(item)"
      :class="{ 'inactive': isProfilePage && item.id === 1 }" />
  </el-aside>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import SideBarItem from '../molecules/SideBarItem.vue'
import { useRouter, useRoute } from 'vue-router'
import calendarstats from '@/assets/icons/calendarstats.svg'
import clipboardlist from '@/assets/icons/clipboardlist.svg'
import news from '@/assets/icons/news.svg'
import userstar from '@/assets/icons/userstar.svg'




const items = ref([
  { id: 1, title: 'Новости', icon: news, route: '/main/posts' },
  { id: 2, title: 'Расписание', icon: calendarstats, route: '/main/schedule' },
  { id: 3, title: 'Программы', icon: clipboardlist, route: '/main/programs' },
  { id: 4, title: 'Список преподавателей', icon: userstar, route: '/main/teachers' },

])
const isProfilePage = computed(() => route.path === '/main/profile-content')
const router = useRouter()
const route = useRoute()
const activeItem = ref(1)

const handleItemClick = (item: any) => {
  activeItem.value = item.id
  console.log('Выбран пункт:', item.title)
  router.push(item.route)
}

watchEffect(() => {
  if (isProfilePage.value) {
    activeItem.value = 0
  } else {
    const currentRoute = route.path
    const item = items.value.find((item) => item.route === currentRoute)
    activeItem.value = item ? item.id : 1
  }
})

watchEffect(() => {

  const currentRoute = route.path
  const item = items.value.find((item) => item.route === currentRoute)
  activeItem.value = item ? item.id : 1
})
</script>

<style scoped lang="scss">
.sidebar {
  width: 250px;
  background: linear-gradient(to bottom, rgb(19, 67, 43), rgb(150, 236, 201));
  padding: 20px 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sidebar-header {
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
}

.sidebar-header h2 {
  color: #ecf0f1;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}
</style>