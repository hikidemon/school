<template>
  <el-aside class="sidebar">
    <side-bar-item
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :icon="item.icon"
      @click="handleItemClick(item)"
    />
  </el-aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SideBarItem from '../molecules/SideBarItem.vue'
import newsIcon from '@/assets/icons/2.png'
import scheduleIcon from '@/assets/icons/4.png'
import eventsIcon from '@/assets/icons/1.png'
import programsIcon from '@/assets/icons/3.png'

const items = ref([
  { id: 1, title: 'Новости', icon: newsIcon },
  { id: 2, title: 'Расписание', icon: scheduleIcon },
  { id: 3, title: 'Мероприятия', icon: eventsIcon },
  { id: 4, title: 'Программы', icon: programsIcon },
])

const handleItemClick = (item: any) => {
  console.log('Выбран пункт:', item.title)
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #ddd;
}
</style>