<template>
  <el-config-provider :locale="ru">
    <layout-default>
      <router-view v-loading="isGlobalLoading" />
    </layout-default>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// @ts-ignore todo: исправить
import ru from 'element-plus/es/locale/lang/ru.mjs'

const isGlobalLoading = ref(false)
</script>
