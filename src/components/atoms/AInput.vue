<template>
  <el-form-item :label="label" :prop="prop" class="label">
    <el-input
      v-model="localValue"
      :type="type"
      :placeholder="placeholder"
      class="form_input w-100"
      :show-password="false"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  prop: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue
  }
)

watch(
  () => localValue.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)


</script>

<style scoped lang="scss">
.form_input {
  font-size: 1rem;
  box-shadow: $inner-shadow;
  background: none;
  font-family: inherit;
  color: var(--greyDark);


}
:root {
  --white: #ffffff;
  --greyLight-1: #e4ebf5;
  --greyLight-2: #c8d0e7;
  --greyLight-3: #bec8e4;
  --greyDark: #9baacf;
}
.label {
 
  text-align: left;
  color: var(--color-black-default);
}
</style>
