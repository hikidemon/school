<template>
  <div class="schedule-control-panel">
    <el-button type="primary" icon="el-icon-plus" @click="$emit('add')">Добавить</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['add']
});
</script>

<style scoped lang="scss">
.schedule-control-panel {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>