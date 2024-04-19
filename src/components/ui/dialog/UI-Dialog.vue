<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import Cross from "../icons/Cross.vue";
const emit = defineEmits<{
  (e: "close"): void;
}>();
const props = defineProps({
  isShow: Boolean,
});

const dialog = ref<HTMLDialogElement | null>(null);

onMounted(() => {});
watch(props, (newValue) => {
  if (!dialog.value) return;

  newValue.isShow ? dialog.value.showModal() : dialog.value.close();
});
</script>

<template>
  <dialog :class="$style.dialog" ref="dialog" @click="$emit('close')">
    <div :class="$style.inner" @click="(e) => e.stopPropagation()">
      <button
        :class="$style.closeButton"
        aria-label="Закрыть"
        @click="$emit('close')"
      >
        <Cross />
      </button>
      <slot />
    </div>
  </dialog>
</template>

<style lang="css" src="./index.module.css" module></style>
