<template>
  <div class="component-wrapper">
    <div class="stars-container">
      <div v-for="n in 30" :key="n" class="star" :style="generateStarStyle()" />
    </div>
    <div class="container" :class="{ 'right-panel-active': isRightPanelActive }">
      <div class="form-container sign-up-container">
        <el-form ref="registrFormRef" :model="registr" label-position="top" :rules="registrRules" @submit.prevent>
          <h1 class="h1">Регистрация</h1>
          <el-form-item prop="email" label="Почта" class="label">
            <a-input v-model="registr.email" placeholder="Email" type="email" class="styled-input w-100" />
          </el-form-item>
          <el-form-item prop="password" label="Пароль" class="label">
            <a-input
              v-model="registr.password"
              placeholder="Password"
              type="password"
              class="styled-input w-100"
              @blur="handleRegistrBlur"
              @input="handleRegistrBlur"
              @change="handleRegistrBlur"
              :show-password="true"
            />
          </el-form-item>
          <a-button
            class="styled-button w-100"
            style="margin-top: 15px"
            :disabled="isRegistrDisabled"
            @click="handleFormSubmit('registr')"
          >
            Зарегистрироваться
          </a-button>
        </el-form>
      </div>
      <div class="form-container sign-in-container">
        <el-form ref="authFormRef" :model="auth" :rules="authRules" label-position="top" @submit.prevent>
          <h1>Авторизация</h1>
          <el-form-item label="Почта" prop="email" class="label">
            <a-input v-model="auth.email" placeholder="Email" type="email" class="styled-input w-100" />
          </el-form-item>
          <el-form-item prop="password" label="Пароль" class="label">
            <a-input
              v-model="auth.password"
              placeholder="Password"
              :show-password="true"
              type="password"
              class="styled-input w-100"
              @blur="handleAuthBlur"
              @input="handleAuthBlur"
              @change="handleAuthBlur"
            />
          </el-form-item>
          <router-link :to="{ name: ROUTE_NAMES.FailPassword }" class="router-link">Забыли пароль?</router-link>
          <a-button
            native-type="submit"
            class="styled-button w-100"
            :disabled="isLoginDisabled"
            @click="handleFormSubmit('auth')"
          >
            Войти
          </a-button>
        </el-form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Авторизация</h1>
            <a-button class="ghost styled-button" @click="togglePanel('signIn')"> Авторизоваться </a-button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Регистрация</h1>
            <a-button class="ghost styled-button" @click="togglePanel('signUp')"> Зарегистрироваться </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES, REQUIRED_RULE, PASSWORD_RULE, EMAIL_RULE } from '@/common/constants'
import { authService } from '@/common/utils/AuthService'
//import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from '@/store/AuthStore'

const router = useRouter()
const registrFormRef = ref<FormInstance>()
const authFormRef = ref<FormInstance>()
const isLoading = ref(false)
const isLoginDisabled = ref(true)
const isRegistrDisabled = ref(true)
const authStore = useAuthStore()

const generateStarStyle = () => {
  const left = Math.random() * 100
  const size = 5 + Math.random() * 10
  const delay = Math.random() * 5
  const duration = 3 + Math.random() * 4

  return {
    left: `${left}vw`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

const auth = ref({
  email: '',
  password: ''
})

const registr = ref({
  email: '',
  password: '',
  id_role: '1'
})

const registrRules = reactive<FormRules<typeof registr>>({
  email: [REQUIRED_RULE(), EMAIL_RULE(['blur', 'change'])],
  password: [REQUIRED_RULE(), PASSWORD_RULE()]
})

const authRules = reactive<FormRules<typeof auth>>({
  email: [REQUIRED_RULE(), EMAIL_RULE(['blur', 'change'])],
  password: [REQUIRED_RULE(), PASSWORD_RULE()]
})

const handleRegistrBlur = () => {
  if (!registr.value.email || !registr.value.password) {
    isRegistrDisabled.value = true
  } else {
    isRegistrDisabled.value = false
  }
}

const handleAuthBlur = () => {
  if (!auth.value.email || !auth.value.password) {
    isLoginDisabled.value = true
  } else {
    isLoginDisabled.value = false
  }
}

const handleFormSubmit = async (formType: 'registr' | 'auth') => {
  const form = formType === 'registr' ? registrFormRef : authFormRef

  if (!form.value) return

  form.value.validate(async (valid: boolean) => {
    if (!valid) return

    isLoading.value = true

    try {
      if (formType === 'registr') {
        const [error] = await authService.register({
          email: registr.value.email,
          password: registr.value.password,
          id_role: registr.value.id_role
        })

        if (error) {
          ElNotification({
            title: 'Ошибка!',
            message: error.response?.data?.message || 'Ошибка регистрации',
            type: 'error',
            position: 'bottom-right'
          })

          return
        }

        ElNotification({
          title: 'Успешно!',
          message: 'Аккаунт успешно создан!',
          type: 'success',
          position: 'bottom-right'
        })

        authStore.togglePanel('signIn')
      } else {
        const [error] = await authService.login({
          email: auth.value.email,
          password: auth.value.password
        })
        // const decodedData=jwtDecode(response?.data)

        if (error) {
          ElNotification({
            title: 'Ошибка!',
            message: error.response?.data?.message || 'Ошибка авторизации',
            type: 'error',
            position: 'bottom-right'
          })

          return
        }

        //const token = response?.data?.data?.token

        //  if (token) {
        //   localStorage.setItem('authToken', token)

        router.push({ name: ROUTE_NAMES.MainPage })
        //  }
      }
    } catch (err) {
      ElNotification({
        title: 'Ошибка!',
        message: 'Произошла ошибка. Попробуйте ещё раз.',
        type: 'error',
        position: 'bottom-right'
      })
    } finally {
      isLoading.value = false
    }
  })
}

const togglePanel = (action: 'signUp' | 'signIn') => {
  authStore.togglePanel(action)
}

const isRightPanelActive = computed(() => authStore.isRightPanelActive)
</script>

<style scoped lang="scss">
.component-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('../../assets/icons/back3.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 20px;
}

.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.star {
  position: absolute;
  top: -10px;
  background: radial-gradient(circle, #89f5ad, transparent 70%);
  border-radius: 50%;
  opacity: 0.8;
  animation: fall linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(110vh);
    opacity: 0;
  }
}

* {
  box-sizing: border-box;
}

.label {
  text-align: left;
  color: var(--color-black);
  width: 100%;
}

body {
  font-family: 'Stem-Italic', sans-serif;
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-top: 20px;
  height: 100%;
  width: 100%;
}


a {
  color: var(--color-black)-light;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

input {
  color: #ddd;
  border-radius: 20px;
}

.container {
 
  background: #1d2021;
  border-radius: 10px;
  box-shadow: $box-shadow;
  position: relative;
  overflow: hidden;
  width: 800px;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 150px;
  opacity: 1;
}

.form-container form {
  background: #1d2021;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 2;
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.form-container input {
  background: #1d2021;
  border: 1px solid #ddd;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {

  margin-top: -30px;
  background: var(--color-primary-light);
  border-color: #000000;
  border:none;
  @include glass-button();
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 1;
}
@include glass-animations();
.overlay {
  $padding: 28px;
  $blur: $glass-blur;
  $border: 1px solid rgba(255, 255, 255, 0.15);
  $primary: $glass-primary-color;
  $secondary: $glass-secondary-color;
  background: #000000;
  backdrop-filter: blur($blur) brightness(1.2);
  -webkit-backdrop-filter: blur($blur) brightness(1.2);
  border-radius: inherit;
  background: linear-gradient(
    145deg,
    rgba($secondary, 0.8) 0%,
    rgba($primary, 0.9) 100%
  ); 
  border: $border;
  transform-style: preserve-3d;
  position: relative;
  z-index: 2;
  height: 100%;
  box-sizing: border-box; color: var(--color-white);
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
  z-index: 0;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);
}

.overlay-left {
  transform: translateY(-20%);
}

.container.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.container.right-panel-active .overlay-left {
  transform: translateY(0);
}

.container.right-panel-active .overlay-right {
  transform: translateY(20%);
}

.styled-button:hover,
.styled-button:active {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(90deg, $color-primary-gradient);
  animation: gradient-shift 4s linear infinite;
}

.router-link {
  color: var(--color-white);
  margin-top: -0px;
  display: inline-block;
}

.router-link:hover,
.router-link:active {
  background-image: linear-gradient(90deg, $color-primary-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradient-shift 4s linear infinite;
}

h1,
h1::after {
  margin-top: 0;
  margin-bottom: 40px;
  font-size: clamp(1rem, 1rem + 2vw, 6rem);
  background: linear-gradient(90deg, $color-primary-gradient);
  background-size: 500% 100%;
  animation: gradient-shift 4s linear infinite;
  color: transparent;
  background-clip: text;
  $primary: $glass-primary-color;
  $secondary: $glass-secondary-color;
  @include glass-text($color:$glass-accent-color);
  background: linear-gradient(
    145deg,
    rgba($secondary, 0.8) 0%,
    rgba($primary, 0.9) 100%
  );
  background-clip: text;
}



@keyframes blend {
  to {
    background-position: 400% 100%;
  }
}
</style>
