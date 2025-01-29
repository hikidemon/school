<template>

  <li class="dropdown-item" @click="handleClick">

    <slot></slot>

  </li>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.dropdown-item {
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}
</style>