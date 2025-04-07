<template>
  <el-dialog v-model="visible" :title="dialogTitle" width="30%" class="modern-dialog">
    <el-form :model="student" label-width="120px" class="modern-form">
      <el-form-item label="ФИО">
        <a-input v-model="student.name" class="modern-input" />
      </el-form-item>
      <el-form-item label="Биография">
        <a-input v-model="student.bio" type="textarea" />
      </el-form-item>
      <el-form-item label="Email">
        <a-input v-model="student.email" />
      </el-form-item>
      <el-form-item label="Телефон">
        <a-input v-model="student.phone" />
      </el-form-item>
      <el-form-item label="Адрес">
        <a-input v-model="student.address" />
      </el-form-item>
      <el-form-item label="Дата рождения">
        <el-date-picker v-model="student.birthdate" type="date" class="modern-input" />
      </el-form-item>
      <el-form-item label="Ссылка на VK">
        <el-input v-model="student.vkLink" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false" class="modern-button cancel-button">Отменить</el-button>
      <el-button type="primary" @click="save" class="modern-button save-button">Сохранить</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AInput from '@/components/atoms/AInput.vue'

const props = defineProps<{
  modelValue: boolean
  student: any
  dialogTitle: string
}>()

const emit = defineEmits(['update:modelValue', 'save'])

const visible = ref(props.modelValue)
const student = ref({ ...props.student })

watch(
  () => props.student,
  (newStudent) => {
    student.value = { ...newStudent }
  },
  { deep: true }
)

watch(
  () => props.modelValue,
  (value) => {
    visible.value = value
  }
)

watch(visible, (value) => {
  emit('update:modelValue', value)
})

const save = () => {
  emit('save', student.value)

  visible.value = false
}
</script>

<style scoped lang="scss">
.modern-dialog {
  border-radius: 12px;
  overflow-y: auto;
  background-color: var(--color-light);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.modern-dialog::-webkit-scrollbar {
  display: none;
}

.modern-form {
  .el-form-item {
    margin-bottom: 20px;
  }

  .modern-input {
    width: 100%;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: var(--color-primary);
    }
  }
}

.modern-button {
  border-radius: 12px;
  padding: 10px 20px;
  border: none;
  font-size: 14px;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.cancel-button {
  background-color: var(--color-light);
  border: none;
  color: var(--color-primary);

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
}

.save-button {
  background-color: var(--color-primary);
  color: var(--color-white);

  &:hover {
    background-color: var(--color-primary);
  }
}
</style>
