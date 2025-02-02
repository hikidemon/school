<template>
  <div class="menu">
    <el-link href="#" class="link " @click.prevent="toggleView(false)" :class="{ active: isSelected === false }">
      <span class="link-icon">
        <Document width="32" height="32" />
      </span>
      <span class="link-title">Мероприятия</span>
    </el-link>

    <el-link href="#" class="link el-link" @click.prevent="toggleView(true)" :class="{ active: isSelected === true }">
      <span class="link-icon">
        <Calendar width="32" height="32" />
      </span>
      <span class="link-title">Расписание</span>
    </el-link>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { Document, Calendar, Star, List } from '@element-plus/icons-vue'

const emit = defineEmits(['toggle-view'])

const isSelected = ref<boolean>(true) 

const toggleView = (value: boolean) => {
  isSelected.value = value
  emit('toggle-view', value)
}
</script>

<style scoped>
.menu {
  padding: 0rem;
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0 10px 25px 0 rgba(#000, 0.075);
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: width 0.2s ease-in;
  text-decoration: none;
  color: inherit;
  flex-direction: column;
  border-bottom: 2px solid transparent;
}

.link:hover {
  width: auto;
  border-bottom: none;
}

.link-icon {
  width: 28px;
  height: 28px;
  display: block;
  flex-shrink: 0;
  border-bottom: 2px solid transparent;
}

.link-title {
  display: block;
  width: 100%;
  text-align: center;
  margin-left: 8px; 
  transition: opacity 0.2s ease-in;
  opacity: 0;
  transform: translateX(100%);
  border-bottom: 2px solid transparent;
}

.link:hover .link-title {
  opacity: 1;
  transform: translateX(0);
}

.active .link-icon,
.active .link-title {
  background-image: linear-gradient(90deg, #03ff89, #48f2b9, #6dedc2);
  animation: gradient-shift 4s linear infinite;
  background-clip: content-box;
  -webkit-background-clip: text;
  color:#1abc9c;
}
.el-link {
  border-bottom: none !important; 
  outline: none !important; 
  box-shadow: none !important;
}
.el-link:focus {
  outline: none !important;
  box-shadow: none !important;
  border-bottom: none !important; 
  border:none;
}

@keyframes gradient-shift {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
}
</style>
