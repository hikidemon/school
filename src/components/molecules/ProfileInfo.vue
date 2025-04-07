<template>
  <div class="profile-info">
    <el-avatar :src="user.avatar" />
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <p>Дата рождения: {{ user.birthdate }}</p>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/atoms/Avatar.vue'

defineProps<{ user: { avatar: string; name: string; email: string; birthdate: string } }>()
</script>

<style scoped lang="scss">
.profile-info {
  text-align: center;
  padding: 20px;
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
