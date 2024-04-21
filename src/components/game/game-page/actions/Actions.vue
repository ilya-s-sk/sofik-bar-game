<script lang="ts" setup>
import { ref } from "vue";
import UIButton from "~/components/ui/button/UI-Button.vue";
import UIDialog from "~/components/ui/dialog/UI-Dialog.vue";
import { useUserStore } from "~/store/user";

const pending = ref(false);
const hasError = ref(false);
const showDialog = ref(false);
const dialogText = ref("");

const store = useUserStore();

const finishStage = async () => {
  hasError.value = false;
  pending.value = true;

  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
    store.userData.preparedToNextStage = true;
  } catch (err) {
    showDialog.value = true;
    hasError.value = true;
    dialogText.value = JSON.stringify(err);
  } finally {
    pending.value = false;
  }
};

const changeStage = async () => {
  hasError.value = false;
  pending.value = true;

  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        showDialog.value = true;
        dialogText.value = 'Пока что ждём остальных';
        resolve(true);
      }, 1000)
    });
  } catch (err) {
    showDialog.value = true;
    hasError.value = true;
    dialogText.value = JSON.stringify(err);
  } finally {
    pending.value = false;
  }
}
</script>

<template>
  <div :class="$style.actions">
    <UIButton
      @click="finishStage"
      :disabled="store.userData.preparedToNextStage"
      :loading="!store.userData.preparedToNextStage && pending"
    >Я тут всё</UIButton>
    <UIButton 
      :disabled="!store.userData.preparedToNextStage"
      :loading="store.userData.preparedToNextStage && pending"
      @click="changeStage"
    >Пойдем дальше</UIButton>

    <UIDialog
      :is-show="showDialog"
      :show-error="hasError"
      :error-text="dialogText"
      @close="() => (showDialog = false)"
    >
      <p>{{ dialogText }}</p>
    </UIDialog>
  </div>
</template>

<style lang="css" src="./index.module.css" module></style>
