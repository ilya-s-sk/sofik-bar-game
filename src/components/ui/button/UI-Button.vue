<script setup lang="ts">
interface IProps {
  loading?: boolean,
  disabled?: boolean,
  theme: 'blue' | 'red',
}
withDefaults(defineProps<IProps>(), {
  theme: 'blue',
});
</script>

<template>
  <button :class="[$style.button, $style[theme]]" :disabled="disabled || loading">
    <slot v-if="!loading" />
    <span v-else>Загрузка...</span>
  </button>
</template>

<style lang="css" src="./index.module.css" module></style>
