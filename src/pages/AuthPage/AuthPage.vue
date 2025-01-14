<template>
  <div class="auth-page">
    <div v-loading="isLoading" class="auth-page__form">
      <h1 class="auth-page__title">Авторизация</h1>
      <el-form ref="formRef" :model="auth" label-position="top" :rules="rules" @submit.prevent>
        <el-form-item label="Email" prop="email">
          <el-input v-model="auth.email" placeholder="Введите email" class="w-100" @blur="handleBlur" />
        </el-form-item>

        <el-form-item label="Пароль" prop="password">
          <el-input
            v-model="auth.password"
            show-password
            type="password"
            placeholder="Введите пароль"
            class="w-100"
            @blur="handleBlur"
            @input="handleBlur"
            @change="handleBlur"
          />
        </el-form-item>

        <a-button native-type="submit" size="large" :disabled="isLoginDisabled" @click="handleSubmit()">
          Войти
        </a-button>
      </el-form>

      <router-link :to="{ name: ROUTE_NAMES.Registration }" class="color-apple mt-20">Зарегистрироваться</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES, REQUIRED_RULE, PASSWORD_RULE, EMAIL_RULE } from '@/common/constants'

const router = useRouter()

const formRef = ref<FormInstance>()

const auth = ref({
  email: '',
  password: '',
})

const rules = reactive<FormRules<typeof auth>>({
  password: [REQUIRED_RULE(), PASSWORD_RULE()],
  email: [REQUIRED_RULE(), EMAIL_RULE(['blur', 'change'])],
})

const isLoading = ref(false)
const isLoginDisabled = ref(true)

const handleBlur = () => {
  if (!formRef.value || !auth.value.email || !auth.value.password) return

  formRef.value.validate((valid: boolean) => {
    if (valid) {
      isLoginDisabled.value = false
    } else {
      isLoginDisabled.value = true
    }
  })
}

const handleSubmit = async () => {
  if (!formRef.value) return

  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    isLoading.value = true

    await router.push({ name: ROUTE_NAMES.MainPage })

    isLoading.value = false
  })
}
</script>

<style scoped lang="scss">
.auth-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__form {
    width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 24px;
    box-shadow: 0 0 24px 0 rgba(168, 168, 168, 0.68);
    background-color: var(--color-white-default);
    padding: 52px 50px 36px;
    margin-bottom: 60px;

    .el-form-item {
      margin-bottom: 32px;
    }
  }

  &__title {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: var(--color-black-default);
    margin-bottom: 20px;
  }
}
</style>
