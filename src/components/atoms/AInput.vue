<template>

    <el-input
      v-model="localValue"
      :type="type"
      :placeholder="placeholder"
      class="form_input w-100"
      :show-password="showPassword"
      
    />
 
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({

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

  showPassword:{
    type:Boolean,
    default: false,
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
  color: var(--color-black);


}

.label {
 
  text-align: left;
  color: var(--color-black);
}
</style>
