<script lang="ts" setup>
import { ref } from "vue";
import UIButton from "~/components/ui/button/UI-Button.vue";
import UIDialog from "~/components/ui/dialog/UI-Dialog.vue";
import { useStore } from '~/store';

const store = useStore();

const isPending = ref(false);
const showModal = ref(false);
const hasError = ref(false);
const errorText = ref("");

const MOCK_DATA = {
  currentBarName: 'Лучший бар в мире',
    tasksList: [
      {
        id: 0,
        title: 'Задание 1',
        cost: 10,
        completed: false,
      },
      {
        id: 1,
        title: 'Задание 2',
        cost: 8,
        completed: false,
      },
    ]
}

const setStoreData = () => {
  store.$patch(MOCK_DATA)
}

const checkIsGameReady = async () => {
  isPending.value = true;
  hasError.value = false;
  errorText.value = "";

  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        // showModal.value = true;
        setStoreData();
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
