<script lang="ts" setup>
import { ref } from "vue";
import UIButton from "~/components/ui/button/UI-Button.vue";
import UIDialog from "~/components/ui/dialog/UI-Dialog.vue";

const isPending = ref(false);
const showModal = ref(false);
const hasError = ref(false);
const errorText = ref("");

const checkIsGameReady = async () => {
  isPending.value = true;
  hasError.value = false;
  errorText.value = "";

  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        showModal.value = true;
        resolve(true);
      }, 1000);
    });
  } catch (err) {
    showModal.value = true;
    hasError.value = true;
    errorText.value = JSON.stringify(err);
  } finally {
    isPending.value = false;
  }
};
</script>

<template>
  <h1 class="title">Игра скоро начнётся</h1>
  <p class="text">Время ещё не пришло, ждём</p>

  <UIButton
    :class="$style.button"
    @click="checkIsGameReady"
    :loading="isPending"
  >Ну когда уже?</UIButton>

  <UIDialog
    :is-show="showModal"
    :show-error="hasError"
    :error-text="errorText"
    @close="
      () => {
        showModal = false;
      }
    "
  >
    <h2>Пока ещё ждём</h2>
  </UIDialog>
</template>

<style lang="css" src="./index.module.css" module></style>
