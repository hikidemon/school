<template>
  <div class="sel">
  <el-select
    v-model="selected"
    :placeholder="placeholder"
    class="filter-dropdown"
    @change="handleChange"
  ><div class="opt">
    <el-option
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    /></div>
  </el-select></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Option {
  value: string | number;
  label: string;
}

defineProps<{
  options: Option[];
  placeholder?: string;
}>();

const selected = defineModel<string | number>();

const emit = defineEmits<{
  (event: 'change', value: string | number): void;
}>();

function handleChange(value: string | number) {
  emit('change', value);
}
</script>

<style scoped lang="scss">

.sel {
  ::v-deep(.el-input__wrapper) {
    background: rgba(0, 127, 95, 0.5);
    border-radius: 8px;
    box-shadow: none;
    color: white;

    input {
      color: white;
      background: transparent;
    }
  }

  ::v-deep(.el-select-dropdown) {
    background: rgba(0, 127, 95, 0.5);
    backdrop-filter: blur(6px);
  }

  ::v-deep(.el-select-dropdown__item) {
    color: white;

    &:hover {
      background: rgba(0, 127, 95, 0.3);
    }

    &.selected {
      background: rgba(0, 127, 95, 0.6);
    }
  }
}


.filter-dropdown {
  width: 200px;
  margin-right: 10px;
  transition: all 0.3s ease;
  

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    border-color: #409eff;
    box-shadow: 0 0 8px rgba(64, 158, 255, 0.3);
  }
}

.el-select-dropdown {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
 
}

.el-option {
  padding: 10px 20px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f5f7fa;
  }

  &.selected {
    background-color: #409eff;
    color: white;
    
  }
}
</style>