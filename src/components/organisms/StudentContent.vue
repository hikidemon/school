<template>
  <div class="student-content">
    <student-table />
  </div>
</template>

<script setup lang="ts">
import StudentTable from '@/components/molecules/StudentTable.vue'
</script>

<style scoped lang="scss">
.student-content {
  padding: 20px;
  flex: 1;
  background-color: var(--color-light);
}
</style>
