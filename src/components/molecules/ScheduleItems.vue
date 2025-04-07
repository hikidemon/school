<template>
  <div :class="['schedule-item', { editable: isEditable, 'edit-mode': isEditing }]" @click="handleClick">
    <div v-if="!isEditing" class="content">
      <div class="time">{{ item.time }}</div>
      <div class="subject">{{ item.subject }}</div>
      <div class="teacher">{{ item.teacher }}</div>
      <a-button v-if="isEditable" type="danger" @click.stop="deleteItem">Удалить</a-button>
    </div>
    <div v-else class="edit-form">
      <a-input v-model:value="editedItem.time" placeholder="Время" />
      <a-input v-model:value="editedItem.subject" placeholder="Предмет" />
      <a-input v-model:value="editedItem.teacher" placeholder="Преподаватель" />
      <a-button type="primary" @click="save">Сохранить</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ScheduleItem } from '@/common/types/ScheduleItem'

const props = defineProps<{
  item: ScheduleItem
  isEditable: boolean
}>()

const emit = defineEmits(['save', 'delete'])

const isEditing = ref(false)
const editedItem = ref({ ...props.item })

const handleClick = () => {
  if (props.isEditable) {
    isEditing.value = true
  }
}

const save = () => {
  emit('save', editedItem.value)

  isEditing.value = false
}

const deleteItem = () => {
  emit('delete', props.item)
}
</script>

<style scoped lang="scss">
.schedule-item {
  padding: 12px;
  border-radius: 8px;
  background: var(--color-white);
  margin-bottom: 8px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &.editable {
    cursor: pointer;
  }

  &.edit-mode {
    border: 2px solid var(--color-primary);
  }
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-form {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
