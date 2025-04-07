<template>
  <div class="user-management">
    <el-input v-model="searchQuery" placeholder="Поиск пользователей" class="search-input" />
    <el-table :data="filteredUsers" stripe style="width: 100%">
      <el-table-column prop="name" label="Имя" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="role" label="Роль" />
      <el-table-column label="Действия">
        <template #default="{ row }">
          <el-button type="text" @click="editUser(row)">Редактировать</el-button>
          <el-button type="text" @click="deleteUser(row)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { User } from '@/common/types/User'

const props = defineProps<{
  users: User[]
}>()

const emit = defineEmits(['edit-user', 'delete-user'])

const searchQuery = ref('')

const filteredUsers = computed(() => {
  return props.users.filter((user) => {
    if (user.name !== undefined && user.email !== undefined) {
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    }
  })
})

const editUser = (user: User) => {
  emit('edit-user', user)

  ElMessage.success(`Редактирование пользователя: ${user.name}`)
}

const deleteUser = (user: User) => {
  emit('delete-user', user)

  ElMessage.success(`Пользователь ${user.name} удален`)
}
</script>

<style scoped lang="scss">
.user-management {
  .search-input {
    margin-bottom: 20px;
  }

  .el-table {
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
