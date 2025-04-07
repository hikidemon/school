<template>
  <el-aside :class="['sidebar', { collapsed }]">
    <div class="toggle-button" @click="toggleSidebar">
      <img
        src="@/assets/icons/itemsidebar.png"
        alt="toggle"
        class="toggle-icon"
        :class="{ rotated: collapsed }"
      /> <div class="logo" v-show="!collapsed">Изумрудный город</div>
    </div>

    <side-bar-item
      v-for="item in items"
      :key="item.id"
      :title="collapsed ? '' : item.title"
      :icon="item.icon"
      :active="activeItem === item.id"
      @click="handleItemClick(item)"
      :class="[{ inactive: isProfilePage && item.id === 1 }, 'sidebar-item']"
    />
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
  { id: 3, title: 'Мероприятия', icon: clipboardlist, route: '/main/events' },
  { id: 4, title: 'Список преподавателей', icon: userstar, route: '/main/teacher' },
  { id: 5, title: 'Список учеников', icon: userstar, route: '/main/student' },
  { id: 6, title: 'Программы', icon: userstar, route: '/main/programs' },
  { id: 7, title: 'Подмисывайся на VK', icon: userstar, route: '/main/programs' },
  { id: 8, title: 'Получать уведомления через TG', icon: userstar, route: '/main/programs' },
])

const collapsed = ref(false)
const toggleSidebar = () => {
  collapsed.value = !collapsed.value
}

const isProfilePage = computed(() => route.path === '/main/profile-content')
const router = useRouter()
const route = useRoute()
const activeItem = ref(1)

const handleItemClick = (item: any) => {
  activeItem.value = item.id
  router.push(item.route)
}

watchEffect(() => {
  const currentRoute = route.path
  const item = items.value.find((item) => item.route === currentRoute)
  activeItem.value = isProfilePage.value ? 0 : item ? item.id : 1
})
</script>

<style scoped lang="scss">
.logo {
  font-weight: bold;
  justify-content: left;
  margin-right: auto;
  @include glass-text();
  font-size: 1.5rem;

  
}
.sidebar {
  @include glass-content();
  width: 250px;
  transition: width 0.3s ease;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  &.collapsed {
    width: 70px;

    .sidebar-item {
      justify-content: center;
    }

    .toggle-icon {
      transform: rotate(180deg);
    }
  }
}

.toggle-button {
  padding: 4px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin-right: 10px;
}

.toggle-icon {
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  margin-top:0px;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 0 6px #50C878aa);
}


.sidebar-item {
  display: flex;
  align-items: center;
  
  transition: all 0.3s ease;
}
</style>
