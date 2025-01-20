<template>
  <div class="container" :class="{ 'right-panel-active': isRightPanelActive }">
    <div class="form-container sign-up-container">
      <el-form ref="registrFormRef" :model="registr" label-position="top" :rules="registrRules" @submit.prevent>
        <h1 class="h1">Регистрация</h1>

        <a-input v-model="registr.email" label="Почта" placeholder="Email" type="email" class="styled-input w-100"
          prop="email" />
        <a-input v-model="registr.password" placeholder="Password" show-password prop="password" label="Пароль"
          type="password" class="styled-input w-100" @blur="handleRegistrBlur" @input="handleRegistrBlur"
          @change="handleRegistrBlur" />
        <a-button class="styled-button w-100" style="margin-top: 15px;" :disabled="isRegistrDisabled"
          @click="handleFormSubmit('registr')">
          Зарегистрироваться
        </a-button>

      </el-form>
    </div>
    <div class="form-container sign-in-container">
      <el-form ref="authFormRef" :model="auth" :rules="authRules" label-position="top" @submit.prevent>
        <h1>Авторизация</h1>
        <a-input v-model="auth.email" placeholder="Email" type="email" class="styled-input w-100" label="Почта"
          prop="email" />
        <a-input v-model="auth.password" placeholder="Password" show-password prop="password" label="Пароль"
          type="password" class="styled-input w-100" @blur="handleAuthBlur" @input="handleAuthBlur"
          @change="handleAuthBlur" />
        <router-link :to="{ name: ROUTE_NAMES.FailPassword }" class="router-link">Забыли пароль?</router-link>
        <a-button native-type="submit" class="styled-button w-100 " :disabled="isLoginDisabled"
          @click="handleFormSubmit('auth')">
          Войти
        </a-button>
      </el-form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Авторизация</h1>
          <a-button class="ghost styled-button" @click="togglePanel('signIn')">
            Авторизоваться
          </a-button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Регистрация</h1>
          <a-button class="ghost styled-button" @click="togglePanel('signUp')">
            Зарегистрироваться
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES, REQUIRED_RULE, PASSWORD_RULE, EMAIL_RULE } from '@/common/constants'
import { authService } from '@/common/utils/AuthService'
import { jwtDecode } from 'jwt-decode'

const router = useRouter()
const registrFormRef = ref<FormInstance>()
const authFormRef = ref<FormInstance>()
const isLoading = ref(false)
const isLoginDisabled = ref(true)
const isRegistrDisabled = ref(true)
const isRightPanelActive = ref(false)


const auth = ref({
  email: '',
  password: '',
})

const registr = ref({
  email: '',
  password: '',
  id_role: '1'
})

const registrRules = reactive<FormRules<typeof registr>>({
  email: [REQUIRED_RULE(), EMAIL_RULE(['blur', 'change'])],
  password: [REQUIRED_RULE(), PASSWORD_RULE()],
})

const authRules = reactive<FormRules<typeof auth>>({
  email: [REQUIRED_RULE(), EMAIL_RULE(['blur', 'change'])],
  password: [REQUIRED_RULE(), PASSWORD_RULE()],
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
            position: 'bottom-right',
          })

          return
        }

        ElNotification({
          title: 'Успешно!',
          message: 'Аккаунт успешно создан!',
          type: 'success',
          position: 'bottom-right',
        })

        isRightPanelActive.value = false
      } else {
        const [error, response] = await authService.login({
          email: auth.value.email,
          password: auth.value.password,
        })
        // const decodedData=jwtDecode(response?.data)

        if (error) {
          ElNotification({
            title: 'Ошибка!',
            message: error.response?.data?.message || 'Ошибка авторизации',
            type: 'error',
            position: 'bottom-right',
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
        position: 'bottom-right',
      })
    } finally {
      isLoading.value = false
    }
  })
}

const togglePanel = (action: 'signUp' | 'signIn') => {
  isRightPanelActive.value = (action === 'signUp')
}
</script>

<style scoped>
* {
  box-sizing: border-box;

}

body {
  font-family: 'Stem-Italic', sans-serif;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-top: 20px;
  height: 100%;
  width: 100%;
}

button {
  background-color: #91e9d0
}


a {
  color: #333;
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
  box-shadow: 0 14px 28px rgba(0, 0, 0, .2), 0 10px 10px rgba(0, 0, 0, .2);
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
  transform: scale(.95);
}

button:focus {
  outline: none;
}

button.ghost {
  margin-top: -30px;
  background: var(--color-primary-light);
  border-color: #000000;


}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all .6s ease-in-out;
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
  transition: transform .6s ease-in-out;
  z-index: 1;
}

.overlay {
  background: #000000;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-primary-dark)) no-repeat 0 0 / cover;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
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
  transition: transform .6s ease-in-out;
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
  background: linear-gradient(90deg, #03ff89, #48f2b9, #6dedc2);
  animation: gradient-shift 4s linear infinite;

}

.router-link {
  color: var(--color-white);
  margin-top: -0px;
  display: inline-block;
}

.router-link:hover,
.router-link:active {
  background-image: linear-gradient(90deg, #03ff89, #48f2b9, #6dedc2);
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
  background: linear-gradient(90deg, #03ff89, #48f2b9, #6dedc2);
  background-size: 500% 100%;
  animation: gradient-shift 4s linear infinite;
  color: transparent;
  background-clip: text;
}

h1::after {
  filter: blur(6px);
  position: absolute;
  z-index: 1;
  left: 0;
  mix-blend-mode: darken;
}

@keyframes blend {
  to {
    background-position: 400% 100%;
  }
}
</style>
