<template>
  <div class="layout-default">
    <header v-if="isHeaderShow" class="layout-default__header" />
    <div class="layout-default__content">
      <div class="container">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isHeaderShow = computed(() => route.name !== 'auth')
</script>

<style scoped lang="scss">
.layout-default {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

  &__header {
    height: 72px;
    display: flex;
    justify-content: space-between;
    padding: 20px 0 8px;

    @include responsive(md) {
      min-width: 962px;
      padding: 20px 16px 8px;
    }

    @include responsive(lg) {
      min-width: 1360px;
      padding: 20px 0 8px;
    }

    @include responsive(xl) {
      min-width: 1440px;
    }
  }

  &__content {
    position: relative;
    display: flex;
    flex: 1 0 auto;
    align-items: center;
    justify-content: center;

    @include responsive(md) {
      padding: 24px 0 18px;
    }

    @include responsive(lg) {
      align-items: flex-start;
    }
  }

  @include responsive(lg) {
    align-items: center;
  }
}
</style>
