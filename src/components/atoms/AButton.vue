<template>
  <el-button
    v-on="$attrs"
    v-bind="$attrs"
    round
    :size="props.size"
    :type="props.type"
    class="mg-button el-button"
    :class="{ 'no-border': props.noBorder }"
  >
    <slot name="default" />
  </el-button>
</template>

<script setup lang="ts">
type Props = {
  size?: 'large' | 'default' | 'small'
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | '' | 'default'
  noBorder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  type: 'primary',
  noBorder: false
})
</script>

<style scoped lang="scss">
.no-border {
  border: 1px;
}

.el-button {
  
  --el-button-size: unset;
  --el-button-bg-color: var(--color-white);
  --el-button-text-color: $color-primary;
  --el-border-radius-round: 44px;
  background-color: $color-primary;
  width: fit-content;
  display: block;
  border: none;
  font-weight: 500;
  text-align: center;
  transition:
    box-shadow 0.3s ease,
    color 0.3s ease,
    background-color 0.3s ease;

  &:disabled {
    --el-button-text-color: var(--color-white);

    cursor: auto;
  }

  &--primary {
    --el-button-bg-color: $color-primary;
    --el-button-text-color: var(--color-white);
    --el-button-hover-bg-color: var(--color-secondary);
    --el-button-active-bg-color: var(--color-secondary);

    &:hover {
      --el-button-hover-text-color: var(--color-white);

      box-shadow: 0 0 20px 0 rgba(var(--color-black), 0.5);
    }

    &:focus-visible {
      box-shadow: 0 0 20px 0 rgba(var(--color-black), 0.5);
    }

    &:active {
      --el-button-bg-color: var(--color-secondary);

      box-shadow:
        0.3rem 0.3rem 0.6rem var(--greyLight-2),
        -0.2rem -0.2rem 0.5rem var(--white);
    }

    &:disabled {
      box-shadow:
        inset 0.2rem 0.2rem 0.5rem var(--greyLight-2),
        inset -0.2rem -0.2rem 0.5rem var(--white);
    }
  }

  &--large {
    height: 54px;
    font-size: var(--font-size--lg);
    line-height: 24px;
    letter-spacing: 0.16px;
    padding: 15px 24px;
  }

  &--default {
    height: 40px;
    font-size: var(--font-size--sm);
    line-height: 20px;
    padding: 10px 20px;

    &.is-circle {
      width: 36px;
      height: 36px;
    }
  }

  &--small {
    height: 32px;
    font-size: var(--font-size--xs);
    line-height: 20px;
    letter-spacing: 0.12px;
    padding: 8px 16px;
  }
  @include glass-button();

}
</style>
