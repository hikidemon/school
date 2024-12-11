// src/components/organisms/LoginForm.vue
<template>
  <el-form :model="form" @submit.native.prevent="onSubmit">
    <MyInput
      v-model="form.username"
      label="Username"
      :rules="[{ required: true, message: 'Please input your username', trigger: 'blur' }]"
    />
    <MyInput
      v-model="form.password"
      label="Password"
      :rules="[{ required: true, message: 'Please input your password', trigger: 'blur' }]"
      type="password"
    />
    <el-form-item>
      <MyButton @click="onSubmit">Login</MyButton>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import MyInput from '../atoms/Input.vue'
import MyButton from '../atoms/Button.vue'

export default defineComponent({
  name: 'LoginForm',
  components: {
    MyInput,
    MyButton
  },
  setup() {
    const form = reactive({
      username: '',
      password: ''
    })

    const onSubmit = () => {
      console.log('Form submitted:', form)
    }

    return { form, onSubmit }
  }
})
</script>

<style scoped>
/* Ваши стили */
</style>
