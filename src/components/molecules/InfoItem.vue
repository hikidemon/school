<template>
  <div class="info-item">
    <span class="info-item__label">{{ label }}:</span>
    <el-input
      v-if="isEditing"
      v-model="localValue"
      @blur="saveChanges"
      @keyup.enter="saveChanges"
      size="medium"
      :autosize="{ minRows: 1, maxRows: 5 }"
      type="textarea"
      class="info-item__input"
    />
    <span v-else class="info-item__value">{{ value }}</span>
    <el-button class="info-item__edit" type="text" @click="startEditing">
      <el-icon :style="{ fontSize: '24px' }">
        <edit class="edit" size="medium"/>
      </el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Edit } from '@element-plus/icons-vue'

const props = defineProps<{
  label: string
  value: string
}>()

const emit = defineEmits(['update'])

const isEditing = ref(false)
const localValue = ref(props.value)

watch(
  () => props.value,
  (newValue) => {
    localValue.value = newValue
  }
)

const startEditing = () => {
  isEditing.value = true
}

const saveChanges = () => {
  isEditing.value = false

  emit('update', localValue.value)
}
</script>

<style scoped lang="scss">

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 8px;
  transition: background 0.3s ease;
  min-width: 100%;
  @include glass-button();

}

.info-item:hover {
  background: var(--color-white)-dark;
}

.info-item__label {  @include glass-text();
  font-weight: bold;
  margin-right: 10px;
 font-size: medium;
  white-space: nowrap;


}

.info-item__value {
  @include glass-text();
  flex-grow: 1;
  color: #b6f4e9;
  min-width: 100px;
  word-break: break-word;
  font-size: medium;
 
}

.info-item__input { 
  flex-grow: 1;
  width: 100%;
  min-width: 200px;
 
}

.info-item__edit {
  opacity: 0;
  transition: opacity 0.3s ease;
  color: $color-emerald;
}

.info-item:hover .info-item__edit {
  opacity: 1;
}
</style>
