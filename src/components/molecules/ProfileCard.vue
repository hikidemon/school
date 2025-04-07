<template>
  <el-card class="user-card">
    <div class="user-card__header">
     <div>
      <img :size="100" :src="user.avatarUrl || Avatar" class="avatar" />
      <div class="avatar-halo"></div></div>
      <div class="user-card__main-info">
        <h2 class="user-card__name h2">{{ user.name }}</h2>
      </div>
    </div>

    <div class="user-card__basic-info">
      <info-item
        v-for="field in basicFields"
        :key="field.key"
        :label="field.label"
        :value="user[field.key]"
        @update="(value) => updateField(field.key as keyof User, value)"
      />
    </div>

    <el-collapse-transition>
      <div v-show="showDetails" class="user-card__details">
        <info-item
          v-for="field in additionalFields"
          :key="field.key"
          :label="field.label"
          :value="user[field.key]"
          @update="(value) => updateField(field.key as keyof User, value)"
        />
      </div>
    </el-collapse-transition>

    <div class="user-card__footer">
      <el-button class="user-card__button" type="text" @click="showDetails = !showDetails">
        {{ showDetails ? 'Скрыть детали' : 'Показать больше' }}
        <el-icon class="el-icon--right">
          <component :is="showDetails ? ArrowUp : ArrowDown" />
        </el-icon>
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import InfoItem from '../molecules/InfoItem.vue'
import { userService } from '@/common/utils/UserService'
import type { User } from '@/common/types/User'
import Avatar from '../../assets/icons/6.png'

const user = ref<User>({
  avatarUrl: Avatar,
  name: 'Иван Иванов',
  bio: 'Люблю программирование',
  email: 'ivan@example.com',
  phone: '+7 (999) 123-45-67',
  address: 'ул. Пушкина, д. 10',
  birthdate: '1990-01-01',
  occupation: 'Программист'
})

const showDetails = ref(false)

const basicFields = computed(
  () =>
    [
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Телефон' }
    ] as const
)

const additionalFields = computed(
  () =>
    [
      { key: 'address', label: 'Адрес' },
      { key: 'birthdate', label: 'Дата рождения' },
      { key: 'occupation', label: 'Род деятельности' }
    ] as const
)

const fetchUserProfile = async () => {
  try {
    const [error, response] = await userService.getUser('userId')

    if (error) throw error

    if (response?.data) {
      user.value = { ...user.value, ...response.data }
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных пользователя:', error)

    ElNotification({
      title: 'Ошибка',
      message: 'Не удалось загрузить данные пользователя',
      type: 'error',
      position: 'bottom-right'
    })
  }
}

const updateField = async (field: keyof User, value: string) => {
  try {
    const [error] = await userService.updateUser('userId', { [field]: value })

    if (error) throw error

    user.value[field] = value

    ElNotification({
      title: 'Успешно',
      message: 'Данные обновлены',
      type: 'success',
      position: 'bottom-right'
    })
  } catch (error) {
    console.error('Ошибка при обновлении данных:', error)

    ElNotification({
      title: 'Ошибка',
      message: 'Не удалось обновить данные',
      type: 'error',
      position: 'bottom-right'
    })
  }
}

fetchUserProfile()
</script>

<style scoped lang="scss">
.avatar-halo {
  position: absolute;
  top: 16px;
  left: 2px;
  right: 0px;
  bottom: 0px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(50, 220, 180, 0.7) 180deg,
    rgba(255, 255, 255, 0.9) 360deg
  );
  z-index: 1;
  filter: blur(6px);
  animation: rotate-halo 8s linear infinite;
  opacity: 0.8;
  width: 150px;
  height: 150px;
}
@include glass-animations();
.avatar-expanded {
  transform: scale(2);
}
.user-card {
 
  max-width: 600px;
  margin: auto;
  width: 170%;
  padding: 20px;
  border-radius: 12px; @include glass-button();
  
}

.user-card__header {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
}

.user-card__main-info {
  margin-left: 20px;
}

.user-card__name {
  margin: 0;
  font-size: 1.8rem;
  word-wrap: break-word;
  align-items: center;
}

.avatar {

 
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: scale(1.6);
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(50, 220, 180, 0.4);

  flex-shrink: 0;
  width: 80px;
  height: 80px;
  margin-right: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.user-card__basic-info,
.user-card__details {
  margin-bottom: 20px;
}

.user-card__footer {
  text-align: center;
}

.info-item__input {
  min-width: 200px;
  flex-grow: 1;
  padding: 5px;
  font-size: 1rem;
}

.user-card__button {
  color: $color-emerald;
  font-size: 1rem;
  transition: color 0.3s ease;
  @include glass-button();

}

.user-card__button:hover,
.user-card__button:active {
  background-image: linear-gradient(90deg, $color-primary-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradient-shift 4s linear infinite;
}

h2,
h2::after {
  margin-top: 0;
  margin-bottom: 40px;
  font-size: clamp(1rem, 1rem + 2vw, 6rem);
  background: linear-gradient(90deg, #1dd3af, #48f2b9, #6aedc1);
  background-size: 500% 100%;
  animation: gradient-shift 4s linear infinite;
  color: transparent;
  background-clip: text;
  @include glass-text();
}

h2::after {
  filter: blur(6px);
  position: absolute;
  z-index: 1;
  left: 0;
  mix-blend-mode: darken;
}
@include glass-animations();
@keyframes blend {
  to {
    background-position: 400% 100%;
  }
}
</style>
