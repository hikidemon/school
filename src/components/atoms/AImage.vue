<template>
  <div class="icon">
    <img :src="src" :alt="alt" class="icon-image" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: 'Icon',
  },
})
</script>

<style scoped lang="scss">
.icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-image {
  width: 24px;
  height: 24px;
}
</style>