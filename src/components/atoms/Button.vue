// src/components/molecules/MyButton.vue
<template>
  <el-button type="primary" @click="$emit('click')">
    <slot></slot>
  </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyButton'
})
</script>

<style scoped>
/* Ваши стили */
</style>
