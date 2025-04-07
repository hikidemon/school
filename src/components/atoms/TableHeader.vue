<template>
  <th class="table-header">
    {{ title }}
  </th>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss">
.table-header {
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f5f7fa;
  font-weight: bold;
  text-align: center;
}
</style>
