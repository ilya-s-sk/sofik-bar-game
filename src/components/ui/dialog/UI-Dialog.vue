<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import Cross from "~/components/ui/icons/CrossIcon.vue";
import ErrorIcon from '~/components/ui/icons/ErrorIcon.vue';
const emit = defineEmits<{
  (e: "close"): void;
}>();
const props = defineProps({
  isShow: Boolean,
  showError: Boolean,
  errorText: String,
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

      <div v-if="showError" :class="$style.errorBlock">
        <h2 :class="$style.errorTitle">
          <ErrorIcon :class="$style.errorIcon" />
          <span>У нас что-то сломалось</span>
        </h2>
        <template v-if="errorText">
          <p>Покажите эти странные буквы знающим людям:</p>
          <p>{{ errorText }}</p>
        </template>
        <template v-else>
          <p>Попробуйте ещё раз, может само починится</p>
        </template>
      </div>

      <slot v-else />
    </div>
  </dialog>
</template>

<style lang="css" src="./index.module.css" module></style>
