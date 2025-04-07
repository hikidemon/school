<template>
  <div :class="{ 'dark-theme': isDarkTheme }">
    <slot />
  </div>
</template>

<script setup>
import { ref, provide, watchEffect } from 'vue'

const isDarkTheme = ref(localStorage.getItem('theme') === 'dark')

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value

  localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
}

watchEffect(() => {
  if (isDarkTheme.value) {
    import('@/assets/styles/_dark-theme.scss')

    document.documentElement.classList.add('dark-theme')
  } else {
    document.documentElement.classList.remove('dark-theme')
  }
})

provide('isDarkTheme', isDarkTheme)

provide('toggleTheme', toggleTheme)
</script>

<style scoped lang="scss"></style>
