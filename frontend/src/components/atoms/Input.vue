<template>
  <el-form-item :label="label" :rules="rules">
    <el-input v-model="modelValue" :type="type"></el-input>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { FormItemRule } from 'element-plus'

export default defineComponent({
  name: 'MyInput',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    rules: {
      type: Array as PropType<FormItemRule[]>,
      required: false,
      default: () => []
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  emits: ['update:modelValue']
})
</script>

<style scoped>

</style>
