<template>
  <el-form-item label="Тип поста" prop="type" class="elform">
    <a-select v-model="selectedType" class="input-field" @change="handleTypeChange">
      <a-select-option value="news">Новость</a-select-option>
      <a-select-option value="event">Мероприятие</a-select-option>
    </a-select>
  </el-form-item>

  <a-button v-if="selectedType === 'event'" class="submit-button" @click="handleRegister">
    Записаться на мероприятие
  </a-button>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/common/utils/AuthService'

const selectedType = ref('news')
const router = useRouter()

const handleTypeChange = (value) => {
  selectedType.value = value
}

const handleRegister = async () => {
  try {
    await authService.check()
    router.push('/event-registration')
  } catch (error) {
    alert('Вы должны быть авторизованы для записи на мероприятие!')
  }
}
</script>

<style scoped lang="scss">
.input-field {
  width: 100%;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 16px;
}

.submit-button {
  background-color: $color-primary;
  color: var(--color-white);
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background: linear-gradient(90deg, $color-primary-gradient);
  background-size: 500% 100%;
  animation: gradient-shift 4s linear infinite;
}
</style>
