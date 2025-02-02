<template>
  <div class="info-item">
    <span class="info-item__label">{{ label }}:</span>
    <el-input
      v-if="isEditing"
      v-model="localValue"
      @blur="saveChanges"
      @keyup.enter="saveChanges"
      size="small"
      :autosize="{ minRows: 1, maxRows: 5 }"
      type="textarea"
      class="info-item__input"
    />
    <span v-else class="info-item__value">{{ value }}</span>
    <el-button class="info-item__edit" type="text" @click="startEditing">
      <el-icon><edit /></el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Edit } from '@element-plus/icons-vue'

const props = defineProps<{
  label: string;
  value: string;
}>()

const emit = defineEmits(['update'])

const isEditing = ref(false)
const localValue = ref(props.value)

watch(() => props.value, (newValue) => {
  localValue.value = newValue
})

const startEditing = () => {
  isEditing.value = true
}

const saveChanges = () => {
  isEditing.value = false
  emit('update', localValue.value)
}
</script>

<style scoped>
.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 8px;
  transition: background 0.3s ease;
  min-width: 100%;
}

.info-item:hover {
  background: #f1f1f1;
}

.info-item__label {
  font-weight: bold;
  margin-right: 10px;
  color: #1dd3af;
  white-space: nowrap;
}

.info-item__value {
  flex-grow: 1;
  color: #7f8c8d;
  min-width: 100px;
  word-break: break-word;
}

.info-item__input {
  flex-grow: 1;
  width: 100%;
  min-width: 200px;
}

.info-item__edit {
  opacity: 0;
  transition: opacity 0.3s ease;
  color:#1dd3af;
}

.info-item:hover .info-item__edit {
  opacity: 1;
}
</style>
