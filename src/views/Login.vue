<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '../components/organisms/LoginForm.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm
  }
})
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
