<template>
  <div class="sidebar-item" @click="handleClick">
    <a-image :src="icon || ''" :alt="title || ''" />
    <span class="title">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import AImage from '../atoms/AImage.vue'

defineProps({
  title: String,
  icon: String,
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sidebar-item:hover {
  background-color: #f5f5f5;
}

.title {
  font-size: 1rem;
  color: #333;
}
</style>