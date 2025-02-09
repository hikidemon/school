<template>
  <td class="table-cell">
    <div v-if="data">
      <div class="time">{{ data.time }}</div>
      <div class="subject">{{ data.subject }}</div>
      <div class="teacher">{{ data.teacher }}</div>
    </div>
  </td>
</template>

<script setup lang="ts">
defineProps<{
  data?: {
    time: string;
    subject: string;
    teacher: string;
  };
}>()
</script>

<style scoped lang="scss">
.table-cell {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  vertical-align: top;
}

.time {
  font-weight: bold;
  color: var(--color-black)-light;
}

.subject {
  margin-top: 4px;
  color: #555;
}

.teacher {
  margin-top: 4px;
  font-size: 0.9rem;
  color: #777;
}
</style>