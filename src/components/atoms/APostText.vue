<template>
  <div class="post-text">
    <el-h3>{{ title }}</el-h3>
    <el-p>{{ content }}</el-p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  content: String
})
</script>

<style scoped lang="scss">
.post-text {
  padding: 16px;
}

h3 {
  margin: 0 0 8px;
}

p {
  margin: 0;
}
</style>
