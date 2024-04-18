<script setup lang="ts">
defineProps({
  isLoading: Boolean,
  disabled: Boolean,
});
</script>

<template>
  <button class="button" :disabled="disabled" @click="() => $emit('click')">
    <slot v-if="!isLoading" />
    <span v-else>Загрузка...</span>
  </button>
</template>
