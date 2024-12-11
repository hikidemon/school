<template>
  <div id="app">
    <LoginPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPage from './views/Login.vue'

export default defineComponent({
  name: 'App',
  components: {
    LoginPage
  }
})
</script>

<style scoped>

</style>
