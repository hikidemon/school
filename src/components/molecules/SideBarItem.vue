<template>
  <div class="sidebar-item" :class="{ active }" @click="handleClick">
    <el-icon class="icon" :size="20">
      <component :is="icon" />
    </el-icon>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus'

defineProps({
  title: String,
  icon: Object,
  active: Boolean
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped lang="scss">
.sidebar-item { 
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
 
}

.sidebar-item:hover,
.sidebar-item.active {
  background-color: rgba(48, 219, 162, 0.1);
}

.sidebar-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background-color: $color-emerald;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.sidebar-item:hover::before,
.sidebar-item.active::before {
  transform: scaleY(1);
}

.icon { @include glass-avatar();
  color: var(--color-white);
  width: 24px;
  height: 24px;
 
}

.title {
  @include glass-text();
  font-size: 1rem;
  color: var(--color-white);
 
  transition: color 0.3s ease;
}

.sidebar-item:hover .title,
.sidebar-item.active .title {
  color: $color-emerald;
}
</style>
